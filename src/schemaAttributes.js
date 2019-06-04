import React from 'react';

import Attribute from './attribute';

const SchemaAttributes = ({ attributes, type }) => (
  attributes.length > 0
    ? <div>
      <h3>Attributes</h3>
      <ul>
        {attributes.map((attr, index) => (
          <li key={`schema-attribute-${index}`}>
            <Attribute
              attribute={attr}
              type={type}
            />
          </li>
        ))}
      </ul>
    </div>
    : <div></div>
);

export default SchemaAttributes;
