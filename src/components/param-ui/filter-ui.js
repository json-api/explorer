import React, { useContext } from 'react';

import useFilter from '../../hooks/use-filter';
import FilterLoader from './filter-loader';
import ParamUI from '.';

import { LocationContext } from '../../contexts/location';

const FilterUI = () => {
  const { filter, setFilter } = useContext(LocationContext);
  const { filters } = useFilter(filter);

  return (
    <ParamUI name="filter" title="Filter" edit={<FilterLoader />}>
      {filters.map((fObj, index) => (
        fObj.expanded[fObj.id].condition && (
          <button
            key={`${fObj.id}-${index}`}
            className="button"
            onClick={() => setFilter(fObj.id, 'delete')}
          >
            <strong>{fObj.expanded[fObj.id].condition.path} </strong>
            <code>{fObj.expanded[fObj.id].condition.operator}</code>
            <strong> {fObj.expanded[fObj.id].condition.value}</strong>
          </button>
        )
      ))}
    </ParamUI>
  );
};

export default FilterUI;
