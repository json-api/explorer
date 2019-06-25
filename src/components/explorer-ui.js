import React, { useState, useEffect, useContext } from 'react';

import { MenuLinkElement } from './link';
import Resource from './resource';
import { LocationContext } from '../contexts/location';
import LocationBar from './location-ui';
import SchemaMenu from './schema-ui/schema-menu';
import useSchema from '../hooks/use-schema';

const ExplorerUI = () => {
  const schema = useSchema([]);
  const [activeMenu, setActiveMenu] = useState(0);
  const [loadedMenus, setLoadedMenus] = useState([]);

  const { locationUrl, setUrl, entrypointDocument } = useContext(
    LocationContext,
  );
  const entrypointLinks = entrypointDocument
    ? entrypointDocument.getOutgoingLinks()
    : {};

  const loadNext = next => {
    // forPath length corresponds to array depth.
    const loaded = loadedMenus.slice(0, next.forPath.length);
    setLoadedMenus([...loaded, next]);
  };

  useEffect(() => {
    const style = document.documentElement.style;
    style.setProperty('--nav-offset', activeMenu);
  }, [activeMenu]);

  useEffect(() => {
    setActiveMenu(loadedMenus.length);
  }, [loadedMenus]);

  useEffect(() => {
    if (schema) {
      const title = entrypointLinks.hasOwnProperty(schema.type)
        ? entrypointLinks[schema.type].title
        : schema.type;

      loadNext({
        title,
        forPath: [],
      });
    }
  }, [schema]);

  return (
    <>
      <header className="app-header">
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
        {loadedMenus.map((loaded, index) => (
          <SchemaMenu
            key={`schema-menu-${[schema.type, ...loaded.forPath].join('.')}`}
            title={loaded.title}
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
