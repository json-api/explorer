import { useState } from 'react';

const useSchemaLoader = initialPath => {
  const [paths, setPaths] = useState([{ forPath: initialPath }]);

  const load = next => {
    // forPath length corresponds to array depth.
    const current = paths.slice(0, next.forPath.length);
    setPaths([...current, next]);
  };

  return { paths, load };
};

export default useSchemaLoader;
