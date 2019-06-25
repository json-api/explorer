import React, { useState, useContext } from 'react';

import useSchema from '../../hooks/use-schema';
import { isEmpty } from '../../utils';

const IncludeLoaderOption = ({ name }) => <option value={name}>{name}</option>;

const IncludeLoaderList = ({ forPath, onChange }) => {
  const schema = useSchema(forPath);
  const [selected, setSelected] = useState('');

  if (!schema) {
    return <div />;
  }

  const { relationships } = schema;

  const handleChange = e => {
    if (e.target.value !== '') {
      onChange([...forPath, e.target.value], forPath.length);
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
  const initialPath = [];
  const [paths, setPaths] = useState([initialPath]);

  const handleChange = (path, index) => {
    const current = paths.slice(0, index + 1);
    current.push(path);
    setPaths(current);
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (paths.length > 1) {
      onSubmit(paths.slice(-1).pop());
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {paths.map((forPath, index) => {
        return (
          <IncludeLoaderList
            key={index}
            forPath={forPath}
            onChange={handleChange}
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
