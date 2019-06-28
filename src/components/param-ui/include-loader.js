import React, { useState } from 'react';

import ParamSelect from './param-select';
import { isEmpty } from '../../utils';
import useSchema from '../../hooks/use-schema';
import useSchemaLoader from '../../hooks/use-schema-loader';

const IncludeLoaderOption = ({ name }) => <option value={name}>{name}</option>;

const IncludeLoaderList = ({ path, load, setActive }) => {
  const { forPath } = path;
  const [selected, setSelected] = useState('');
  const schema = useSchema(forPath);

  if (!schema) {
    return <div />;
  }

  const { relationships } = schema;

  if (forPath.length == 0) {
    setActive(relationships.length > 0);
  }

  const handleChange = e => {
    if (e.target.value !== '') {
      load({ forPath: [...forPath, e.target.value] });
    } else {
      // Trim unselected option.
      load({ forPath: [...forPath] });
    }

    setSelected(e.target.value);
  };

  return (
    <div className="param_ui__loader_list">
      {relationships.length > 0 && (
        <ParamSelect selected={selected} handleChange={handleChange}>
          <option value="">---</option>
          {relationships
            .map(relationship => relationship.name)
            .map((name, index) => (
              <IncludeLoaderOption key={index} name={name} />
            ))}
        </ParamSelect>
      )}
    </div>
  );
};

const IncludeLoader = ({ onSubmit }) => {
  const { paths, load } = useSchemaLoader([]);
  const [active, setActive] = useState(false);
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
              setActive={setActive}
            />
          );
        })}
      </div>
      {active ? (
        <button onClick={handleSubmit} type="submit" disabled={!current}>
          {current ? current.forPath.join('.') : 'Select a relationship'}
        </button>
      ) : (
        <span className="">Nothing to Include</span>
      )}
    </form>
  );
};

export default IncludeLoader;
