import React from 'react';

import Icon from '.';

const Close = ({ color = '#d72222' }) => (
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
        d="M10.8284 6.58579L9.41421 5.17157L8 6.58579L6.58579 5.17157L5.17157 6.58579L6.58579 8L5.17157 9.41421L6.58579 10.8284L8 9.41421L9.41421 10.8284L10.8284 9.41421L9.41421 8L10.8284 6.58579Z"
        fill={color}
      />
    </>
  </Icon>
);

export default Close;
