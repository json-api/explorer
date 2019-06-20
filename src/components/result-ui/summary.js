import React, { useContext, useEffect, useState } from 'react';
import {LinkElement} from "../link";
import {LocationContext} from "../../contexts/location";
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
    <>
      <div className="result-row-path">{fieldPath}</div>
      <div className="result-row-value"> {
        Array.isArray(fieldValue)
          ? (
            fieldValue.length ? <ul>
              {fieldValue.map((value, i) => (<li key={i}><FieldValue value={value} /></li>))}
            </ul> : <span className="empty-array">empty</span>
          )
          : <FieldValue value={fieldValue} />
      }</div>
    </>
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

  const resourceObjects = [data]
    .flat()
    .filter(obj => !zoom || obj.matches(zoom));

  return (resourceObjects.length && <div className="results">
    <ul>
      {resourceObjects.map((resourceObject, i) => {
        const type = resourceObject.getType(), id = resourceObject.getID();
        const attributes = Object.entries(resourceObject.getAttributes()).filter(([fieldPath]) => !focusPath || fieldPath === focusPath);
        const links = Object.entries(resourceObject.getOutgoingLinks());
        const showExpand = focusPath && !zoom;
        return (
          <li key={`result-row-${i}`} className="result-row" title={`${id} (${type})`}>
            <ul>
            {attributes.map(([fieldPath, fieldValue], j) => (
              <li key={`result-row-${i}-field-${j}`} className="result-row-field">
                <FieldRow fieldPath={fieldPath} fieldValue={fieldValue}/>
              </li>
            ))}
            </ul>
            <div className="result-row-actions">
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
