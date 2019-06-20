import React, { useContext, useState } from 'react';
import {FieldFocusContext} from "../../contexts/field-focus";

const SchemaMenuAttributeName = ({ name }) => (
  <div className="menu__attribute">
    <span className="link__title link__title--readable">{name}</span>
  </div>
);

const AttributeFocusToggle = ({path}) => {
  const { focusPath, setFocusPath, availableFocusPaths } = useContext(FieldFocusContext);
  const [ lastFocusPath, setLastFocusPath ] = useState(focusPath);
  const [ pinned, setPinned ] = useState(false);
  const [ unpinned, setUnpinned ] = useState(false);

  const onMouseEnter = () => {
    setLastFocusPath(focusPath);
    setFocusPath(path);
  };

  const onMouseLeave = () => {
    if (unpinned) {
      setFocusPath(null);
    } else if (pinned) {
      setFocusPath(path);
    }
    else {
      setFocusPath(lastFocusPath);
    }
    setPinned(false);
    setUnpinned(false);
  };

  if (availableFocusPaths.includes(path)) {
    const active = focusPath === path;
    const classes = active
      ? 'link__toggle link__toggle__active'
      : 'link__toggle';
    return (
      <span
        className={classes}
        onClick={() => {
          lastFocusPath === path || pinned ? setUnpinned(!unpinned) : setPinned(!pinned);
        }}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >{(active && !unpinned) || (!active && pinned) ? <>&oplus;</> : <>&#8857;</>}</span>
    );
  } else {
    return (
      <span
        className="link__toggle link__toggle__disabled"
        title="This field is not in the response. This may be because it has been omitted by a sparse fieldset or, if it is a field on an related resource, its relationship has not been included."
      >&otimes;</span>);
  }
};

const SchemaMenuAttributeValue = ({ name, value }) => {
  const { type, title, description, properties, ...values } = value;

  return (
    <div className={`menu__attribute menu__attribute--${type}`}>
      <div className="menu__attribute_header">
        <span className="link__title link__title--readable">
          {title}
          <AttributeFocusToggle path={name} />
        </span>
        <span className="link__text link__text--machine">{name}</span>
        {type !== 'object' && <span className="link__text_type link__text--machine">{type}</span>}
        {description && <p className="link__text_description">{description}</p>}
      </div>
      <ul className="menu__attribute_properties">
        {properties
          ? Object.entries(properties).map(([key, value], index) => (
              <li key={`${name}-${key}-${index}`}>
                <SchemaMenuAttribute attribute={{ name: key, value }} />
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
      </ul>
    </div>
  );
};

const SchemaMenuAttribute = ({ attribute }) => {
  const { name, value } = attribute;

  return value ? (
    <SchemaMenuAttributeValue name={name} value={value} />
  ) : (
    <SchemaMenuAttributeName name={name} />
  );
};

export default SchemaMenuAttribute;
