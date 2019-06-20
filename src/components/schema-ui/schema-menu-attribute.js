import React from 'react';

const SchemaMenuAttributeName = ({ name }) => (
  <div className="menu__attribute">
    <span className="link__title link__title--readable">{name}</span>
  </div>
);

const SchemaMenuAttributeValue = ({ name, value }) => {
  const { type, title, description, properties, ...values } = value;

  return type === 'object' ? (
    <div className="menu__attribute menu__attribute_object">
      <span className="link__title link__title--readable">{title}</span>
      <span className="link__text link__text--machine">{name}</span>
      <ul className="menu__attribute_properties">
        {Object.entries(properties).map(([key, value], index) => (
          <li key={`${name}-${key}-${index}`}>
            <SchemaMenuAttribute attribute={{ name: key,value }} />
          </li>
        ))}
      </ul>
    </div>
  ) : (
    <div className="menu__attribute">
      <span className="link__title link__title--readable">{title}</span>
      <span className="link__text link__text--machine">
        {name}:<span className="link__text--type">{type}</span>
      </span>
      <ul className="menu__attribute_properties">
        {Object.entries(values).map(([key, value], index) => (
          <li key={`${name}-${key}-${index}`}>
            <span className="link__text link__text--machine">
              {key}: <strong>{typeof value === 'object' ? JSON.stringify(value) : value}</strong>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

const SchemaMenuAttribute = ({ attribute }) => {
  const { name, value } = attribute;

  return value ? (
    <SchemaMenuAttributeValue name={name} value={value} />
  ) : (
    <SchemaMenuAttributeName name={name} />
  );
};

export default SchemaMenuAttribute;
