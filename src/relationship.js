import React, { useState, useEffect } from 'react';

import Schema from './schema';
import { getDescribedByUrl } from './lib/normalize';

const Relationship = ({ data }) => {

  const [schemaUrl, setSchemaUrl] = useState('');
  const [showSchema, setShowSchema] = useState(false);

  const loadMeta = () => {
    if (data.value.hasOwnProperty('describedBy')) {
      const { describedBy } = data.value;
      setSchemaUrl(getDescribedByUrl(describedBy));
    }
  };

  useEffect(() => {
    loadMeta();
  }, [data]);

  return (
    <div>
      <h4>{data.name}</h4>
      {showSchema
        ? <Schema url={schemaUrl} />
        : <button onClick={() => setShowSchema(true)}>load <em>{data.name}</em></button>
      }
    </div>
  )
};

export default Relationship;