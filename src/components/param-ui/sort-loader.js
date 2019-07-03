import React, { useState, useContext } from 'react';

import { Add, Done } from '../icon';
import useSchemaLoader from '../../hooks/use-schema-loader';
import { LocationContext } from '../../contexts/location';
import SortWidget from './sort-widget';
import { checkIncludesPath, isEmpty, toggleSetEntry } from '../../utils';
import useSchema from '../../hooks/use-schema';

import ParamSelect from './param-select';
import { processAttributeValue } from '../../lib/schema/normalize';

const Attribute = ({ name, path }) => {
  const { sort, setSort } = useContext(LocationContext);

  const handleClick = () => {
    setSort([...sort, {path, direction: 'ASC' }]);
  };

  return (
    <div className="attribute">
      <button className="param_ui__button--icon" onClick={handleClick}>
        <Add />
      </button>
      <span>{name}</span>
    </div>
  );
};

const AttributeValue = ({ forPath, attribute, includeEnabled }) => {
  const { name, value } = attribute;

  if (!value) {
    return <Attribute path={[...forPath, name].join('.')} name={name} />;
  }

  const { type, properties } = processAttributeValue(value);

  return type === 'object' ? (
    <div className="attribute_header">
      <span className="link__title--readable">{name}</span>
      {!isEmpty(properties) && (
        <div className="attribute_properties">
          {Object.entries(properties).map(([key, value], index) => (
            <Attribute
              key={`${name}-${key}-${index}`}
              name={key}
              path={[...forPath, name, key].join('.')}
            />
          ))}
        </div>
      )}
    </div>
  ) : (
    <Attribute name={name} path={[...forPath, name].join('.')} />
  );
};

const SortLoaderList = ({ path, load }) => {
  const { forPath } = path;
  const { include } = useContext(LocationContext);
  const includesEnabled = checkIncludesPath(include, forPath);
  const schema = useSchema(forPath);

  const handleChange = e => {
    load({ forPath: [...forPath, e.target.value] });
  };

  if (schema) {
    const { attributes, relationships } = schema;

    return (
      <div className="param_ui__loader_list">
        <div className="param_ui__attribute_list">
          {attributes.map(attribute => (
            <AttributeValue
              key={`${schema.type}-${attribute.name}`}
              attribute={attribute}
              type={schema.type}
              forPath={forPath}
              includeEnabled={includesEnabled}
            />
          ))}
        </div>
        <ParamSelect handleChange={handleChange}>
          <option value="">Select a relationship</option>
          {relationships.map(relationship => (
            <option
              key={[...forPath, relationship.name].join('-')}
              value={relationship.name}
            >
              {relationship.name}
            </option>
          ))}
        </ParamSelect>
      </div>
    );
  }

  return <></>;
};

const SortLoaderForm = ({ hide }) => {
  const { sort } = useContext(LocationContext);
  const [values, setValues] = useState(new Set([]));
  const { paths, load } = useSchemaLoader([]);

  const addAttribute = attribute => {
    const current = new Set([...values]);
    setValues(toggleSetEntry(current, attribute));
  };

  const handleSubmit = e => {
    e.preventDefault();
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="param_ui__fieldset_form">
        <div className="param_ui__loader">
          {paths.map((path, index) => (
            <SortLoaderList
              key={[...path.forPath, index].join('-')}
              index={index}
              path={path}
              load={load}
              values={values}
              addAttribute={addAttribute}
            />
          ))}
        </div>
        <div className="param_ui__item">
          <button
            className="param_ui__button--icon"
            onClick={hide}
            type="submit"
          >
            <Done />
          </button>
        </div>
      </form>
      {sort.map(param => (
        <SortWidget param={param} />
      ))}
    </div>
  );

};

const SortLoader = () => {
  const [visible, setVisible] = useState(false);

  const showForm = () => {
    setVisible(true);
  };

  const hideForm = () => {
    setVisible(false);
  };

  return visible ? (
    <SortLoaderForm visible={visible} hide={hideForm} />
  ) : (
    <div className="param_ui__item">
      <button
        className="param_ui__button--icon"
        onClick={showForm}
        type="submit"
      >
        <Add />
      </button>
    </div>
  );
};

export default SortLoader;
