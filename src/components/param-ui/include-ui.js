import React, { useContext } from 'react';

import { LocationContext } from '../../contexts/location';
import IncludeLoader from './include-loader';
import { Close } from '../icon';

import ParamUI from '.';

const IncludeUI = () => {
  const { include, toggleInclude } = useContext(LocationContext);

  // At this level path should be a real forPath like ['uid', 'roles']
  const addInclude = path => {
    const includePathString = path.join('.');
    if (include.indexOf(includePathString) === -1) {
      toggleInclude(includePathString);
    }
  };

  return (
    <ParamUI
      name="include"
      title="Include"
      edit={<IncludeLoader onSubmit={addInclude} />}
    >
      {include.map((path, index) => (
        <div key={`${path}-${index}`} className="param_ui__item param_ui__item--pill param_ui__item--include">
          <code>{path}</code>
          <button className="param_ui__button--icon" onClick={() => toggleInclude(path)}>
            <Close />
          </button>
        </div>
      ))}
    </ParamUI>
  );
};

export default IncludeUI;
