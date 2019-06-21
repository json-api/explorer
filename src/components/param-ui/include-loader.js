import React, { useState, useEffect } from 'react';

import useSchema from '../../hooks/use-schema';

const IncludeLoaderList = ({forPath, load}) => {
  const schema = useSchema(forPath);

  if (schema) {
    const { relationships } = schema;
    return relationships.map((relationship, index) => (
      <div key={index}
        onClick={() => load({
            title: relationship.name,
            forPath: [...forPath, relationship.name],
          })
        }
      >
        {relationship.name}
      </div>
    ));
  }
  return <div />;
};

const IncludeLoader = () => {
  const [loadedInclude, setLoadedInclude] = useState([]);
  const schema = useSchema([]);

  const loadNext = next => {
    const loaded = loadedInclude.slice(0, next.forPath.length);
    setLoadedInclude([...loaded, next]);
  };

  useEffect(() => {
    if (schema) {
      loadNext({title: schema.type, forPath: []});
    }
  }, [schema]);

  return loadedInclude.map((include, index) => (
    <IncludeLoaderList key={index} forPath={include.forPath} load={loadNext} />
  ));
};

export default IncludeLoader;
