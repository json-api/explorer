import React from 'react';

import useFilter from './hooks/useFilters';
import FilterWidget from './filterForm';

const FilterUI = ({ filter }) => {
  const { filters } = useFilter(filter);

  return (
    <ul className="scrollable scrollable_y">
      {filters.map((filter, index) => (
        <li key={index}>
          <FilterWidget filter={filter} />
        </li>
      ))}
    </ul>
  );
};

export default FilterUI;
