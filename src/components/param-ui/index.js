import React, { useState } from 'react';

const ParamUI = ({ name, title, edit, children }) => {

  const [editMode, setEditMode] = useState(false);

  return (
    <div className={`param_ui param_ui__${name}`}>
      <span className="param_ui__title">{title}</span>
      {editMode ? (
        <div className={`param_ui__content param_ui__content--edit param_ui__${name}--edit`}>
          {edit}
          <button onClick={() => setEditMode(false)}>Done</button>
        </div>
      ) : (
        <div className={`param_ui__content param_ui__content--view param_ui__${name}--view`}>
          {children}
          <button onClick={() => setEditMode(true)}>Add</button>
        </div>
      )}
    </div>
  );
};

export default ParamUI;
