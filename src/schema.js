import React, { useState, useEffect, useContext } from 'react';

import SchemaAttributes from './schemaAttributes';
import SchemaRelationships from './schemaRelationships';

import { getAttributes, getRelationships, getResourceRef } from './lib/normalize';
import { request } from './lib/request';
import { extract } from './utils';
import {LocationContext} from "./location";

const Schema = ({ url, includePath = [] }) => {

  const [type, setType] = useState('');
  const [attributes, setAttributes] = useState([]);
  const [relationships, setRelationships] = useState([]);
  const { include } = useContext(LocationContext);

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
      <SchemaAttributes attributes={attributes} type={type} includesEnabled={(new Set(include)).has(includePath.join('.'))}/>
      <SchemaRelationships relationships={relationships} includePath={includePath} />
    </div>
  )
};

export default Schema;
