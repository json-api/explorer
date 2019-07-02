import React, { useContext } from 'react';

import ParamUI from '.';
import SortLoader from './sort-loader';
import { Close } from '../icon';
import { directions } from '../../lib/messages';

import { LocationContext } from '../../contexts/location';

const SortActive = ({ name, direction }) => {
  const { sort, setSort } = useContext(LocationContext);

  const removeSort = () => {
    const current = [...sort.filter(param => param.path !== name)];
    setSort(current);
  };

  return (
    <div className="param_ui__item param_ui__item--large param_ui__item--sort">
      <span>
        <code>{name}</code>
        <abbr title={directions[direction]}>{direction}</abbr>
      </span>
      <button className="param_ui__button--icon" onClick={removeSort}>
        <Close />
      </button>
    </div>
  );
};

const SortUI = () => {
  const { sort } = useContext(LocationContext);

  return (
    <ParamUI name="sort" title="Sort">
      <SortLoader />
      {sort.map((param, index) => (
        <SortActive
          key={`${param.path}-${index}`}
          name={param.path}
          direction={param.direction}
        />
      ))}
    </ParamUI>
  );
};

export default SortUI;
