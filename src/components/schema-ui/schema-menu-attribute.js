import React, { useState } from 'react';

const SchemaMenuAttribute = ({ attribute }) => {
  const [showValue, setShowValue] = useState(false);

  return (
    <span className="menu__attribute">
      <span
        className="link__title link__title--readable"
        onClick={() => setShowValue(!showValue)}
      >
        {attribute.name}
      </span>
      {attribute.value && (
        <ul
          className={`menu__attribute_properties ${
            showValue ? 'is-active' : 'is-inactive'
          }`}
        >
          {Object.entries(attribute.value).map(([key, value], index) => (
            <li key={`${attribute.name}-${key}-${index}`}>
              <span className="link__text link__text--machine">
                {key}: <strong>{JSON.stringify(value)}</strong>
              </span>
            </li>
          ))}
        </ul>
      )}
    </span>
  );
};

export default SchemaMenuAttribute;
