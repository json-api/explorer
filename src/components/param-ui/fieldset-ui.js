import React, { useState, useContext } from 'react';

import { LocationContext } from '../../contexts/location';
import FieldsetLoader from './fieldset-loader';
import ParamUI from '.';
import { Close } from '../icon';

const FieldsetUI = () => {
  const { fields, toggleField, clearFieldSet } = useContext(LocationContext);

  return (
    <ParamUI name="fieldset" title="Fieldset">
      <FieldsetLoader />
      <ul>
        {Object.keys(fields).map((type, index) => (
          <li className="fieldset__list" key={`${type}-${index}`}>
            <div className="param_ui__title param_ui__item">
              <span className="link__title--readable">
                {type}
                <button
                  className="param_ui__button--icon fieldset__list_all"
                  onClick={() => clearFieldSet(type)}
                >
                  <Close />
                </button>
              </span>
            </div>
            <ul>
              {Array.from(fields[type]).map(setEntry => (
                <li key={`${type}-${setEntry}`}>
                  <div className="param_ui__item param_ui__item--pill param_ui__item--fieldset">
                    <code>{setEntry}</code>
                    <button
                      className="param_ui__button--icon"
                      onClick={() => toggleField(type, setEntry)}
                    >
                      <Close />
                    </button>
                  </div>
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
