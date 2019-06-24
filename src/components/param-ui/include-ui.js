import React, { useState, useEffect, useContext } from 'react';

import { LocationContext } from '../../contexts/location';
import IncludeLoader from './include-loader';
import useSchema from '../../hooks/use-schema';

const IncludeUI = () => {
  const schema = useSchema([]);
  const { include, toggleInclude } = useContext(LocationContext);
  const [editMode, setEditMode] = useState(false);

  // At this level path should be a real forPath like ['uid', 'roles']
  const addInclude = path => {
    const includePathString = path.join('.');
    if (include.indexOf(includePathString) === -1) {
      toggleInclude(includePathString);
    }
    setEditMode(false);
  };

  return schema ? (
    <div className="param_ui__include">
      <span className="param_ui__title">Includes</span>
      {editMode ? (
      <div className="param_ui__include--edit">
        <IncludeLoader onSubmit={addInclude} />
      </div>
      ) : (
      <div className="param_ui__include--view">
        {include.map((path, index) => (
          <button key={index} onClick={() => toggleInclude(path)}>
            <code>{path}</code>
          </button>
        ))}
        <button onClick={() => setEditMode(true)}>Add</button>
      </div>
      )}
    </div>
  ) : (
    <div />
  );
};

export default IncludeUI;
