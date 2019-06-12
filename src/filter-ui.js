import React from 'react';

import useFilter from './hooks/useFilters';
import FilterForm from './filterForm';

const FilterUI = ({ filter }) => {
  const { filterForms } = useFilter(filter);

  return (
    <ul className="scrollable scrollable_y">
      {filterForms.map((filter, index) => (
        <li key={index}>
          <FilterForm filter={filter} />
        </li>
      ))}
    </ul>
  );
};

export default FilterUI;
