import React, { useContext } from 'react';

import { LocationContext } from "../../contexts/location";
import DisplayRaw from './display-raw';

const ResultUI = () => {
  const { responseDocument } = useContext(LocationContext);
  const data = responseDocument ? responseDocument.getData() : [];
  const included = responseDocument ? responseDocument.getIncluded() : [];

  return (
    <DisplayRaw
      title="Results"
      name="results"
      responseDocument={responseDocument && responseDocument.raw}
    >
      <div>
        <h3>Data</h3>
        <ul>
          {data.map((item, index) => (
            <li key={`data-item-${index}`}>
              {Object.keys(item.getAttributes()).map(key => (
                <p key={`data-item-attributes-${key}`}>
                  <em>{key}:</em>{' '}
                  {JSON.stringify(item.getAttributes()[key])}
                </p>
              ))}
            </li>
          ))}
        </ul>
        <h3>Included</h3>
        <ul>
          {included.map((item, index) => (
            <li key={`included-item-${index}`}>
              {Object.keys(item.getAttributes()).map(key => (
                <p key={`included-item-attributes-${key}`}>
                  <em>{key}:</em>{' '}
                  {JSON.stringify(item.getAttributes()[key])}
                </p>
              ))}
            </li>
          ))}
        </ul>
      </div>
    </DisplayRaw>
  );
};

export default ResultUI;
