import React, { useContext, useState } from 'react';

import SchemaUI from '.';
import { SchemaContext, Schema } from '../../contexts/schema';

const Relationship = ({ relationship }) => {
  const { forPath } = useContext(SchemaContext);
  const [showSchema, setShowSchema] = useState(false);

  return (
    <div>
      <h4>{relationship.name}</h4>
      {showSchema ? (
        <Schema forPath={[...forPath, relationship.name]}>
          <SchemaUI />
        </Schema>
      ) : (
        <button onClick={() => setShowSchema(true)}>
          load <em>{relationship.name}</em>
        </button>
      )}
    </div>
  );
};

export default Relationship;
