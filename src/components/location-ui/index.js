import React, { useContext, useEffect, useState } from 'react';
import { LocationContext } from '../../contexts/location';
import Clip from '../../components/icon/clip';
import Clipboard from 'react-clipboard.js';

const LocationBar = ({ onNewUrl, value = '', exampleURL = false }) => {
  const { readOnly } = useContext(LocationContext);
  const [inputUrl, setInputUrl] = useState(value);

  useEffect(() => setInputUrl(value), [value]);

  const setSampleLocation = e => {
    e.preventDefault();
    onNewUrl(exampleURL);
  };

  const handleSubmit = e => {
    e.preventDefault();
    inputUrl.length && onNewUrl(inputUrl);
  };

  return (
    <div className="location">
      <form className="location__form" onSubmit={handleSubmit}>
        <input
          type="url"
          className="query-url"
          placeholder="Enter an HTTPS URL to explore your JSON:API server."
          value={inputUrl}
          onChange={e => setInputUrl(readOnly ? inputUrl : e.target.value)}
        />
        {inputUrl && (
          <Clipboard
            data-clipboard-text={inputUrl}
            button-title="Copy to clipboard"
            button-className="location__suggestion_button"
          >
            <Clip />
          </Clipboard>
        )}
      </form>
      <div
        className={`location__suggestion location__suggestion--${
          inputUrl === '' && exampleURL ? 'active' : 'hidden'
        }`}
      >
        <span>or try an </span>
        <button
          className="location__suggestion_button"
          onClick={setSampleLocation}
          disabled={inputUrl !== ''}
        >
          example
        </button>
      </div>
    </div>
  );
};

export default LocationBar;
