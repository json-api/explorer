import React from 'react';
import { render } from 'react-dom';
import css from './css/main.scss';

import App from './app';

document.addEventListener('DOMContentLoaded', function() {
  const domContainer = document.querySelector('#jsonapi-explorer-root');
  if (domContainer) {
    render(<App />, domContainer);
  }
});
