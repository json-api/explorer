import React, { useContext, useEffect, useState } from 'react';
import {LinkElement} from "../link";
import CodeMirror from "./code-mirror";
import { FieldFocusContext } from "../../contexts/field-focus";

const FieldValue = ({value}) => {
  const json = JSON.stringify(value, null, '  ');
  const options = {
    lineNumbers: false,
    foldGutter: false,
    viewportMargin: 0,
    gutters: [],
  };
  return (
    value && typeof value === "object"
      ? <CodeMirror code={json} options={options} />
      : json
  );
};

const FieldRow = ({ fieldPath, fieldValue }) => {
  return (
    <div>
      <div className="results__field__path">{fieldPath}</div>
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
  const { focusPath, setFocusPath } = useContext(FieldFocusContext);
  const [zoom, setZoom] = useState(null);

  useEffect(() => {
    if (focusPath) {
      setZoom(null);
    }
  }, [focusPath]);

  const resourceObjects = [data].flat();

  return (resourceObjects.length && <div className="results">
    <ul>
      {resourceObjects.map((resourceObject, i) => {
        const type = resourceObject.getType(), id = resourceObject.getID();
        const attributes = Object.entries(resourceObject.getAttributes());
        const links = Object.entries(resourceObject.getOutgoingLinks());
        const showExpand = focusPath && !zoom;
        const isZoomed = zoom && resourceObject.matches(zoom);
        const rowClass = ['results__row'].concat(zoom && !isZoomed ? ['results__row--hidden'] : []);
        let above = true;
        return (
          <li key={`result-row-${i}`} className={rowClass.join(' ')} title={`${id} (${type})`}>
            <ul>
            {attributes.map(([fieldPath, fieldValue], j) => {
              const isFocused = !focusPath || fieldPath === focusPath;
              if (isFocused) {
                above = false;
              }
              let fieldClass = 'results__field';
              fieldClass += focusPath && !isFocused ? ` results__field--hidden results__field--hidden-${above ? 'above' : 'below'}` : '';
              return (
                <li key={`result-row-${i}-field-${j}`} className={fieldClass}>
                  <FieldRow fieldPath={fieldPath} fieldValue={fieldValue}/>
                </li>
              );
            })}
            </ul>
            <div className="results__actions">
              <ul>
                {showExpand && <li key={'zoom'}><button onClick={() => {
                  setZoom({type, id});
                  setFocusPath(null);
                }}>Expand result</button></li>}
                {links.map(([key, link], index) => (
                  <li key={`link-${index}`}>
                    <LinkElement link={link} />
                  </li>
                ))}
              </ul></div>
          </li>
        )
      })}
    </ul>
    {zoom && <button onClick={() => setZoom(null)}>Show all results</button>}
  </div>);
};

export default Summary;
