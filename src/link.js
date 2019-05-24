import React from 'react';

const Link = ({title, url, handleClick}) => (

  <button onClick={() => handleClick(url)}>{title}</button>
);


export default Link;
