import React, { useContext } from 'react';

import SchemaAttributes from './schemaAttributes';
import SchemaRelationships from './schemaRelationships';

import { checkIncludesPath } from './utils';
import { LocationContext } from './contexts/location';
import { SchemaContext } from './contexts/schema';

const SchemaUI = () => {
  const { schema, forPath } = useContext(SchemaContext);
  const { type = '', attributes = [], relationships = [] } = schema || {};
  const { include, toggleInclude } = useContext(LocationContext);

  const includesEnabled = checkIncludesPath(include, forPath);
  const includePathString = forPath.join('.');

  return (
    <div className="schema-list">
      {includePathString && (
        <div>
          <input
            type="checkbox"
            checked={includesEnabled}
            onChange={() => toggleInclude(includePathString)}
          />
          {includePathString}
        </div>
      )}
      <SchemaAttributes
        attributes={attributes}
        type={type}
        includesEnabled={includesEnabled}
      />
      <SchemaRelationships relationships={relationships} />
    </div>
  );
};

export default SchemaUI;
