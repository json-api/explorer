import { extract } from "../../utils/utils";

function getDefinitions(schema, definition, process = null) {
  const extracted = extract(schema, (schema && schema.type === 'array' ? 'items.' : '') + `definitions.${definition}.properties`);
  return extracted ? mapDefinitions(extracted, process) : [];
}

function findProperty(property, obj) {
  if (obj && Object.keys(obj).indexOf(property) > -1) {
    // found the property
    return Object.assign({}, { [property]: obj[property] });
  } else {
    const next =
      obj && Object.values(obj).find(value => typeof value === 'object');
    return next ? findProperty(property, next) : {};
  }
}

export function mapDefinitions(definitions, process = null) {
  return Object.keys(definitions).map(name => {
    const value = definitions[name];

    return { name, value: process ? process(value) : value };
  });
}

export function getRelationshipSchema(relationship) {
  return findProperty('describedBy', relationship);
}

export const getAttributes = schema => getDefinitions(schema, 'attributes');

export const getRelationships = schema =>
  getDefinitions(schema, 'relationships', getRelationshipSchema);
