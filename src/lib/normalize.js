
function getDefinitions(schema, definition, process = null) {
  const $n = {};
  return (((schema||$n).definitions||$n)[definition]||$n).properties
    ? mapDefinitions(schema.definitions[definition].properties, process)
    : [];
}

function findProperty(property, obj) {
  if (obj && Object.keys(obj).indexOf(property) > -1) {
    // found the property
    return Object.assign({},{ [property] : obj[property] });
  }
  else {
    const next = obj && Object.values(obj).find(value => typeof value === 'object');
    return next ? findProperty(property, next) : {};
  }
}

export function mapDefinitions(definitions, process = null) {
  return Object.keys(definitions).map(name => {
    const value = definitions[name];

    return { name, value: process ? process(value) : value }
  });
}

export function getRelationshipSchema(relationship) {
  return findProperty('describedBy', relationship);

}

export function getResourceRef(schema) {
  const { data } = schema.definitions;
  return data.hasOwnProperty('items') ? data.items.$ref : data.$ref;
}

export function getDescribedByUrl(describedBy) {
  return describedBy.hasOwnProperty('href')
    ? describedBy.href
    : describedBy.const
}

export const getAttributes = (schema) => (
  getDefinitions(schema, 'attributes')
);


export const getRelationships = (schema) => (
  getDefinitions(schema, 'relationships', getRelationshipSchema)
);
