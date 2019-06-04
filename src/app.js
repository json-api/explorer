import React from 'react';

import { Location } from './location';
import ExplorerUI from './explorer-ui';

const homeUrl = process.env.TOP_LEVEL;

const App = () => {
  return (
    <Location homeUrl={homeUrl}>
      <ExplorerUI />
    </Location>
  );
};

export default App;
