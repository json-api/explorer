import React from 'react';

import Relationship from './relationship';

const SchemaRelationships = ({ forPath, relationships }) =>
  relationships.length > 0 ? (
    <div>
      <h3>Relationships</h3>
      <ul>
        {relationships.map((relationship, index) => (
          <li key={`schema-relationship-${index}`}>
            <Relationship forPath={forPath} relationship={relationship} />
          </li>
        ))}
      </ul>
    </div>
  ) : (
    <div />
  );

export default SchemaRelationships;
