import $RefParser from 'json-schema-ref-parser';
import { getAttributes, getRelationships } from './lib/normalize';
import { extract } from './utils';

export default class SchemaParser {
  constructor() {
    this.schemaCache = {};
    this.inferenceCache = {};
  }

  parse(root, forPath = []) {
    return typeof root === 'string'
      ? this.loadSchema(root).then(schema => {
          const dataSchema = extract(schema, 'definitions.data');
          const type = extract(
            dataSchema,
            (dataSchema.type === 'array' ? 'items.' : '') +
              'definitions.type.const',
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
        })
      : this.inferSchema(root, forPath);
  }

  inferSchema(document, forPath) {
    let inferred = {};
    const data = extract(document, 'data');
    if (forPath.length) {
      const [next, ...further] = forPath;
      const extractIdentifiers = resourceObject =>
        extract(resourceObject, `relationships.${next}.data`, []);
      const identifiers = Array.isArray(data)
        ? data.reduce((identifiers, item) => {
            const extracted = extractIdentifiers(item);
            return [
              ...identifiers,
              ...(Array.isArray(extracted) ? extracted : [extracted]),
            ];
          }, [])
        : extractIdentifiers(data);
      const identified = item => {
        return Array.isArray(identifiers)
          ? identifiers.reduce((inIncludes, identifier) => {
              return (
                inIncludes ||
                (identifier.type === item.type && identifier.id === item.id)
              );
            }, false)
          : identifiers.type === item.type && identifiers.id === item.id;
      };
      const included = document.included || [];
      const syntheticRelatedDocument = { data: included.filter(identified) };
      if (included.length) {
        syntheticRelatedDocument['included'] = included;
      }
      inferred = this.inferSchema(syntheticRelatedDocument, further);
    } else {
      if (Array.isArray(data)) {
        data.forEach(
          item =>
            (inferred = this.buildInferenceFromResourceObject(item, forPath)),
        );
      } else {
        inferred = this.buildInferenceFromResourceObject(data, forPath);
      }
    }
    return Promise.resolve(inferred);
  }

  buildInferenceFromResourceObject(item) {
    const inferred = {};
    const previousInference = this.inferenceCache[item.type] || {};
    inferred['type'] = item.type;
    inferred['attributes'] = Object.keys(extract(item, 'attributes', {}))
      .reduce((inferred, name) => {
        return [...inferred, { name }];
      }, previousInference.attributes || [])
      .reduce((deduplicated, field) => {
        if (
          !deduplicated.reduce(
            (has, previous) => has || previous.name === field.name,
            false,
          )
        ) {
          deduplicated.push(field);
        }
        return deduplicated;
      }, []);
    inferred['relationships'] = Object.keys(
      extract(item, 'relationships', {}),
    ).reduce((inferred, name) => {
      return [...inferred, { name }];
    }, previousInference.relationships || []);
    this.inferenceCache[inferred.type] = inferred;
    return this.inferenceCache[inferred.type];
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
