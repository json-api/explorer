import React, { useContext, useState } from 'react';
import {FieldFocusContext} from "../../contexts/field-focus";

import {isEmpty} from '../../utils';

const getFocusString = (focus) => {
  return [...(focus.path||[]), ...(focus.field ? [focus.field] : [])].join('.')
};

const SchemaMenuAttributeName = ({ name }) => (
  <div className="menu__attribute">
    <span className="link__title link__title--readable">{name}</span>
  </div>
);

const AttributeFocusToggle = ({path}) => {
  const { focus, changeFocus, availableFocusPaths } = useContext(FieldFocusContext);
  const [ pinned, setPinned ] = useState(false);
  const [ unpinned, setUnpinned ] = useState(false);

  const onMouseEnter = () => {
    changeFocus('focusOn', {
      path: path.slice(0, -1),
      field: path[path.length - 1],
    });
  };

  const onMouseLeave = () => {
    if (unpinned) {
      changeFocus('focusOff');
    } else if (pinned) {
      changeFocus('focusOn', {
        path: path.slice(0, -1),
        field: path[path.length - 1],
      });
    }
    else {
      changeFocus('toLast');
    }
    setPinned(false);
    setUnpinned(false);
  };

  if (availableFocusPaths.includes([...path].join('.'))) {
    const focusString = getFocusString(focus);
    const active = focusString === path.join('.');
    const classes = active
      ? 'link__toggle link__toggle--active'
      : 'link__toggle';
    return (
      <span
        className={classes}
        onClick={() => {
          (getFocusString(focus.last) === path.join('.')) || pinned ? setUnpinned(!unpinned) : setPinned(!pinned);
        }}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >{(active && !unpinned) || (!active && pinned) ? <>&oplus;</> : <>&#8857;</>}</span>
    );
  } else {
    return (
      <span
        className="link__toggle link__toggle--disabled"
        title="This field is not in the response. This may be because it has been omitted by a sparse fieldset or, if it is a field on an related resource, its relationship has not been included."
      >&otimes;</span>);
  }
};

const SchemaMenuAttributeValue = ({ name, value, forPath, level }) => {
  const { type, title, description, properties, ...values } = value;

  return (
    <div className={`menu__attribute menu__attribute--${type}`}>
      <div className="menu__attribute_header">
        <span className="link__title link__title--readable">
          {title}
          {level === 0 && <AttributeFocusToggle path={[...forPath, name]} />}
        </span>
        <span className="link__text link__text--machine">{name}</span>
        {type !== 'object' && <span className="link__text_type link__text--machine">{type}</span>}
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
