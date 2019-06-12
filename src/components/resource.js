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
        <ResultUI/>
      </div>
    </main>
  );
};

export default Resource;
