import React from 'react';

import useSchema from '../../hooks/use-schema';

const IncludeLoader = forPath => {

  const schema = useSchema(forPath);

  if (schema) {
    const { relationships } = schema;
    return (
      relationships.map(relationship => <div>{relationship.name}</div>)
    );
  }
  return (<div></div>)

};

export default IncludeLoader;
