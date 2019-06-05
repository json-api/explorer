import React, { useState, useEffect } from 'react';

import SchemaUI from './schema-ui';
import { getDescribedByUrl } from './lib/normalize';

const Relationship = ({ relationship, includePath }) => {
  const [schemaUrl, setSchemaUrl] = useState('');
  const [showSchema, setShowSchema] = useState(false);

  const loadMeta = () => {
    if (relationship.value.hasOwnProperty('describedBy')) {
      const { describedBy } = relationship.value;
      setSchemaUrl(getDescribedByUrl(describedBy));
    }
  };

  useEffect(() => {
    loadMeta();
  }, [relationship]);

  return (
    <div>
      <h4>{relationship.name}</h4>
      {showSchema ? (
        <SchemaUI url={schemaUrl} includePath={includePath} />
      ) : (
        <button onClick={() => setShowSchema(true)}>
          load <em>{relationship.name}</em>
        </button>
      )}
    </div>
  );
};

export default Relationship;
