import React, { useState } from 'react';

import Filter from './filter';

const FilterUI = ({ filters }) => {
  return (
    <ul className="scrollable scrollable_y">
      {Object.keys(filters).map(key => (
        <li key={key}>
          <Filter id={key} filter={filters[key]} />
        </li>
      ))}
    </ul>
  );
};

export default FilterUI;
