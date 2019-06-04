import React from 'react';

import Relationship from './relationship';

const SchemaRelationships = ({ relationships, includePath }) =>
  relationships.length > 0 ? (
    <div>
      <h3>Relationships</h3>
      <ul>
        {relationships.map((relationship, index) => (
          <li key={`schema-relationship-${index}`}>
            <Relationship
              relationship={relationship}
              includePath={[...includePath, relationship.name]}
            />
          </li>
        ))}
      </ul>
    </div>
  ) : (
    <div />
  );

export default SchemaRelationships;
