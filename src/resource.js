import React, { useState, useEffect } from 'react';

import { LinkElement } from './link';
import DisplayRaw from './displayRaw';
import Schema from './schema';

import { request } from './lib/request';

const Resource = ({ result, links, updateDocument }) => {

  const [schema, setSchema] = useState([]);
  const [resourceLinks, setResourceLinks] = useState([]);

  const {data = [], included = [] } = result;

  const loadMeta = () => {

    if (links.hasOwnProperty('describedBy')) {
      const { describedBy, ...additionalLinks } = links;
      const url = describedBy.href;

      const fetchDocument = async (url) => {
        const result = await request(url);
        if (result.hasOwnProperty('definitions')) {

          const meta = await request(result.definitions.data.items.$ref);
          setSchema(meta);
          console.log({ data, meta });
        }

        setResourceLinks(additionalLinks);
      };

      fetchDocument(url);
    }
  };

  useEffect(() => {
    loadMeta();
  }, [links]);

  return (
    <main>
      <div className="controls">
        <div id="filters" className="pane">
          <h2>Filters</h2>
          <ul className="scrollable scrollable_y">

          </ul>
        </div>
        <div id="includes" className="pane">
          <h2>Includes</h2>
          <ul className="scrollable scrollable_y">

          </ul>
        </div>
        <div id="fields" className="pane">
          <h2>Fields</h2>
          <ul className="scrollable scrollable_y">

          </ul>
        </div>
      </div>
      <div className="results-container">
        <div className="pane links">
          <ul>
            {Object.keys(resourceLinks).map((key, index) => (
              <li key={`link-${index}`}>
                <LinkElement link={resourceLinks[key]} handleClick={updateDocument} />
              </li>
            ))}
          </ul>
        </div>
        <DisplayRaw title="Schema" name="schema" data={schema}>
          <Schema schema={schema} />
        </DisplayRaw>
        <DisplayRaw title="Results" name="results" data={result}>
          <div>
            <h3>Data</h3>
            <ul>
              {data.map((item, index) => (
                <li key={`data-item-${index}`}>
                  {Object.keys(item.attributes).map(key => (
                    <p key={`data-item-attributes-${key}`}>
                      <em>{key}:</em> {JSON.stringify(item.attributes[key])}
                    </p>
                  ))}
                </li>
              ))}
            </ul>
            <h3>Included</h3>
            <ul>
            {included.map((item, index) => (
              <li key={`included-item-${index}`}>
                {Object.keys(item.attributes).map(key => (
                  <p key={`included-item-attributes-${key}`}>
                    <em>{key}:</em> {JSON.stringify(item.attributes[key])}
                  </p>
                ))}
              </li>
            ))}
            </ul>
          </div>
        </DisplayRaw>
      </div>
    </main>
  )

};

export default Resource;