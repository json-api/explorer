import React, { createContext, useContext, useState, useEffect } from 'react';
import { LocationContext } from './location';

const SchemaContext = createContext({});

const Schema = ({ forPath = [], children }) => {
  const { document } = useContext(LocationContext);
  const [contextSchema, setContextSchema] = useState(null);
  useEffect(() => {
    if (document) document.getSchema(forPath).then(setContextSchema);
  }, [document]);
  return (
    <SchemaContext.Provider value={{ schema: contextSchema, forPath }}>
      {children}
    </SchemaContext.Provider>
  );
};

export { SchemaContext, Schema };
