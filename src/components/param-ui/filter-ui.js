import React, { useContext } from 'react';

import useFilter from '../../hooks/use-filter';
import FilterLoader from './filter-loader';
import ParamUI from '.';
import { Close } from '../icon';

import { LocationContext } from '../../contexts/location';

const FilterUI = () => {
  const { filter, setFilter } = useContext(LocationContext);
  const { filters } = useFilter(filter);

  return (
    <ParamUI name="filter" title="Filter">
      <FilterLoader />
      {filters.map(
        (fObj, index) =>
          fObj.expanded[fObj.id].condition && (
            <div
              key={`${fObj.id}-${index}`}
              className="param_ui__item param_ui__item--large param_ui__item--fieldset"
            >
              <span>
                {fObj.expanded[fObj.id].condition.path}{' '}
                <code>{fObj.expanded[fObj.id].condition.operator}</code>{' '}
                {fObj.expanded[fObj.id].condition.value ? (
                  fObj.expanded[fObj.id].condition.value
                ) : (
                  <span className="value--missing">
                    <abbr title="Filter value not selected">...</abbr>
                  </span>
                )}
              </span>
              <button
                key={`${fObj.id}-${index}`}
                className="param_ui__button--icon"
                onClick={() => setFilter(fObj.id, 'delete')}
              >
                <Close />
              </button>
            </div>
          ),
      )}
    </ParamUI>
  );
};

export default FilterUI;
