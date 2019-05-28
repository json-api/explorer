import React, { useState, useEffect } from 'react';

import Link from './link';
import DisplayRaw from './displayRaw';

import { request } from './lib/request';

const Resource = ({ data, links, updateDocument }) => {

  const [schema, setSchema] = useState([]);
  const [resourceLinks, setResourceLinks] = useState([]);

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
          {data.length > 0 &&
          <>
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
          </>}
        </div>
        <div id="includes" className="pane">
          {data.length > 0 &&
          <>
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
          </>}
        </div>
        <div id="fields" className="pane">
          {data.length > 0 &&
          <>
          <h2>Fields</h2>
          <ul className="scrollable scrollable_y">

          </ul>
          </>}
        </div>
      </div>
      <div className="results-container">
        <div className="pane links">
          <ul>
            {Object.keys(resourceLinks).map((type, index) => (
              <li key={`link-${index}`}>
                <Link title={type} url={resourceLinks[type].href} handleClick={updateDocument} />
              </li>
            ))}
          </ul>
        </div>
        <DisplayRaw title="Schema" name="schema" data={schema}>
          <ul>
            {Object.keys(schema).map((item, index) => (
              <li key={`schema-item-${index}`}>
                {item}
              </li>
              ))}
          </ul>
        </DisplayRaw>
        <DisplayRaw title="Results" name="results" data={data}>
          <ul>
            {data.map((item, index) => (
              <li key={`results-item-${index}`}>
                {item.attributes.title}
              </li>
            ))}
          </ul>
        </DisplayRaw>
      </div>
    </main>
  )

};

export default Resource;