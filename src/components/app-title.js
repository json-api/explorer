import React from 'react';

const AppTitle = () => (
  <h1 className="app-title">
    JSON:API{' '}
    <span className="subtitle">
      Explorer <sup>beta</sup>
    </span>
    <a href="//github.com/json-api/explorer" className="button__github">
      <span className="icon__github" aria-hidden="true" /> View on GitHub
    </a>
  </h1>
);

export default AppTitle;
