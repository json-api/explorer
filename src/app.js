import React, { useState } from 'react';

import { Location } from './contexts/location';
import ExplorerUI from './components/explorer-ui';
import LocationBar from './components/location-ui';
import AppTitle from './components/app-title';
import FieldFocus from './contexts/field-focus';

const App = ({options}) => {
  const { exploredUrl } = options;
  const initialLandingUrl = exploredUrl || new URL(document.location.href).searchParams.get('location') || '';
  const [landingUrl, setLandingUrl] = useState(initialLandingUrl);

  return (
    <div className="container">
      {landingUrl ? (
        <Location landingUrl={landingUrl} readOnly={!!exploredUrl}>
          <FieldFocus>
            <ExplorerUI />
          </FieldFocus>
        </Location>
      ) : (
        <header className="app-header">
          <AppTitle />
          <LocationBar onNewUrl={setLandingUrl} value={landingUrl} exampleURL={'https://example.jsonapi.dev'} />
        </header>
      )}
    </div>
  );
};

export default App;
