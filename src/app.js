import React, { useContext, useEffect, useState } from 'react';

import {Location, LocationContext} from './contexts/location';
import {LinkElement} from "./components/link";
import Resource from "./components/resource";

const homeUrl = process.env.TOP_LEVEL;

const App = () => {
  const { locationUrl, responseDocument, onEntryPoint } = useContext(
    LocationContext,
  );
  const [entryPointLinks, setEntryPointLinks] = useState({});
  const parsedLinks = responseDocument ? responseDocument.getLinks() : {};

  useEffect(() => {
    if (onEntryPoint) setEntryPointLinks(parsedLinks);
  }, [onEntryPoint]);

  return (
    <Location homeUrl={homeUrl}>
      <div className="container">
        <header className="location">
          <div className="pane query">
            <h2>Location</h2>
            <div className="scrollable scrollable_x query-url">{locationUrl}</div>
          </div>
        </header>
        <nav className="pane resourceLinks">
          <h2>Resources</h2>
          <ul className="scrollable scrollable_y">
            {Object.keys(entryPointLinks).map((key, index) => (
              <li key={`resource-link-${index}`}>
                <LinkElement link={entryPointLinks[key]} />
              </li>
            ))}
          </ul>
        </nav>
        <Resource links={!onEntryPoint ? parsedLinks : {}} />
      </div>
    </Location>
  );
};

export default App;
