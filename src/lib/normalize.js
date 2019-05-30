
function getDefinitions(schema, definition) {
  const $n = {};
  return (((schema||$n).definitions||$n)[definition]||$n).properties
    ? Object.keys(schema.definitions[definition].properties)
    : [];
}

function findProperty(property, obj) {
  if (Object.keys(obj).indexOf(property) > -1) {
    // found the property
    return Object.assign({},{ [property] : obj[property] });
  }
  else {
    const next = Object.values(obj).find(value => typeof value === 'object');
    return next ? findProperty(property, next) : {};
  }
}

export function getRelationshipSchema(relationship) {
  return findProperty('describedBy', relationship);

}

export const getAttributes = (schema) => (
  getDefinitions(schema, 'attributes')
);


export const getRelationships = (schema) => (
  getDefinitions(schema, 'relationships')
);