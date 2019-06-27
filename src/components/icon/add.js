import React from 'react';

import Icon from '.';

const Add = ({ color = '#228572' }) => (
  <Icon>
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
        d="M9 5H7V7H5V9H7V11H9V9H11V7H9V5Z"
        fill={color}
      />
    </>
  </Icon>
);

export default Add;
