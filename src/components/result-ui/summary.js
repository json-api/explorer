import React, { useContext } from 'react';
import {LinkElement} from "../link";
import {FieldFocusContext} from "../../contexts/field-focus";

const FieldValue = ({value}) => {
  const json = JSON.stringify(value, null, '  ');
  return (
    value && typeof value === "object"
      ? <pre>{json}</pre>
      : json
  );
};

const FieldRow = ({ fieldPath, fieldValue, crumbPath = [] }) => {
  const path = (crumbPath||[]).concat([fieldPath]);
  return (
    <div>
      <div className="results__field__path">{path.join(' > ')}</div>
      <div className="results__field__value"> {
        Array.isArray(fieldValue)
          ? (
            fieldValue.length ? <ul>
              {fieldValue.map((value, i) => (<li key={i}><FieldValue value={value} /></li>))}
            </ul> : <span className="results__field__value--empty">empty</span>
          )
          : <FieldValue value={fieldValue} />
      }</div>
    </div>
  );
};

const Summary = ({data}) => {
  const { focus, changeFocus } = useContext(FieldFocusContext);

  let resourceObjects = [data].flat();

  let currentPath = focus.path;
  while (currentPath && currentPath.length > 0) {
    const [current, ...remaining] = currentPath;
    resourceObjects = resourceObjects
      .flatMap(o => o.getRelated(current))
      .filter(o => !!o);
    currentPath = remaining;
  }

  return (resourceObjects.length && <div className="results_rows">
    <ul>
      {resourceObjects.map((resourceObject, i) => {
        const type = resourceObject.getType(), id = resourceObject.getID();
        const withFocus = isRelationship => ([name, value]) => ({
          name,
          value: isRelationship ? value.data : value,
          isFocused: !focus.field || name === focus.field,
          isRelationship,
        });
        const attributes = Object.entries(resourceObject.getAttributes()).map(withFocus(false));
        const relationships = Object.entries(resourceObject.getRelationships()).map(withFocus(true));
        const fields = attributes.concat(relationships);
        const links = Object.entries(resourceObject.getOutgoingLinks());
        const showExpand = focus.field;
        const isZoomed = focus.on && resourceObject.same(focus.on);
        const rowClass = ['results__row'].concat(focus.on && !isZoomed ? ['results__row--hidden'] : []);
        let above = true;
        return (
          <li key={`result-row-${i}`} className={rowClass.join(' ')} title={`${id} (${type})`}>
            <div className="result-row">
              <header>{i + 1} - {type} - {id}</header>
            <ul>
            {fields.map(({name, value, isFocused, isRelationship}, j) => {
              if (isFocused) {
                above = false;
              }
              let fieldClass = 'results__field';
              fieldClass += focus.field && !isFocused ? ` results__field--hidden results__field--hidden-${above ? 'above' : 'below'}` : '';
              return (
                <li key={`result-row-${i}-field-${j}`} className={fieldClass}>
                  <FieldRow
                    row={i}
                    id={id}
                    type={type}
                    fieldPath={name}
                    fieldValue={value}
                    crumbPath={focus.path}
                  />
                </li>
              );
            })}
            </ul>
            <div className="results__actions">
              <ul>
                {!!resourceObject.getRelatedBy() && <li key={'up'}><button onClick={() => {
                  changeFocus('focusUp', {on: resourceObject});
                }}>Up</button></li>}
                {showExpand && <li key={'zoom'}><button onClick={() => {
                  changeFocus('expand', {on: resourceObject});
                }}>Expand result</button></li>}
                {links.map(([key, link], index) => (
                  <li key={`link-${index}`}>
                    <LinkElement link={link} />
                  </li>
                ))}
              </ul>
            </div>
            </div>
          </li>
        )
      })}
    </ul>
    {focus.on && <button onClick={() => changeFocus('zoomOff')}>Show all results</button>}
  </div>);
};

export default Summary;
