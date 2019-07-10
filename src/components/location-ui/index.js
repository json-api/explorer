import React, { useEffect, useState } from 'react';

const LocationBar = ({ onNewUrl, value = '' }) => {
  const [inputUrl, setInputUrl] = useState(value);

  useEffect(() => setInputUrl(value), [value]);

  const sampleUrl = 'https://example.jsonapi.dev';
  const setSampleLocation = () => {
    onNewUrl(sampleUrl);
  };

  const handleSubmit = e => {
    e.preventDefault();
    inputUrl.length && onNewUrl(inputUrl);
  };

  return (
    <form onSubmit={handleSubmit} className="location">
      <input
        type="url"
        className="query-url"
        placeholder="Enter a JSON:API server URL to begin exploring"
        value={inputUrl}
        onChange={e => setInputUrl(e.target.value)}
      />
      <div className="location__suggestion">
        <div
          className={`location__suggestion_text location__suggestion_text--${
            inputUrl === '' ? 'active' : 'hidden'
          }`}
        >
          <span>...or try</span>
          <button
            className="location__suggestion_button"
            onClick={setSampleLocation}
          >
            <code>{sampleUrl}</code>
          </button>
        </div>
      </div>
    </form>
  );
};

export default LocationBar;
