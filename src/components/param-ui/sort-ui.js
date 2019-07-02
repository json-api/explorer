import React, { useContext } from 'react';

import ParamUI from '.';
import SortLoader from './sort-loader';
import { Close } from '../icon';

import { LocationContext } from '../../contexts/location';

const SortUI = () => {
  const { sort, setSort } = useContext(LocationContext);

  const removeSort = name => {
    
  }

  return (
    <ParamUI name="sort" title="Sort">
      <SortLoader />
      {sort.map((param, index) => (
        <div
          key={`${param.name}-${index}`}
          className="param_ui__item param_ui__item--large param_ui__item--sort"
        >
          <span>
            <code>{param.name}</code>
            <abbr
              title={`${
                param.direction === 'ASC' ? 'Ascending' : 'Descending'
              }`}
            >
              {param.direction}
            </abbr>
          </span>
          <button
            key={`${fObj.id}-${index}`}
            className="param_ui__button--icon"
            onClick={() => setFilter(fObj.id, 'delete')}
          >
            <Close />
          </button>
        </div>
      ))}
    </ParamUI>
  );
};

export default SortUI;
