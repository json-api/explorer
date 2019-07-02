import React, { useState, useEffect, useContext } from 'react';

import { LocationContext } from '../../contexts/location';
import ParamSelect from './param-select';
import { directions } from '../../lib/messages';

const SortWidget = ({ param }) => {
  const { path } = param;
  const [direction, setDirection] = useState(param.direction);
  const { sort, setSort } = useContext(LocationContext);

  const handleChange = e => {
    setDirection(e.target.value);
  };

  const handleApply = () => {
    const index = sort.findIndex(param => param.path === path);

    setSort([
      ...sort.slice(0, index),
      { path, direction },
      ...sort.slice(index + 1),
    ]);
  };

  useEffect(() => {
    handleApply();
  }, [path, direction]);

  console.log({ directions });
  Object.entries(directions).map(([key, value]) => console.log({ key, value }));

  return (
    <div className="form_widget sort_widget">
      <span className="link__title--readable">{path}</span>
      <ParamSelect
        name="direction"
        handleChange={handleChange}
        selected={direction}
      >
        {Object.entries(directions).map(([key, value]) => (
          <option key={`${key}-direction`} value={key}>
            {value}
          </option>
        ))}
      </ParamSelect>
    </div>
  );
};

export default SortWidget;
