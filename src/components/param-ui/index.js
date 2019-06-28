import React from 'react';

const ParamUI = ({ name, title, edit, children }) => {
  return (
    <div className={`param_ui param_ui__${name}`}>
      <span className="param_ui__title">{title}</span>
      <div
        className={`param_ui__content param_ui__content--view param_ui__${name}--view`}
      >
        {children}
      </div>
      <div
        className={`param_ui__content param_ui__content--edit param_ui__${name}--edit`}
      >
        {edit}
      </div>
    </div>
  );
};

export default ParamUI;
