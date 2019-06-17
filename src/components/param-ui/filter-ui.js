import React, { useContext } from 'react';

import useFilter from '../../hooks/useFilters';
import FilterWidget from './filter-widget';
import { LocationContext } from '../../contexts/location';

const FilterUI = () => {
  const { filter } = useContext(LocationContext);
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
