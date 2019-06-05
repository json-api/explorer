import React, { useState, useEffect, useContext } from 'react';

import { Link, LinkElement } from './link';
import Resource from './resource';
import { LocationContext } from './location';

const ExplorerUI = () => {
  const { locationUrl, document, onEntryPoint } = useContext(LocationContext);
  const [entryPointLinks, setEntryPointLinks] = useState({});
  const parsedLinks = document && document.links ? Link.parseLinks(document.links) : {};

  useEffect(() => {
    if (onEntryPoint) setEntryPointLinks(parsedLinks);
  }, [onEntryPoint]);

  return (
    <div className="container">
      <header className="location">
        <div className="pane query">
          <h2>Query</h2>
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
  );
};

export default ExplorerUI;
