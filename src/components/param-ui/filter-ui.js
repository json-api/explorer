import React, { useContext } from 'react';

import useFilter from '../../hooks/use-filter';
import FilterWidget from './filter-widget';
import FilterLoader from './filter-loader';
import ParamUI from '.';

import { LocationContext } from '../../contexts/location';

const FilterUI = () => {
  const { filter } = useContext(LocationContext);
  const { filters } = useFilter(filter);

  return (
    <ParamUI name="filter" title="Filter" edit={<FilterLoader />}>
      <ul className="scrollable scrollable_y">
        {filters.map((filter, index) => (
          <li key={index}>
            <FilterWidget key={index} filter={filter} />
          </li>
        ))}
      </ul>
    </ParamUI>
  );
};

export default FilterUI;
