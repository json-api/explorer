import React from 'react';

const SchemaAttributes = ({ data }) => (
  data.length > 0
    ? <div>
        <h3>Attributes</h3>
        <ul>
          {data.map((attr, index) => (
            <li key={`schema-attribute-${index}`}>{attr}</li>
          ))}
        </ul>
      </div>
    : <div></div>
);

export default SchemaAttributes;
