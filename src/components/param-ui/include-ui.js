import React, { useContext } from 'react';

import { LocationContext } from '../../contexts/location';
import IncludeLoader from './include-loader';
import { Close } from '../icon';

import ParamUI from '.';

const IncludeUI = () => {
  const { include, toggleInclude } = useContext(LocationContext);

  return (
    <ParamUI name="include" title="Include">
      <IncludeLoader />
      {include.map((path, index) => (
        <div
          key={`${path}-${index}`}
          className="param_ui__item param_ui__item--pill param_ui__item--include"
        >
          <code>{path}</code>
          <button
            className="param_ui__button--icon"
            onClick={() => toggleInclude(path)}
          >
            <Close />
          </button>
        </div>
      ))}
    </ParamUI>
  );
};

export default IncludeUI;
