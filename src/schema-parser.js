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
      : this.inferSchema(root);
  }

  inferSchema(document) {
    let inferred = null;
    const data = extract(document, 'data');
    if (Array.isArray(data)) {
      data.forEach(item => inferred = this.buildInferenceFromResourceObject(item));
    } else {
      inferred = this.buildInferenceFromResourceObject(data);
    }
    return Promise.resolve(inferred);
  }

  buildInferenceFromResourceObject(item) {
    const inferred = {};
    const previousInference = this.inferenceCache[inferred.type] || {};
    inferred['type'] = item.type;
    inferred['attributes'] = Object.keys(extract(item, 'attributes', {})).reduce((inferred, name) => {
      return [...inferred, {name}];
    }, previousInference.attributes || []);
    inferred['relationships'] = [];
    this.inferenceCache[inferred.type] = inferred;
    return this.inferenceCache[inferred.type];
  };

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
