import React, { useState, useContext } from 'react';

import { LocationContext } from './location';

const Filter = ({ id, filter }) => {
  const { applyFilter, removeFilter } = useContext(LocationContext);
  const { condition } = filter;
  const [value, setValue] = useState(condition.value);
  const handleApply = () => {
    console.log(`Applying ${id}`);
    applyFilter(id, { value });
  };

  const handleRemove = () => {
    console.log(`Removing ${id}`);
    removeFilter(id);
  };

  return (
    <div>
      {condition.path}
      <select>
        <option value={condition.operator}>{condition.operator}</option>
      </select>
      <input
        value={value}
        onChange={e => setValue(e.target.value)}
        type="text"
      />
      <button className="button" onClick={handleApply}>
        Apply
      </button>
      <button className="button" onClick={handleRemove}>
        Remove
      </button>
    </div>
  );
};

export default Filter;
