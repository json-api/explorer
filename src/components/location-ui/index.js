import React, { useEffect, useState } from 'react';

const LocationBar = ({onNewUrl, value = ''}) => {
  const [inputUrl, setInputUrl] = useState(value);

  useEffect(() => setInputUrl(value), [value]);

  const handleSubmit = (e) => {
    e.preventDefault();
    inputUrl.length && onNewUrl(inputUrl);
  };

  return (
    <form onSubmit={handleSubmit} className="location">
      <input
        type="url"
        className="query-url"
        placeholder="Enter a JSON:API server URL to begin exploring... e.g. https://example.com/api"
        value={inputUrl}
        onChange={(e) => setInputUrl(e.target.value)}
      />
    </form>
  );
};

export default LocationBar;
