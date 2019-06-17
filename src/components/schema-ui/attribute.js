import React, { useContext } from 'react';
import { LocationContext } from '../../contexts/location';
import { hasSetEntry } from '../../utils';

const Attribute = ({ forPath, attribute, type, includeEnabled }) => {
  const { fields, toggleField, setFilter } = useContext(LocationContext);

  return (
    <div className="attribute">
      <button
        onClick={() => {
          setFilter([...forPath, attribute.name].join('.'), 'create');
        }}
      >
        Create Filter
      </button>
      <input
        type="checkbox"
        checked={
          fields.hasOwnProperty(type) &&
          hasSetEntry(fields[type], attribute.name)
        }
        disabled={!includeEnabled}
        onChange={() => toggleField(type, attribute.name)}
      />
      {attribute.name}
    </div>
  );
};

export default Attribute;
