import React from 'react';

import Attribute from './attribute';

const SchemaAttributes = ({ data, type }) => (
  data.length > 0
    ? <div>
      <h3>Attributes</h3>
      <ul>
        {data.map((attr, index) => (
          <li key={`schema-attribute-${index}`}>
            <Attribute
              data={attr}
              type={type}
            />
          </li>
        ))}
      </ul>
    </div>
    : <div></div>
);

export default SchemaAttributes;
