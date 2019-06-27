import React from 'react';

const ParamSelect = ({ children, selected, handleChange }) => (
  <select
    className="form-element form-element--small form-element--type-select"
    value={selected}
    onChange={handleChange}
  >
    {children}
  </select>
);

export default ParamSelect;
