import React, { useState } from 'react';

import { Location } from './contexts/location';
import ExplorerUI from './components/explorer-ui';
import LocationBar from './components/location-ui';
import FieldFocus from './contexts/field-focus';

const App = () => {
  const [landingUrl, setLandingUrl] = useState(
    new URL(document.location.href).searchParams.get('location') || '',
  );

  return (
    <div className="container">
      {landingUrl ? (
        <Location landingUrl={landingUrl}>
          <FieldFocus>
            <ExplorerUI />
          </FieldFocus>
        </Location>
      ) : (
        <header className="app-header">
          <h1 className="app-title">
            JSON:API <span className="subtitle">Explorer</span>
          </h1>
          <LocationBar onNewUrl={setLandingUrl} value={landingUrl} />
        </header>
      )}
    </div>
  );
};

export default App;
