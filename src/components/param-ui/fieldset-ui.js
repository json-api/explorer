import React, { useState, useContext } from 'react';

import { LocationContext } from '../../contexts/location';
import AttributeLoader from './attribute-loader';

const FieldsetUI = () => {
  const { fields, toggleField, clearFieldSet } = useContext(LocationContext);
  const [editMode, setEditMode] = useState(false);

  return (
    <div className="param_ui param_ui__fieldset">
      <span className="param_ui__title">Fieldset</span>
      {editMode ? (
        <div className="param_ui__content param_ui__content--edit
        param_ui__fieldset--edit">
          <AttributeLoader />
          <button onClick={() => setEditMode(false)}>Done</button>
        </div>
      ) : (
        <div className="param_ui__content param_ui__content--view param_ui__fieldset--view">
          <ul>
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
          <button onClick={() => setEditMode(true)}>Add</button>
        </div>
      )}
    </div>
  );
};

export default FieldsetUI;
