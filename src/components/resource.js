import React, { useContext } from 'react';

import { LinkElement } from './link';
import SchemaUI from './schema-ui';
import FilterUI from './param-ui/filter-ui';
import IncludeUI from './param-ui/include-ui';
import FieldsetUI from './param-ui/fieldset-ui';
import ResultUI from './result-ui';
import { LocationContext } from '../contexts/location';

const Resource = () => {
  const { responseDocument } = useContext(LocationContext);
  const resourceLinks = responseDocument
    ? responseDocument.getOutgoingLinks()
    : {};

  return (
    <main>
      <div className="controls">
        <div id="filters" className="controls_panel pane">
          <h2>Filters</h2>
          <FilterUI />
        </div>
        <div id="includes" className="controls_panel pane">
          <IncludeUI />
        </div>
        <div id="fields" className="controls_panel pane">
          <FieldsetUI />
        </div>
      </div>
      <div className="results-container">
        <div className="pane schema">
          <SchemaUI />
        </div>
        <div className="pane">
          <ul>
            {Object.keys(resourceLinks).map((key, index) => (
              <li key={`link-${index}`}>
                <LinkElement link={resourceLinks[key]} />
              </li>
            ))}
          </ul>
          <ResultUI />
        </div>
      </div>
    </main>
  );
};

export default Resource;
