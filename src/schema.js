import React, { useState, useEffect } from 'react';

import SchemaAttributes from './schemaAttributes';
import SchemaRelationships from './schemaRelationships';

import { getAttributes, getRelationships } from './lib/normalize';

const Schema = ({ schema }) => {

  const [attributes, setAttributes] = useState([]);
  const [relationships, setRelationships] = useState([]);

  useEffect(() => {
    setAttributes(getAttributes(schema));
    setRelationships(getRelationships(schema));
  }, [schema]);

  return (
    <div className="schema">
      <SchemaAttributes data={attributes} />
      <SchemaRelationships data={relationships} />
    </div>
  )
};

export default Schema;
