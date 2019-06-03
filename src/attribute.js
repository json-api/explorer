import React, { useContext } from 'react';
import { LocationContext } from './location';
import { hasSetEntry } from './utils';

const Attribute = ({ data, type }) => {
  const { fields, toggleField } = useContext(LocationContext);

  return (
    <div className="attribute">
      <input
        type="checkbox"
        checked={
          fields.hasOwnProperty(type) && hasSetEntry(fields[type], data.name)
        }
        onChange={() => toggleField(type, data.name)}
      />
      {data.name}
    </div>
  );
}

export default Attribute;
