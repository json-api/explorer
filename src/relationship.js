import React, { useState, useEffect } from 'react';

import Schema from './schema';
import { getDescribedByUrl } from './lib/normalize';

const Relationship = ({ data }) => {

  const [schemaUrl, setSchemaUrl] = useState('');

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
      <Schema url={schemaUrl} />
    </div>
  )
};

export default Relationship;