import React from 'react';

import IconContainer from './icon-container';

const Done = ({ color = '#228572' }) => (
  <IconContainer>
    <>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8 15C11.866 15 15 11.866 15 8C15 4.13401 11.866 1 8 1C4.13401 1 1 4.13401 1 8C1 11.866 4.13401 15 8 15ZM8 14C11.3137 14 14 11.3137 14 8C14 4.68629 11.3137 2 8 2C4.68629 2 2 4.68629 2 8C2 11.3137 4.68629 14 8 14Z"
        fill={color}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.8995 6.41421L11.4853 5L6.53553 9.94975L4.41421 7.82843L3 9.24264L5.12132 11.364L6.53553 12.7782L7.94975 11.364L12.8995 6.41421Z"
        fill={color}
      />
    </>
  </IconContainer>
);

export default Done;
