
function getDefinitions(schema, definition) {
  const $n = {};
  return (((schema||$n).definitions||$n)[definition]||$n).properties
    ? Object.keys(schema.definitions[definition].properties)
    : [];
}

export const getAttributes = (schema) => (
  getDefinitions(schema, 'attributes')
);


export const getRelationships = (schema) => (
  getDefinitions(schema, 'relationships')
);