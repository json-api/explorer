import React, { useState, useEffect, useContext } from 'react';

import { MenuLinkElement } from './link';
import Resource from './resource';
import { LocationContext } from '../contexts/location';
import LocationBar from './location-ui';
import SchemaMenu from './schema-ui/schema-menu';
import useSchema from '../hooks/use-schema';

const ExplorerUI = () => {
  const [activeMenu, setActiveMenu] = useState(0);
  const [loadedSchemas, setLoadedSchemas] = useState([]);

  const { locationUrl, setUrl, entrypointDocument } = useContext(
    LocationContext,
  );
  const entrypointLinks = entrypointDocument
    ? entrypointDocument.getLinks()
    : {};

  const schema = useSchema([]);

  const loadNext = forPath => {
    // forPath length corresponds to array depth.
    const loaded = loadedSchemas.slice(0, forPath.length);
    setLoadedSchemas([...loaded, { forPath }]);
  };

  useEffect(() => {
    const style = document.documentElement.style;
    style.setProperty('--nav-offset', activeMenu);
  }, [activeMenu]);

  useEffect(() => {
    setActiveMenu(loadedSchemas.length);
  }, [loadedSchemas]);

  useEffect(() => {
    if (schema) {
      loadNext([]);
    }
  }, [schema]);

  return (
    <>
      <header>
        <h1 className="app-title">
          JSON:API <span className="subtitle">Explorer</span>
        </h1>
        <LocationBar onNewUrl={setUrl} value={locationUrl} />
      </header>
      <nav className="menu">
        <div className="menu__container">
          <div className="menu__location">
            <span className="menu__location_title">Top Level</span>
          </div>
          <ul className="menu__nav">
            {Object.keys(entrypointLinks).map((key, index) => (
              <li key={`resource-link-${index}`} className="menu__link">
                <MenuLinkElement
                  link={entrypointLinks[key]}
                  next={() => setActiveMenu(1)}
                />
              </li>
            ))}
          </ul>
        </div>
        {loadedSchemas.map((loaded, index) => (
          <SchemaMenu
            key={`schema-menu-${[schema.type, ...loaded.forPath].join('.')}`}
            forPath={loaded.forPath}
            load={loadNext}
            back={() => setActiveMenu(index)}
            next={() => setActiveMenu(index + 1)}
          />
        ))}
      </nav>
      <Resource />
    </>
  );
};

export default ExplorerUI;
