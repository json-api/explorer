import React, { createContext, useState, useEffect } from 'react';
import { extract, toggleSetEntry } from './utils';

import { request } from './lib/request';
import { parseJsonApiUrl, compileJsonApiUrl } from './lib/url';

const LocationContext = createContext({});

const Location = ({ homeUrl, children }) => {
  // Set the location state to a parsed url and a compiled url.
  const [parsedUrl, setParsedUrl] = useState(parseJsonApiUrl(homeUrl));
  const [locationUrl, setLocationUrl] = useState(compileJsonApiUrl(parsedUrl));
  const [document, setDocument] = useState({});

  // Takes a single query parameter and updates the parsed url.
  const updateQuery = param =>
    setParsedUrl(
      Object.assign({}, parsedUrl, {
        query: Object.assign({}, parsedUrl.query, param),
      }),
    );

  // If the parsed url is updated, compile it and update the location url.
  useEffect(() => setLocationUrl(compileJsonApiUrl(parsedUrl)), [parsedUrl]);
  useEffect(() => {
    request(locationUrl).then(setDocument);
  }, [locationUrl]);

  // Extract and surface useful url components in the location context as
  // readable values.
  const { filter, fields, include, sort } = parsedUrl.query;
  const { fragment } = parsedUrl;

  return (
    <LocationContext.Provider
      value={{
        parsedUrl,
        locationUrl,
        document,
        filter,
        fields,
        include,
        sort,
        fragment,
        onEntryPoint: extract(document, 'links.self.href') === homeUrl,
        setUrl: newLocationUrl => setParsedUrl(parseJsonApiUrl(newLocationUrl)),
        setFilter: newParam => updateQuery({ filter: newParam }),
        toggleField: (type, field) => {
          const queryFields = extract(parsedUrl, 'query.fields');
          const fieldSet = queryFields.hasOwnProperty(type)
            ? queryFields[type]
            : new Set();

          const newParam = Object.assign({}, queryFields, {
            [type]: toggleSetEntry(fieldSet, field),
          });
          updateQuery({ fields: newParam });
        },
        clearFieldSet: type => {
          const newFieldsParam = parsedUrl.query.fields;
          delete newFieldsParam[type];
          updateQuery({ fields: newFieldsParam });
        },
        toggleInclude: path => {
          const includeList = extract(parsedUrl, `query.include`);
          updateQuery({
            include: Array.from(toggleSetEntry(new Set(includeList), path)),
          });
        },
        setSort: newParam => updateQuery({ sort: newParam }),
        setFragment: fragment =>
          setParsedUrl(Object.assign({}, parsedUrl, { fragment })),
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};

export { Location, LocationContext };
