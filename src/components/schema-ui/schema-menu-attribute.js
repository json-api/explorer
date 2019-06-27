import React from 'react';

import {isEmpty} from '../../utils';
import { processAttributeValue } from '../../lib/schema/normalize';
import FieldFocusToggle from "./field-focus-toggle";

const SchemaMenuAttributeName = ({ name }) => (
  <div className="menu__attribute">
    <span className="link__title link__title--readable">{name}</span>
  </div>
);

const SchemaMenuAttributeValue = ({ name, value, forPath, level }) => {

  const { type, title, description, properties, values } = processAttributeValue(value);

  return (
    <div className={`menu__attribute menu__attribute--${type}`}>
      <div className="menu__attribute_header">
        <span className="link__title link__title--readable">
          {title}
          {level === 0 && <FieldFocusToggle path={[...forPath, name]} />}
        </span>
        <span className="link__text link__text--machine">{name}</span>
        <span className="link__text_type link__text--machine">{type||'undefined'}</span>
        {description && <p className="link__text_description">{description}</p>}
      </div>
      { (!isEmpty(properties) || !isEmpty(values)) &&
      <ul className="menu__attribute_properties">
        {properties
          ? Object.entries(properties).map(([key, value], index) => (
              <li key={`${name}-${key}-${index}`}>
                <SchemaMenuAttribute attribute={{ name: key, value }} level={level + 1} />
              </li>
            ))
          : Object.entries(values).map(([key, value], index) => (
              <li key={`${name}-${key}-${index}`}>
                <span className="link__text link__text_label">{key}</span>
                <span className="link__text link__text_value">
                  : {JSON.stringify(value)}
                </span>
              </li>
            ))}
      </ul>}
    </div>
  );
};

const SchemaMenuAttribute = ({ attribute, forPath, level = 0 }) => {
  const { name, value } = attribute;

  return value ? (
    <SchemaMenuAttributeValue name={name} value={value} forPath={forPath} level={level}/>
  ) : (
    <SchemaMenuAttributeName name={name} />
  );
};

export default SchemaMenuAttribute;
