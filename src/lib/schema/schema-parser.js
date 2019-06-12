import $RefParser from 'json-schema-ref-parser';
import { getAttributes, getRelationships } from './normalize';
import { request } from '../../utils/request';
import { extract } from '../../utils/utils';
import Document from '../jsonapi-objects/document';
import { compileJsonApiUrl, parseJsonApiUrl } from '../url/url';

export default class SchemaParser {
  constructor() {
    this.schemaCache = {};
    this.inferenceCache = {};
  }

  async parse(root, forPath = []) {
    if (typeof root === 'string') {
      return this.loadSchema(root).then(schema =>
        this.parseSchema(schema, forPath),
      );
    }
    const links = root.getLinks();
    const describedByURL = extract(links, 'describedBy.href');
    if (describedByURL) {
      return this.parseSchema(await this.loadSchema(describedByURL), forPath);
    }
    const selfURL = extract(links, 'self.href');
    const parsedSelfURL = parseJsonApiUrl(selfURL);
    if (Object.keys(parsedSelfURL.query.fields).length) {
      const completeFieldsetUrl = Object.assign({}, parsedSelfURL, {query: Object.assign({}, parsedSelfURL.query, {fields: []})});
      return this.parse(
        Document.parse(await request(compileJsonApiUrl(completeFieldsetUrl))),
        forPath,
      );
    }
    const baseResourceURL = compileJsonApiUrl(Object.assign({}, parsedSelfURL, {protocol: 'inferred:', query: {}}));
    const inferredSchema = this.inferSchema(root, forPath);
    return !forPath.length ? this.mergeWithCachedInference(baseResourceURL, inferredSchema) : inferredSchema;;
  }

  parseSchema(schema, forPath) {
    const dataSchema = extract(schema, 'definitions.data');
    const type = extract(
      dataSchema,
      (dataSchema.type === 'array' ? 'items.' : '') + 'definitions.type.const',
    );
    const discovered = {
      type,
      attributes: getAttributes(dataSchema),
      relationships: getRelationships(dataSchema),
    };
    if (forPath.length) {
      const [next, ...further] = forPath;
      const relationshipSchema = extract(
        dataSchema,
        (dataSchema.type === 'array' ? 'items.' : '') +
          'definitions.relationships.properties',
      );
      const targetSchema = extract(
        relationshipSchema,
        `${next}.links.related.meta.linkParams.describedBy`
          .split('.')
          .join('.properties.') + '.const',
      );
      return targetSchema ? this.parse(targetSchema, further) : null;
    } else {
      return discovered;
    }
  }

  inferSchema(responseDocument, forPath) {
    if (responseDocument.isEmptyDocument()) {
      return null;
    }
    let inferred;
    if (forPath.length) {
      const [next, ...further] = forPath;
      const documentData = [responseDocument.getData()]
        .flat()
        .reduce((grouped, resourceObject) => {
          return Object.assign(grouped, {
            [resourceObject.getType()]: [
              ...(grouped[resourceObject.getType()] || []),
              resourceObject,
            ],
          });
        }, {});
      inferred = Object.entries(documentData)
        .flatMap(([type, groupedData]) => {
          const relatedData = groupedData
            .flatMap(resourceObject => {
              return resourceObject.getRelated(next);
            })
            .reduce((raw, item) => raw.concat(item ? [item.raw] : []), []);
          const included = responseDocument.getIncluded().map(item => item.raw);
          const syntheticDocument = Document.parse({
            data: relatedData,
            included,
          });
          return this.mergeWithCachedInference(
            `${type}/${further.join('/')}`,
            this.inferSchema(syntheticDocument, further),
          );
        })
        .reduce(this.mergeResourceObjectSchema);
    } else {
      [responseDocument.getData()].flat().forEach(item => {
        inferred = this.buildInferenceFromResourceObject(item);
      });
    }
    return inferred;
  }

  buildInferenceFromResourceObject(resourceObject) {
    const type = resourceObject.getType();

    const inference = {
      type,
      attributes: Object.keys(resourceObject.getAttributes()).map(name => {
        return { name };
      }),
      relationships: Object.keys(resourceObject.getRelationships()).map(
        name => {
          return { name };
        },
      ),
    };

    return this.mergeWithCachedInference(inference.type, inference);
  }

  mergeWithCachedInference(key, inference) {
    if (!inference) {
      return this.inferenceCache[key] || inference;
    }
    this.inferenceCache[key] = this.mergeResourceObjectSchema(
      inference,
      this.inferenceCache[key] || {
        type: inference.type,
        attributes: [],
        relationships: [],
      },
    );
    return this.inferenceCache[key];
  }

  mergeResourceObjectSchema(schema, otherSchema) {
    if (schema.type !== otherSchema.type) {
      return schema;
    }

    const mergeFields = (merged, otherField) =>
      merged.concat(
        merged.some(knownField => knownField.name === otherField.name)
          ? []
          : [otherField],
      );

    const mergedSchema = {
      type: schema.type,
      attributes: [],
      relationships: [],
    };
    mergedSchema.attributes.push(
      ...schema.attributes.reduce(mergeFields, otherSchema.attributes),
    );
    mergedSchema.relationships.push(
      ...schema.relationships.reduce(mergeFields, otherSchema.relationships),
    );

    return mergedSchema;
  }

  loadSchema(schemaId) {
    let schemaPromise;
    if (!this.schemaCache.hasOwnProperty(schemaId)) {
      const publish = (success, result) =>
        this.schemaCache[schemaId].forEach(([resolve, reject]) =>
          success ? resolve(result) : reject(result),
        );
      $RefParser
        .dereference(schemaId)
        .then(result => {
          publish(true, result);
          this.schemaCache[schemaId] = result;
        })
        .catch(result => publish(false, result));
    }
    if (
      !this.schemaCache.hasOwnProperty(schemaId) ||
      Array.isArray(this.schemaCache[schemaId])
    ) {
      schemaPromise = new Promise(
        (resolve, reject) =>
          (this.schemaCache[schemaId] = [
            ...(this.schemaCache[schemaId] || []),
            [resolve, reject],
          ]),
      );
    } else {
      schemaPromise = Promise.resolve(this.schemaCache[schemaId]);
    }
    return schemaPromise;
  }
}
