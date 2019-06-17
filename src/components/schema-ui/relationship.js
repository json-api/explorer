import React, { useState } from 'react';

import SchemaUI from '.';

const Relationship = ({ forPath, relationship }) => {
  const [showSchema, setShowSchema] = useState(false);

  return (
    <div>
      <h4>{relationship.name}</h4>
      {showSchema ? (
        <SchemaUI forPath={[...forPath, relationship.name]} />
      ) : (
        <button onClick={() => setShowSchema(true)}>
          load <em>{relationship.name}</em>
        </button>
      )}
    </div>
  );
};

export default Relationship;
