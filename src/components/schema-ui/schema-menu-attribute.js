import React, { useState } from 'react';

const SchemaMenuAttribute = ({ attribute }) => {
  const [showValue, setShowValue] = useState(false);

  return (
    <span className="menu__attribute">
      <span className="link__title link__title--readable" onClick={() => setShowValue(!showValue)}>
        {attribute.name}
      </span>
      {attribute.value && (
        <ul className={`menu__attribute_properties ${showValue ? 'is-active' : 'is-inactive'}`}>
          {Object.keys(attribute.value).map((attr, index) => (
            <li>
              <span
                key={`${attr}-${index}`}
                className="link__text link__text--machine"
              >
                {attr}:{' '}
                <strong>{JSON.stringify(attribute.value[attr])}</strong>
              </span>
            </li>
          ))}
        </ul>
      )}
    </span>
  );
};

export default SchemaMenuAttribute;
