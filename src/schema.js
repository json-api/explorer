import React, { createContext, useContext, useState, useEffect } from 'react';
import SchemaParser from './schema-parser';
import { extract } from './utils';
import { LocationContext } from './location';

const schemaParser = new SchemaParser();

const SchemaContext = createContext({});

const Schema = ({ forPath = [], children }) => {
  const [contextSchema, setContextSchema] = useState(null);
  const { document } = useContext(LocationContext);
  useEffect(() => {
    const root = extract(document, 'links.describedBy.href') || document;
    if (root) {
      schemaParser.parse(root, forPath).then(setContextSchema);
    }
  }, [document]);
  return (
    <SchemaContext.Provider value={{ schema: contextSchema, forPath }}>
      {children}
    </SchemaContext.Provider>
  );
};

export { SchemaContext, Schema };
