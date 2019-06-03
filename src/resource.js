import React, { useState, useEffect, useContext } from 'react';

import { LinkElement } from './link';
import DisplayRaw from './displayRaw';
import Schema from './schema';
import { LocationContext } from "./location";

const Resource = ({ links }) => {
  const { document, setInclude, toggleField, clearFieldSet, setSort } = useContext(LocationContext);
  const { describedBy = null, ...resourceLinks } = links;
  const schemaUrl = describedBy ? describedBy.href : '';
  const {data = [], included = [] } = document;

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
            <li><button onClick={() => setInclude(['uid'])} /></li>
          </ul>
        </div>
        <div id="fields" className="pane">
          <h2>Fields</h2>
          <ul className="scrollable scrollable_y">
            <li><button onClick={() => toggleField('node--article', 'title')}>title</button></li>
            <li><button onClick={() => toggleField('node--article', 'status')}>status</button></li>
            <li><button onClick={() => clearFieldSet('node--article')}>Clear Fields</button></li>
          </ul>
        </div>
      </div>
      <div className="results-container">
        <div className="pane links">
          <ul>
            {Object.keys(resourceLinks).map((key, index) => (
              <li key={`link-${index}`}>
                <LinkElement link={resourceLinks[key]} />
              </li>
            ))}
          </ul>
        </div>
        <div className="pane schema">
          <Schema url={schemaUrl} />
        </div>
        <DisplayRaw title="Results" name="results" data={document}>
          <div>
            <h3>Data</h3>
            <ul>
              {data.filter(item => item.attributes).map((item, index) => (
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
