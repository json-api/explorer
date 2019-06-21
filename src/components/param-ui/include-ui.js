import React, { useContext } from 'react';

import { LocationContext } from '../../contexts/location';
import IncludeLoader from './include-loader';

const IncludeUI = () => {
  const { include, toggleInclude } = useContext(LocationContext);

  return (
    <div className="param_ui__include">
    <IncludeLoader forPath={[]} />
    <ul>
      {include.map((path, index) => (
        <li key={index}>
          <button onClick={() => toggleInclude(path)}>
            <strong>Clear </strong>
            <code>{path}</code>
          </button>
        </li>
      ))}
    </ul>
    </div>
  );
};

export default IncludeUI;
