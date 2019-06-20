import React, { useContext, useEffect, useState } from 'react';
import {LinkElement} from "../link";
import {LocationContext} from "../../contexts/location";
import CodeMirror from "./code-mirror";

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

const FieldRow = ({ fieldPath, fieldValue, focused, focus, defocus }) => {
  return (
    <>
      <div className="result-row-path">
        {focused
          ? <a className="result-row-field-focus-link" onClick={focus} title="Hide other fields"><span className="arrow">&uArr;</span>{fieldPath}</a>
          : <a className="result-row-field-focus-link" onClick={defocus} title="Show all fields"><span className="arrow">&dArr;</span>{fieldPath}</a>
        }
      </div>
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

const Summary = ({data, focusPath}) => {
  const { baseUrl, fields } = useContext(LocationContext);
  const [zoom, setZoom] = useState(null);
  const [focus, setFocus] = useState(focusPath);

  useEffect(() => {
    setZoom(null);
    setFocus(null);
  }, [baseUrl, fields]);

  const resourceObjects = [data]
    .flat()
    .filter(obj => !zoom || obj.matches(zoom));

  return (resourceObjects.length && <div className="results">
    <ul>
      {resourceObjects.map((resourceObject, i) => {
        const type = resourceObject.getType(), id = resourceObject.getID();
        const attributes = Object.entries(resourceObject.getAttributes()).filter(([fieldPath]) => !focus || fieldPath === focus);
        const links = Object.entries(resourceObject.getOutgoingLinks());
        return (
          <li key={`result-row-${i}`} className="result-row" title={`${id} (${type})`}>
            <ul>
            {attributes.map(([fieldPath, fieldValue], j) => (
              <li key={`result-row-${i}-field-${j}`} className="result-row-field">
                <FieldRow
                  fieldPath={fieldPath}
                  fieldValue={fieldValue}
                  focused={!focus || fieldPath !== focus}
                  focus={() => {
                    setFocus(fieldPath);
                    setZoom(null);
                  }}
                  defocus={() => {
                    setFocus(null);
                  }}
                />
              </li>
            ))}
            </ul>
            <div className="result-row-actions">
              <ul>
                {(!zoom || !resourceObject.matches(zoom)) && <li key={'zoom'}><button onClick={() => { setZoom({type, id}); setFocus(null) }}>Expand result</button></li>}
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
