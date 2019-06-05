import React, { useContext } from 'react';

import { LinkElement } from './link';
import DisplayRaw from './displayRaw';
import SchemaUI from './schema-ui';
import { LocationContext } from './location';
import { Schema } from './schema';

const Resource = ({ links }) => {
  const {
    document,
    fields,
    setInclude,
    toggleField,
    clearFieldSet,
    setSort,
  } = useContext(LocationContext);
  const { describedBy: _, ...resourceLinks } = links;
  const { data = [], included = [] } = document;

  return (
    <main>
      <div className="controls">
        <div id="filters" className="pane">
          <h2>Filters</h2>
          <ul className="scrollable scrollable_y" />
        </div>
        <div id="includes" className="pane">
          <h2>Includes</h2>
          <ul className="scrollable scrollable_y">
            <li>
              <button onClick={() => setInclude(['uid'])} />
            </li>
          </ul>
        </div>
        <div id="fields" className="pane">
          <h2>Fields</h2>
          <ul className="scrollable scrollable_y">
            {Object.keys(fields).map((type, index) => (
              <li key={`${type}-${index}`}>
                <ul>
                  {Array.from(fields[type]).map(setEntry => (
                    <li key={`${type}-${setEntry}`}>
                      <button onClick={() => toggleField(type, setEntry)}>
                        <strong>Clear </strong>
                        <code>
                          {type}.{setEntry}
                        </code>
                      </button>
                    </li>
                  ))}
                </ul>
                <button onClick={() => clearFieldSet(type)}>
                  <strong>Clear all </strong>
                  <code>{type}</code>
                  <strong> fields</strong>
                </button>
              </li>
            ))}
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
          <Schema>
            <SchemaUI />
          </Schema>
        </div>
        <DisplayRaw title="Results" name="results" data={document}>
          <div>
            <h3>Data</h3>
            <ul>
              {data
                .filter(item => item.attributes)
                .map((item, index) => (
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
              {included
                .filter(item => item.attributes)
                .map((item, index) => (
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
  );
};

export default Resource;
