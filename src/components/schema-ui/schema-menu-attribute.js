import React from 'react';

const SchemaMenuAttributeName = ({ name }) => (
  <div className="menu__attribute">
    <span className="link__title link__title--readable">{name}</span>
  </div>
);

const SchemaMenuAttributeValue = ({ name, value }) => {
  const { type, title, description, properties, ...values } = value;

  return (
    <div className={`menu__attribute menu__attribute--${type}`}>
      <div className="menu__attribute_header">
        <span className="link__title link__title--readable">{title}</span>
        <span className="link__text link__text--machine">{name}</span>
        {type !== 'object' && <span className="link__text_type link__text--machine">{type}</span>}
        {description && <p className="link__text_description">{description}</p>}
      </div>
      <ul className="menu__attribute_properties">
        {properties
          ? Object.entries(properties).map(([key, value], index) => (
              <li key={`${name}-${key}-${index}`}>
                <SchemaMenuAttribute attribute={{ name: key, value }} />
              </li>
            ))
          : Object.entries(values).map(([key, value], index) => (
              <li key={`${name}-${key}-${index}`}>
                <span className="link__text link__text_label">{key}</span>
                <span className="link__text link__text_value">
                  : {JSON.stringify(value)}
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
