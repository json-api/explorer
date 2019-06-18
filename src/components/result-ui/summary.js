import React, { useState } from 'react';
import {LinkElement} from "../link";

const flattenObject = (obj, previous = '') => {
  const flattened = {};
  Object.entries(obj).forEach(([property, value]) => {
    const key = `${previous.length ? `${previous}.` : ''}${property}`;
    let assign;
    if (value && typeof value === 'object') {
      assign = flattenObject(value, key);
    }  else {
      assign = {[key]: value};
    }
    Object.assign(flattened, assign);
  });
  return flattened;
};

const FieldRow = ({ fieldPath, fieldValue, focused, focus, defocus }) => {
  return (
    <>
      <div className={"result-row-path"}>
        {focused
          ? <a className={"result-row-field-focus-link"} onClick={focus} title="Hide other fields"><span className={"arrow"}>&uArr;</span>{fieldPath}</a>
          : <a className={"result-row-field-focus-link"} onClick={defocus} title="Show all fields"><span className={"arrow"}>&dArr;</span>{fieldPath}</a>
        }
      </div>
      <div className={"result-row-value"}>{JSON.stringify(fieldValue)}</div>
    </>
  );
};

const Summary = ({data, focusPath, defaultZoom}) => {
  const [zoom, setZoom] = useState(defaultZoom);
  const [focus, setFocus] = useState(focusPath);
  const rows = [data]
    .flat()
    .filter(obj => !zoom || obj.matches(zoom));
  return (rows.length && <div className={"results"}>
    <ul>
      {rows.map((resourceObject, i) => {
        const type = resourceObject.getType(), id = resourceObject.getID();
        const attributes = Object.entries(flattenObject(resourceObject.getAttributes())).filter(([fieldPath]) => !focus || fieldPath === focus);
        const links = Object.entries(resourceObject.getOutgoingLinks());
        return (
          <li key={`result-row-${i}`} className={"result-row"} title={`${id} (${type})`}>
            <ul>
            {attributes.map(([fieldPath, fieldValue], j) => (
              <li key={`result-row-${i}-field-${j}`} className={"result-row-field"}>
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
            <div className={"result-row-actions"}>
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
