import React, { useEffect, useState } from 'react';

const LocationBar = ({ onNewUrl, value = '', exampleURL = false }) => {
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
          placeholder="Enter a JSON:API server URL to begin exploring"
          value={inputUrl}
          onChange={e => setInputUrl(e.target.value)}
        />
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
