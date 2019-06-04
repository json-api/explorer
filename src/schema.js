import React, { useState, useEffect } from 'react';

import SchemaAttributes from './schemaAttributes';
import SchemaRelationships from './schemaRelationships';

import { getAttributes, getRelationships, getResourceRef } from './lib/normalize';
import { request } from './lib/request';
import { extract } from './utils';

const Schema = ({ url }) => {

  const [type, setType] = useState('');
  const [attributes, setAttributes] = useState([]);
  const [relationships, setRelationships] = useState([]);

  useEffect(() => {

    const fetchDocument = async (url) => {
      const result = await request(url);

      if (result.hasOwnProperty('definitions')) {
        const $ref = getResourceRef(result);

        if ($ref) {
          const meta = await request($ref);

          setType(extract(meta, 'definitions.type.const', ''));
          setAttributes(getAttributes(meta));
          setRelationships(getRelationships(meta));
        }
      }
    };

    if (url && url !== '') {
      fetchDocument(url);
    }

  }, [url]);

  return (
    <div className="schema-list">
      <SchemaAttributes data={attributes} type={type} />
      <SchemaRelationships data={relationships} />
    </div>
  )
};

export default Schema;
