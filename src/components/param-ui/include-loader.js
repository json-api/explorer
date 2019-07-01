import React, { useState, useEffect, useContext } from 'react';

import { LocationContext } from '../../contexts/location';
import ParamSelect from './param-select';
import { isEmpty } from '../../utils';
import useSchema from '../../hooks/use-schema';
import useSchemaLoader from '../../hooks/use-schema-loader';
import { Add, Close } from '../icon';

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

const IncludeForm = ({ onSubmit, visible, setVisible }) => {
  const [active, setActive] = useState(false);
  const schema = useSchema([]);
  const { paths, load, reset } = useSchemaLoader([]);
  const current = paths.length > 1 ? paths.slice(-1).pop() : null;

  const showForm = () => {
    setActive(true);
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (current) {
      onSubmit(current.forPath);
    }

    setActive(false);
    reset();
  };

  useEffect(() => {
    if (schema) {
      setVisible(schema.relationships && schema.relationships.length > 0);
    }
  }, [schema]);

  const type = schema ? schema.type : '';

  return (
    <form onSubmit={handleSubmit}>
      {active ? (
        <div className="param_ui__loader">
          {paths.map((path, index) => {
            return (
              <IncludeLoaderList
                key={[type, ...path.forPath, index].join('-')}
                path={path}
                load={load}
              />
            );
          })}
          {current && (
            <div className="param_ui__item param_ui__item--pill param_ui__item--include">
              <code>{current.forPath.join('.')}</code>
              <button
                className="param_ui__button--icon"
                onClick={handleSubmit}
                type="submit"
              >
                <Add />
              </button>
            </div>
          )}
        </div>
      ) : (
        visible && (
          <div className="param_ui__item">
            <button
              className="param_ui__button--icon"
              onClick={showForm}
              type="submit"
            >
              <Add />
            </button>
          </div>
        )
      )}
    </form>
  );
};

const IncludeLoader = () => {
  const { baseUrl, include, toggleInclude } = useContext(LocationContext);
  const [visible, setVisible] = useState(true);

  // At this level path should be a real forPath like ['uid', 'roles']
  const addInclude = path => {
    const includePathString = path.join('.');
    if (include.indexOf(includePathString) === -1) {
      toggleInclude(includePathString);
    }
  };

  useEffect(() => {
    setVisible(true);
  }, [baseUrl]);

  return (
    <>
      <IncludeForm
        onSubmit={addInclude}
        visible={visible}
        setVisible={setVisible}
      />
      {!visible && (
        <button
          title="There are no relationships to include"
          className="param_ui__button--icon"
        >
          <Add color="#82828c" />
        </button>
      )}
    </>
  );
};

export default IncludeLoader;
