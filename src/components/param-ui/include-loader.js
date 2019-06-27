import React, { useState, useContext } from 'react';

import ParamSelect from './param-select';
import { isEmpty } from '../../utils';
import useSchema from '../../hooks/use-schema';
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
    else {
      // Trim unselected option.
      load({ forPath: [...forPath]});
    }

    setSelected(e.target.value);
  };

  return (
    <div className="param_ui__loader_list">
    <ParamSelect selected={selected} handleChange={handleChange}>
      <option value="">---</option>
      {relationships
        .map(relationship => relationship.name)
        .map((name, index) => (
          <IncludeLoaderOption key={index} name={name} />
        ))}
    </ParamSelect>
    </div>
  );
};

const IncludeLoader = ({ onSubmit }) => {
  const { paths, load } = useSchemaLoader([]);

  const current = paths.length > 1 ? paths.slice(-1).pop() : null;

  const handleSubmit = e => {
    e.preventDefault();

    if (current) {
      onSubmit(current.forPath);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="param_ui__loader">
      {paths.map((path, index) => {
        return (
          <IncludeLoaderList
            key={[...path.forPath, index].join('-')}
            path={path}
            load={load}
          />
        );
      })}
      </div>
      <button onClick={handleSubmit} type="submit" disabled={!current}>
        {current ? current.forPath.join('.') : 'Select a relationship'}
      </button>
    </form>
  );
};

export default IncludeLoader;
