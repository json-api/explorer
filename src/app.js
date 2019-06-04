import React from 'react';

import { Location } from './location';
import ExplorerUI from './explorer-ui';

const locationQueryParameter = (new URL(window.location)).searchParams.get('location');
const homeUrl = process.env.TOP_LEVEL;

const App = () => {
  return (
    <Location homeUrl={homeUrl} historyLocation={locationQueryParameter ? decodeURI(locationQueryParameter) : null}>
      <ExplorerUI />
    </Location>
  );
};

export default App;
