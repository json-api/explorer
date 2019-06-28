import React, { useState, useContext } from 'react';

import { LocationContext } from '../../contexts/location';
import { Conditions } from '../../lib/url/filters-juissy';
import Close from '../icon/close';
import Update from '../icon/update';
import ParamSelect from './param-select';

const FilterWidget = ({ filter }) => {
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
    <div className="filter_widget">
      <span className="link__title--readable">{id}</span>
      <ParamSelect name="operator" handleChange={handleChange} selected={operator}>
        {[...Conditions.unaryOperators].map((unary, index) => (
          <option key={`${id}-operator-${index}`} value={unary}>
            {unary}
          </option>
        ))}
      </ParamSelect>
      <input name="value" type="text" value={value} onChange={handleChange} />
      <div className="filter_widget__action">
        <div className="param_ui__item param_ui__item--pill param_ui__item--fieldset">
          <button className="param_ui__button--icon" onClick={handleApply}>
            <Update />
          </button>
        </div>
        <div className="param_ui__item param_ui__item--pill param_ui__item--fieldset">
          <button className="param_ui__button--icon" onClick={handleRemove}>
            <Close />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterWidget;
