import React, { useContext } from 'react';

import { LinkElement } from './link';
import Resource from './resource';
import { LocationContext } from '../contexts/location';
import LocationBar from './location-ui';

const ExplorerUI = () => {
  const { locationUrl, setUrl, entrypointDocument } = useContext(
    LocationContext,
  );
  const entrypointLinks = entrypointDocument
    ? entrypointDocument.getLinks()
    : {};

  return (
    <>
      <header>
        <h1 className="app-title">
          JSON:API <span className="subtitle">Explorer</span>
        </h1>
        <LocationBar onNewUrl={setUrl} value={locationUrl} />
      </header>
      <nav className="resourceLinks">
        <div className="resourceLinks__location">Top Level</div>
        <ul className="resourceLinks__nav">
          {Object.keys(entrypointLinks).map((key, index) => (
            <li key={`resource-link-${index}`} className="resourceLinks__link">
              <LinkElement link={entrypointLinks[key]} />
            </li>
          ))}
        </ul>
      </nav>
      <Resource />
    </>
  );
};

export default ExplorerUI;
