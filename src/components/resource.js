import React from 'react';

import { LinkElement } from './link';
import SchemaUI from './schema-ui/schema-ui'
import { Schema } from '../contexts/schema';
import FilterUI from './param-ui/filter-ui';
import IncludeUI from "./param-ui/include-ui";
import FieldsetUI from "./param-ui/fieldset-ui";
import ResultUI from "./result-ui/result-ui";

const Resource = ({ links }) => {
  const { describedBy: _, ...resourceLinks } = links;

  return (
    <main>
      <div className="controls">
        <div id="filters" className="pane">
          <h2>Filters</h2>
          <FilterUI />
        </div>
        <div id="includes" className="pane">
          <h2>Includes</h2>
          <IncludeUI/>
        </div>
        <div id="fields" className="pane">
          <h2>Fields</h2>
          <FieldsetUI/>
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
        <DisplayRaw
          title="Results"
          name="results"
          responseDocument={responseDocument && responseDocument.raw}
        >
          <div>
            <h3>Data</h3>
            <ul>
              {data.map((item, index) => (
                <li key={`data-item-${index}`}>
                  {Object.keys(item.getAttributes()).map(key => (
                    <p key={`data-item-attributes-${key}`}>
                      <em>{key}:</em>{' '}
                      {JSON.stringify(item.getAttributes()[key])}
                    </p>
                  ))}
                </li>
              ))}
            </ul>
            <h3>Included</h3>
            <ul>
              {included.map((item, index) => (
                <li key={`included-item-${index}`}>
                  {Object.keys(item.getAttributes()).map(key => (
                    <p key={`included-item-attributes-${key}`}>
                      <em>{key}:</em>{' '}
                      {JSON.stringify(item.getAttributes()[key])}
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
