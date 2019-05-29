
export function getAttributes(schema) {

  return schema && schema.hasOwnProperty('definitions')
    ? Object.keys(schema.definitions.attributes.properties)
    : [];
}

