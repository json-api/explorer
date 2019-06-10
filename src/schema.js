import React, { createContext, useContext, useState, useEffect } from 'react';
import { LocationContext } from './location';

const SchemaContext = createContext({});

const Schema = ({ forPath = [], children }) => {
  const { responseDocument } = useContext(LocationContext);
  const [contextSchema, setContextSchema] = useState(null);
  useEffect(() => {
    if (responseDocument) responseDocument.getSchema(forPath).then(setContextSchema);
  }, [responseDocument]);
  return (
    <SchemaContext.Provider value={{ schema: contextSchema, forPath }}>
      {children}
    </SchemaContext.Provider>
  );
};

export { SchemaContext, Schema };
