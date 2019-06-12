import React, { useState, useContext } from 'react';

import { LocationContext } from './location';
import { Conditions } from './lib/filters-juissy';

const FilterForm = ({ filter }) => {
  const { id, expanded } = filter;
  const { condition } = expanded[id];

  const [value, setValue] = useState(condition.value);
  const [operator, setOperator] = useState(condition.operator);
  const { setFilter } = useContext(LocationContext);

  const handleChange = e => {
    switch (e.target.name) {
      case 'value':
        setValue(e.target.value);
        break;
      case 'operator':
        setOperator(e.target.value);
        break;
    }
  };

  const handleApply = () => {
    setFilter(id, 'update', {
      ...expanded,
      [id]: { condition: { ...condition, operator, value } },
    });
  };

  const handleRemove = () => {
    setFilter(id, 'delete');
  };

  return (
    <div>
      {id}
      <select name="operator" onChange={handleChange} defaultValue={operator}>
        {[...Conditions.unaryOperators].map((unary, index) => (
          <option key={`${id}-operator-${index}`} value={unary}>
            {unary}
          </option>
        ))}
      </select>
      <input name="value" type="text" value={value} onChange={handleChange} />
      <button className="button" onClick={handleApply}>
        Update
      </button>
      <button className="button" onClick={handleRemove}>
        Remove
      </button>
    </div>
  );
};

export default FilterForm;
