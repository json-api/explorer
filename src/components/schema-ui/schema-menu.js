import React from 'react';

import useSchema from '../../hooks/use-schema';

const SchemaMenu = ({ forPath, load, back, next }) => {
  const schema = useSchema(forPath);
  const { type = '', attributes = [], relationships = [] } = schema || {};

  const loadNext = name => {
    load([...forPath, name]);
    next();
  };

  return (
    <div className="menu__container">
      <div className="menu__location">
        {type} <button onClick={back}>Back</button>
      </div>
      <ul className="menu__nav">
        {attributes.map((attribute, index) => (
          <li key={index}>{attribute.name}</li>
        ))}
      </ul>
      <hr />
      <ul className="menu__nav">
        {relationships.map((relationship, index) => (
          <li key={index}>
            <span>{relationship.name}</span>
            <button onClick={() => loadNext(relationship.name)}>load</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SchemaMenu;
