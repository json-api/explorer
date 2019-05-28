import React, { useState, useEffect } from 'react';

import Link from './link';

const url = process.env.TOP_LEVEL;

const App = () => {
  const [query, setQuery] = useState([]);
  const [data, setData] = useState([]);
  const [links, setLinks] = useState([]);

  const options = {
    method: 'GET',
    accept: 'application/vnd.api+json',
  };

  const updateDocument = (url) => {

    const fetchDocument = async (url) => {
      const result = await fetch(url, options).then(res => {
        if (res.ok) {
          return res.json();
        }
        else {
          return new Promise(async (_, reject) => {
            reject(
              await res.json().catch(() => {
                reject(res.statusText);
              }),
            );
          });
        }
      });

      setQuery(url);
      setData(result.data);
      setLinks(result.links);
    };

    fetchDocument(url);

  }


  useEffect(() => {
    updateDocument(url);
  }, []);

  return (
    <div className="container">
      <header className="location">
        <div className="pane query">
          <h2>Query</h2>
          <div className="scrollable scrollable_x query-url">{query}</div>
        </div>
      </header>
      <nav className="pane links">
        <h2>Links</h2>
        <ul className="scrollable scrollable_y">
          {Object.keys(links).map((type, index) => (
            <li key={`link-${index}`}>
              <Link title={type} url={links[type].href} handleClick={updateDocument} />
            </li>
          ))}
        </ul>
      </nav>
      <main>
        <div className="controls">
          <div id="filters" className="pane">
            <h2>Filters</h2>
            {data.length > 0 &&
            <ul className="scrollable scrollable_y">
              {Object.keys(data[0].attributes).map((attribute, index) => (
                <li key={`includes-${index}`}>
                  {attribute}
                </li>
              ))}
            </ul>
            }
          </div>
          <div id="includes" className="pane">
            <h2>Includes</h2>
            {data.length > 0 &&
              <ul className="scrollable scrollable_y">
                {Object.keys(data[0].relationships).map((relationship, index) => (
                  <li key={`includes-${index}`}>
                    {relationship}
                  </li>
                ))}
              </ul>
            }
          </div>
          <div id="fields" className="pane">
            <h2>Fields</h2>
            <ul className="scrollable scrollable_y">

            </ul>
          </div>
        </div>
        <div className="results">
          <div className="pane tree">
            <h2>Results ({data.length})</h2>
            {data.length === 0 && <p><em>No results</em></p>}
            <ul>
              {data.map((item, index) => (
                <li key={item.attributes.id}>
                  {item.attributes.title}
                </li>
              ))}
            </ul>
          </div>
          <div className="pane raw">
            <h2>Raw</h2>
            <div className="scrollable scrollable_x raw-results">
              <pre>{JSON.stringify(data, null, '\t')}</pre>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;