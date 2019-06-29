import React, { useState, useContext } from 'react';

import useSchema from '../../hooks/use-schema';
import useSchemaLoader from '../../hooks/use-schema-loader';
import { checkIncludesPath, isEmpty, toggleSetEntry } from '../../utils';
import { LocationContext } from '../../contexts/location';
import FilterWidget from './filter-widget';
import useFilter from '../../hooks/use-filter';
import { processAttributeValue } from '../../lib/schema/normalize';
import ParamSelect from './param-select';
import { Add, Done } from '../icon';

const Attribute = ({ name, filterName }) => {
  const { setFilter } = useContext(LocationContext);

  const handleClick = () => {
    setFilter(filterName, 'create');
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
    return <Attribute filterName={[...forPath, name].join('.')} name={name} />;
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
              filterName={[...forPath, name, key].join('.')}
            />
          ))}
        </div>
      )}
    </div>
  ) : (
    <Attribute name={name} filterName={[...forPath, name].join('.')} />
  );
};
const FilterLoaderList = ({ path, load }) => {
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

const FilterLoaderForm = ({ visible, hide }) => {

  const [values, setValues] = useState(new Set([]));
  const { paths, load } = useSchemaLoader([]);
  const { filter } = useContext(LocationContext);
  const { filters } = useFilter(filter);

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
            <FilterLoaderList
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
      {filters.map((filter, index) => (
        <FilterWidget key={index} filter={filter} />
      ))}
    </div>
  );

};

const FilterLoader = () => {
  const [visible, setVisible] = useState(false);

  const showForm = () => {
    setVisible(true);
  };

  const hideForm = () => {
    setVisible(false);
  };

  return visible ? (
    <FilterLoaderForm visible={visible} hide={hideForm} />
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

export default FilterLoader;
