import React, { createContext, useState, useEffect, useReducer } from 'react';
import { extract, toggleSetEntry, removeEmpty } from '../lib/utils/utils';

import { request } from '../lib/utils/request';
import { parseJsonApiUrl, compileJsonApiUrl } from '../lib/url/url';
import Document from '../lib/jsonapi-objects/document';
import { newFilter, optimizeFilter } from '../lib/url/filter';

const LocationContext = createContext({});

const filterReducer = (state, action) => {
  switch (action.type) {
    case 'refresh':
      return { ...action.updated };
    case 'create':
      return optimizeFilter({ ...state, ...newFilter(action.name) });
    case 'update':
      return optimizeFilter({ ...state, ...action.updated });
      break;
    case 'delete':
      const { [action.name]: current, ...remaining } = state;
      return remaining;
    default:
      return { ...state };
  }
};

const Location = ({ homeUrl, children }) => {
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

  // Extract and surface useful url components in the location context as
  // readable values.
  const { filter: queryFilter, fields, include, sort } = parsedUrl.query;
  const { fragment } = parsedUrl;

  const [filter, dispatchFilter] = useReducer(filterReducer, queryFilter);

  // Takes a single query parameter and updates the parsed url.
  const updateQuery = param => {
    setUrl(
      compileJsonApiUrl(
        Object.assign({}, parsedUrl, {
          query: Object.assign({}, parsedUrl.query, removeEmpty(param)),
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

  useEffect(() => {
    dispatchFilter({ type: 'refresh', updated: queryFilter });
  }, [document]);

  useEffect(() => {
    updateQuery({ filter });
  }, [filter]);

  return (
    <LocationContext.Provider
      value={{
        parsedUrl,
        locationUrl,
        responseDocument,
        filter,
        fields,
        include,
        sort,
        fragment,
        onEntryPoint:
          responseDocument &&
          extract(responseDocument.getLinks(), 'self.href') === homeUrl,
        setUrl,
        setFilter: (name, type, updated = {}) => {
          dispatchFilter({ name, type, updated });
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
