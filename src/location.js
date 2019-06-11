import React, { createContext, useState, useEffect } from 'react';
import { extract, toggleSetEntry } from './utils';

import { request } from './lib/request';
import { parseJsonApiUrl, compileJsonApiUrl } from './lib/url';
import Document from './lib/document';
import { newFilter, expandFilter, optimizeFilter } from './lib/filter';

const LocationContext = createContext({});

const Location = ({ homeUrl, children }) => {
  const [filters, setFilters] = useState({});
  // Set the location state to a parsed url and a compiled url.
  const [parsedUrl, setParsedUrl] = useState(parseJsonApiUrl(homeUrl));
  const [locationUrl, setLocationUrl] = useState(compileJsonApiUrl(parsedUrl));
  const [responseDocument, setDocument] = useState(null);

  const setUrl = newLocationUrl => {
    window.history.pushState(
      {},
      '',
      `?location=${encodeURIComponent(newLocationUrl)}`,
    );
    setParsedUrl(parseJsonApiUrl(newLocationUrl));
  };

  const createFilter = (path, param) => {
    const filter = newFilter([...path, param].join('.'));
    setFilters(Object.assign({}, filters, filter));
  };

  const toggleFilter = name => {
    const filter = filters[name];

    updateQuery({ filter });
  };

  // Takes a single query parameter and updates the parsed url.
  const updateQuery = param => {
    setUrl(
      compileJsonApiUrl(
        Object.assign({}, parsedUrl, {
          query: Object.assign({}, parsedUrl.query, param),
        }),
      ),
    );
  };

  // If the parsed url is updated, compile it and update the location url.
  useEffect(() => setLocationUrl(compileJsonApiUrl(parsedUrl)), [parsedUrl]);
  useEffect(() => {
    request(locationUrl).then(res => setDocument(Document.parse(res)));
  }, [locationUrl]);
  useEffect(() => {
    const updateParsedUrl = () => {
      const historyLocationURL = new URL(
        document.location.href,
      ).searchParams.get('location');
      if (historyLocationURL) {
        setParsedUrl(parseJsonApiUrl(historyLocationURL));
      }
    };
    window.onpopstate = updateParsedUrl;
    updateParsedUrl();
  }, []);

  // Extract and surface useful url components in the location context as
  // readable values.
  const { fields, include, sort } = parsedUrl.query;
  const { fragment } = parsedUrl;

  return (
    <LocationContext.Provider
      value={{
        parsedUrl,
        locationUrl,
        responseDocument,
        filters,
        fields,
        include,
        sort,
        fragment,
        onEntryPoint:
          responseDocument &&
          extract(responseDocument.getLinks(), 'self.href') === homeUrl,
        setUrl,
        createFilter,
        applyFilter: (name, condition) => {
          const queryFilters = extract(parsedUrl, 'query.filter');
          const currentFilter = queryFilters[name] || filters[name];
          const merged = { ...currentFilter, condition: { ...currentFilter.condition, ...condition}};
          const filter = optimizeFilter({ [name]: merged });
          updateQuery({ filter });
        },
        removeFilter: name => {
          const queryFilters = extract(parsedUrl, 'query.filter');
          if (queryFilters.hasOwnProperty(name)) {
            const { [name]: current, ...remainingFilters} = queryFilters;
            updateQuery({ filter: remainingFilters });
          }
          if (filters.hasOwnProperty(name)) {
            const { [name]: current, ...remainingFilters } = filters;
            setFilters(remainingFilters);
          }
        },
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
