import React, { useState, useContext } from 'react';

import useSchema from '../../hooks/use-schema';
import { isEmpty } from '../../utils';
import useSchemaLoader from '../../hooks/use-schema-loader';

const IncludeLoaderOption = ({ name }) => <option value={name}>{name}</option>;

const IncludeLoaderList = ({ path, load }) => {
  const { forPath } = path;
  const [selected, setSelected] = useState('');
  const schema = useSchema(forPath);

  if (!schema) {
    return <div />;
  }

  const { relationships } = schema;

  const handleChange = e => {
    if (e.target.value !== '') {
      load({ forPath: [...forPath, e.target.value] });
    }

    setSelected(e.target.value);
  };

  return !isEmpty(relationships) ? (
    <select value={selected} onChange={handleChange}>
      <option value="">- Select a relationship -</option>
      {relationships
        .map(relationship => relationship.name)
        .map((name, index) => (
          <IncludeLoaderOption key={index} name={name} />
        ))}
    </select>
  ) : (
    <></>
  );
};

const IncludeLoader = ({ onSubmit }) => {
  const { paths, load } = useSchemaLoader([]);

  const handleSubmit = e => {
    e.preventDefault();

    if (paths.length > 1) {
      const path = paths.slice(-1).pop();
      onSubmit(path.forPath);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {paths.map((path, index) => {
        return (
          <IncludeLoaderList
            key={[...path.forPath, index].join('-')}
            path={path}
            load={load}
          />
        );
      })}
      <button onClick={handleSubmit} type="submit">
        Done
      </button>
    </form>
  );
};

export default IncludeLoader;
