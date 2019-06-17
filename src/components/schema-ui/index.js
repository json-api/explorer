import React, { useContext } from 'react';

import SchemaAttributes from './schemaAttributes';
import SchemaRelationships from './schemaRelationships';

import { checkIncludesPath } from '../../utils';
import { LocationContext } from '../../contexts/location';
import useSchema from '../../hooks/use-schema';

const SchemaUI = ({ forPath = [] }) => {
  const schema = useSchema(forPath);
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
        forPath={forPath}
        attributes={attributes}
        type={type}
        includesEnabled={includesEnabled}
      />
      <SchemaRelationships forPath={forPath} relationships={relationships} />
    </div>
  );
};

export default SchemaUI;
