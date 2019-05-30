import React, { useState, useEffect } from 'react';

import { Link, LinkElement } from './link';
import Resource from './resource';
import { request } from './lib/request';

const url = process.env.TOP_LEVEL;

const App = () => {
  const [query, setQuery] = useState([]);
  const [result, setResult] = useState([]);
  const [links, setLinks] = useState([]);
  const [resourceLinks, setResourceLinks] = useState([]);

  const loadTopLevel = () => {
    const fetchDocument = async (url) => {
      const response = await request(url);

      setQuery(url);
      setResourceLinks(Link.parseLinks(response.links));
    };

    fetchDocument(url);
  };

  const updateDocument = (url) => {

    const fetchDocument = async (url) => {
      const response = await request(url);

      setQuery(url);
      setLinks(Link.parseLinks(response.links));
      setResult(response);
    };

    fetchDocument(url);
  };

  useEffect(() => {
    loadTopLevel();
  }, []);

  return (
    <div className="container">
      <header className="location">
        <div className="pane query">
          <h2>Query</h2>
          <div className="scrollable scrollable_x query-url">{query}</div>
        </div>
      </header>
      <nav className="pane resourceLinks">
        <h2>Resources</h2>
        <ul className="scrollable scrollable_y">
          {Object.keys(resourceLinks).map((key, index) => (
              <li key={`resource-link-${index}`}>
                <LinkElement link={resourceLinks[key]} handleClick={updateDocument} />
              </li>
          ))}
        </ul>
      </nav>
      <Resource
        result={result}
        links={links}
        updateDocument={updateDocument}
      />
    </div>
  );
};

export default App;