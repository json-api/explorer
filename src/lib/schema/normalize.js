import { extract } from '../../utils';

function getDefinitions(schema, definition, process = null) {
  const extracted = extract(
    schema,
    (schema && schema.type === 'array' ? 'items.' : '') +
      `definitions.${definition}.properties`,
  );
  return extracted ? mapDefinitions(extracted, process) : [];
}

export function mapDefinitions(definitions, process = null) {
  return Object.keys(definitions).map(name => {
    const value = definitions[name];

    return { name, value: process ? process(value) : value };
  });
}

export function getRelationshipSchema(relationship) {
  const relatedLink  = extract(relationship, 'links', [])
    .find(ldo => ldo.rel === 'related');
  return extract(relatedLink, 'targetSchema');
}

export const getAttributes = schema => getDefinitions(schema, 'attributes');

export const getRelationships = schema => getDefinitions(schema, 'relationships', getRelationshipSchema);

export const processAttributeValue = value => {

  let { type, title, description, properties, items, ...values } = value;

  if (type === 'array') {
    type = `[${items.type}]`;
    if (Array.isArray(items)) {
      properties = items;
    } else if (items.type === 'object')  {
      properties = items.properties;
    } else {
      const {type: _, title: __, ...itemValues} = items;
      values = itemValues;
    }
  }

  return { type, title, description, properties, items, values };
};
