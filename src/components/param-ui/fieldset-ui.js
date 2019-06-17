import React, { useContext } from 'react';

import { LocationContext } from '../../contexts/location';

const FieldsetUI = () => {
  const { fields, toggleField, clearFieldSet } = useContext(LocationContext);

  return (
    <ul className="scrollable scrollable_y">
      {Object.keys(fields).map((type, index) => (
        <li key={`${type}-${index}`}>
          <ul>
            {Array.from(fields[type]).map(setEntry => (
              <li key={`${type}-${setEntry}`}>
                <button onClick={() => toggleField(type, setEntry)}>
                  <strong>Clear </strong>
                  <code>
                    {type}.{setEntry}
                  </code>
                </button>
              </li>
            ))}
          </ul>
          <button onClick={() => clearFieldSet(type)}>
            <strong>Clear all </strong>
            <code>{type}</code>
            <strong> fields</strong>
          </button>
        </li>
      ))}
    </ul>
  );
};

export default FieldsetUI;
