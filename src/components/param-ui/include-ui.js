import React, { useContext } from 'react';

import { LocationContext } from '../../contexts/location';

const IncludeUI = () => {
  const { include, toggleInclude } = useContext(LocationContext);
  return (
    <ul className="scrollable scrollable_y">
      {include.map((path, index) => (
        <li key={index}>
          <button onClick={() => toggleInclude(path)}>
            <strong>Clear </strong>
            <code>{path}</code>
          </button>
        </li>
      ))}
    </ul>
  );
};

export default IncludeUI;
