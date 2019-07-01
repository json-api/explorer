import React from 'react';

const IconContainer = ({ height = 16, width = 16, children }) => (
  <svg
    width={width}
    height={height}
    viewBox={`0 0 ${width} ${height}`}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {children}
  </svg>
);

export default IconContainer;
