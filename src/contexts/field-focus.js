import React, { createContext, useContext, useEffect, useState } from 'react';
import {LocationContext} from "./location";

const defaults = {
  focusPath: null,
  setFocusPath: () => {},
  availableFocusPaths: [],
};

const findUniqueFieldNames = (resourceObjects) => {
  return [...resourceObjects
    .map(resourceObject => resourceObject.getFieldnames())
    .reduce((reduced, fields) => {
      return fields.reduce((reduced, field) => reduced.add(field), reduced);
    }, new Set([]))
  ];
};

const FieldFocusContext = createContext(defaults);

const FieldFocus = ({children}) => {
  const { baseUrl, fields, responseDocument } = useContext(LocationContext);
  const [ focusPath, setFocusPath ] = useState(defaults.focusPath);
  const availableFocusPaths = findUniqueFieldNames(responseDocument
    ? [responseDocument.getData()].flat()
    : []
  );

  useEffect(() => {
    setFocusPath(null)
  }, [baseUrl, fields]);

  return (
    <FieldFocusContext.Provider value={{
      focusPath,
      setFocusPath,
      availableFocusPaths,
    }}>
      {children}
    </FieldFocusContext.Provider>
  );
};

export { FieldFocusContext };
export default FieldFocus;
