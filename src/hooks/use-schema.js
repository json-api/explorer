import { useContext, useEffect, useState } from 'react';
import {LocationContext} from "../contexts/location";

const useSchema = (forPath = []) => {
  const { responseDocument } = useContext(LocationContext);
  const [schema, setSchema] = useState(null);
  useEffect(() => {
    if (responseDocument)
      responseDocument.getSchema(forPath).then(setSchema);
  }, [responseDocument]);
  return schema;
};

export default useSchema;
