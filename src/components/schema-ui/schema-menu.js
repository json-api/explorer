import React from 'react';

import useSchema from '../../hooks/use-schema';
import SchemaMenuAttribute from './schema-menu-attribute';

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
        <button className="link--prev" onClick={back}>
          Back
        </button>
        <span className="menu__location_title">{type}</span>
      </div>
      <ul className="menu__nav">
        {attributes.map((attribute, index) => (
          <li key={index}>
            <SchemaMenuAttribute attribute={attribute} />
          </li>
        ))}
        {relationships.map((relationship, index) => (
          <li key={index}>
            <button
              className="link--next"
              onClick={() => loadNext(relationship.name)}
            >
              <span className="link__title link__title--readable">
                {relationship.name}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SchemaMenu;
