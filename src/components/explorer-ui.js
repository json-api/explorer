import React, { useState, useEffect, useContext } from 'react';

import { LinkElement } from './link';
import Resource from './resource';
import { LocationContext } from '../contexts/location';

const ExplorerUI = () => {
  const { locationUrl, responseDocument, onEntryPoint } = useContext(LocationContext);
  const [entryPointLinks, setEntryPointLinks] = useState({});
  const parsedLinks = responseDocument ? responseDocument.getLinks() : {};

  useEffect(() => {
    if (onEntryPoint) setEntryPointLinks(parsedLinks);
  }, [onEntryPoint]);

  return (
    <div className="container">
      <header>
        <h1 className="app-title">JSON:API <span className="subtitle">Explorer</span></h1>
        <div className="location">
          <div className="query-url">{locationUrl}</div>
        </div>
      </header>
      <nav className="resourceLinks">
        <div className="resourceLinks__location">Top Level</div>
        <ul className="resourceLinks__nav">
          {Object.keys(entryPointLinks).map((key, index) => (
            <li key={`resource-link-${index}`} className="resourceLinks__link">
              <LinkElement link={entryPointLinks[key]} />
            </li>
          ))}
        </ul>
      </nav>
      <Resource />
    </div>
  );
};

export default ExplorerUI;
