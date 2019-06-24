import React, { useState, useContext } from 'react';

import useSchema from '../../hooks/use-schema';
import { LocationContext } from '../../contexts/location';
import { isEmpty } from '../../utils';

const IncludeLoaderOption = ({ name }) => <option value={name}>{name}</option>;

const IncludeLoaderList = ({ forPath }) => {
  const { include, toggleInclude } = useContext(LocationContext);
  const [selected, setSelected] = useState('');
  const includePathString = forPath.join('.');
  const schema = useSchema(forPath);

  if (!schema) {
    return <div />;
  }

  const handleChange = e => {
    setSelected(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (selected !== '') {
      toggleInclude(selected);
      setSelected('');
    }
  };


  const { relationships } = schema;

  return !isEmpty(relationships) ? (
    <form onSubmit={handleSubmit}>
      <span>{includePathString}</span>
      <select value={selected} onChange={handleChange}>
        <option value="">- Select a relationship -</option>
        {relationships
          .map(relationship => [...forPath, relationship.name].join('.'))
          .filter(name => include.indexOf(name) === -1)
          .map((name, index) => (
            <IncludeLoaderOption key={index} name={name} />
          ))}
      </select>
      <button type="submit">Add</button>
    </form>
  ) : (
    <div />
  );
};

const IncludeLoader = () => {
  const { include } = useContext(LocationContext);
  const paths = [[], ...include.map(path => path.split('.'))];

  return paths.map((forPath, index) => (
    <IncludeLoaderList key={index} forPath={forPath} />
  ));
};

export default IncludeLoader;
