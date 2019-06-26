import React, { useContext } from 'react';

import { LocationContext } from '../../contexts/location';
import IncludeLoader from './include-loader';
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
        <button key={index} onClick={() => toggleInclude(path)}>
          <code>{path}</code>
        </button>
      ))}
    </ParamUI>
  );
};

export default IncludeUI;
