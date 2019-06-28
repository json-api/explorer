import React from 'react';

const ParamUI = ({ name, title, children }) => {
  return (
    <div className={`param_ui param_ui__${name}`}>
      <span className="param_ui__title">{title}</span>
      <div
        className={`param_ui__content param_ui__content--view param_ui__${name}--view`}
      >
        {children}
      </div>
    </div>
  );
};

export default ParamUI;
