import React, { useState, useContext } from 'react';

import useSchema from '../../hooks/use-schema';
import useSchemaLoader from '../../hooks/use-schema-loader';
import { checkIncludesPath, hasSetEntry, toggleSetEntry } from '../../utils';
import { LocationContext } from '../../contexts/location';
import FilterWidget from './filter-widget';
import useFilter from '../../hooks/use-filter';

const Attribute = ({ forPath, attribute, includeEnabled }) => {
  const { setFilter } = useContext(LocationContext);
  return (
    <div className="attribute">
      <button
        onClick={() => {
          setFilter([...forPath, attribute.name].join('.'), 'create');
        }}
      >
        {attribute.name}
      </button>
    </div>
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
      <div className="filter_loader__list">
        <div className="param_ui__attribute_list">
          {attributes.map(attribute => (
            <Attribute
              key={`${schema.type}-${attribute.name}`}
              attribute={attribute}
              type={schema.type}
              forPath={forPath}
              includeEnabled={includesEnabled}
            />
          ))}
        </div>
        <select className="param_ui__relationship_list" onChange={handleChange}>
          <option value="">Select a relationship</option>
          {relationships.map(relationship => (
            <option
              key={[...forPath, relationship.name].join('-')}
              value={relationship.name}
            >
              {relationship.name}
            </option>
          ))}
        </select>
      </div>
    );
  }

  return <></>;
};

const FilterLoader = () => {
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
      </form>
      <ul>
        {filters.map((filter, index) => (
          <li key={index}>
            <FilterWidget filter={filter} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FilterLoader;
