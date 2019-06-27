import React, { useState, useContext } from 'react';

import { LocationContext } from '../../contexts/location';
import AttributeLoader from './attribute-loader';
import ParamUI from '.';

const FieldsetUI = () => {
  const { fields, toggleField, clearFieldSet } = useContext(LocationContext);

  return (
    <ParamUI name="fieldset" title="Fieldset" edit={<AttributeLoader />}>
      <ul>
        {Object.keys(fields).map((type, index) => (
          <li className="fieldset__list" key={`${type}-${index}`}>
            <button className="fieldset__list_all" onClick={() => clearFieldSet(type)}>
              <code>{type}</code>
            </button>
            <ul>
              {Array.from(fields[type]).map(setEntry => (
                <li key={`${type}-${setEntry}`}>
                  <button onClick={() => toggleField(type, setEntry)}>
                    <code>
                      {type}.{setEntry}
                    </code>
                  </button>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </ParamUI>
  );
};

export default FieldsetUI;
