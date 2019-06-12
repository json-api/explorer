import React, { useContext } from 'react';

import { LinkElement } from './link';
import SchemaUI from './schema-ui'
import { Schema } from '../contexts/schema';
import FilterUI from './param-ui/filter-ui';
import IncludeUI from "./param-ui/include-ui";
import FieldsetUI from "./param-ui/fieldset-ui";
import ResultUI from "./result-ui";
import {LocationContext} from "../contexts/location";

const Resource = () => {
  const { responseDocument, onEntryPoint } = useContext(LocationContext);
  const { describedBy: _, ...resourceLinks } = !onEntryPoint && responseDocument ? responseDocument.getLinks() : {};

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
