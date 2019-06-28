import { useState } from 'react';

const useSchemaLoader = initialPath => {
  const initialState = [{ forPath: initialPath }];
  const [paths, setPaths] = useState(initialState);

  const load = next => {
    // forPath length corresponds to array depth.
    const current = paths.slice(0, next.forPath.length);
    setPaths([...current, next]);
  };

  const reset = () => {
    setPaths(initialState);
  };

  return { paths, load, reset };
};

export default useSchemaLoader;
