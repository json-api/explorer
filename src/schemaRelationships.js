import React from 'react';

import Relationship from './relationship';

const SchemaRelationships = ({ data }) => (
  data.length > 0
    ? <div>
      <h3>Relationships</h3>
      <ul>
        {data.map((relationship, index) => (
          <li key={`schema-relationship-${index}`}>
            <Relationship data={relationship} />
          </li>
        ))}
      </ul>
    </div>
    : <div></div>
);


export default SchemaRelationships;
