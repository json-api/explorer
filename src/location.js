import React, { createContext, useState, useEffect } from 'react';

const parseJsonApiUrl = (fromUrl) => {
    const url = new URL(fromUrl);
    const query = url.searchParams;
    return {
        protocol: url.protocol,
        host: url.host,
        port: url.port,
        path: url.pathname,
        query: {
            filter: query.get('filter'),
            include: query.get('include'),
            fields: query.get('fields'),
            sort: query.get('sort'),
        },
        fragment: url.hash,
    }
};

const compileJsonApiUrl = ({protocol, host, port, path, query, fragment}) => {
    const queryString = ['include', 'fields', 'sort']
        .filter(name => query[name] && query[name].length)
        .map(name => `${name}=${query[name].join(',')}`)
        .join('&');
    return `${protocol}//${host}${port.length ? ':' + port : ''}${path}${fragment.length ? '#' + fragment : ''}${queryString.length ? '?' + queryString : ''}`
};

const LocationContext = createContext({});

const Location = ({homeUrl, children}) => {
    // Set the location state to a parsed url and a compiled url.
    const [ parsedUrl, setParsedUrl ] = useState(parseJsonApiUrl(homeUrl));
    const [ locationUrl, setLocationUrl ] = useState(compileJsonApiUrl(parsedUrl));

    // Takes a single query parameter and updates the parsed url.
    const updateQuery = (param) => setParsedUrl(Object.assign({}, parsedUrl, {query: Object.assign({}, parsedUrl.query, param)}));

    // If the parsed url is updated, compile it and update the location url.
    useEffect(() => setLocationUrl(compileJsonApiUrl(parsedUrl)), [parsedUrl]);

    // Extract and surface useful url components in the location context as
    // readable values.
    const {filter, fields, include, sort} = parsedUrl.query;;
    const {fragment} = parsedUrl;

    return <LocationContext.Provider
        value={{
            parsedUrl,
            locationUrl,
            filter,
            fields,
            include,
            sort,
            fragment,
            setUrl: (newLocationUrl) => setParsedUrl(parseJsonApiUrl(newLocationUrl)),
            setFilter: (newParam) => updateQuery({filter: newParam}),
            setFields: (newParam) => updateQuery({fields: newParam}),
            setInclude: (newParam) => updateQuery({include: newParam}),
            setSort: (newParam) => updateQuery({sort: newParam}),
            setFragment: (fragment) => setParsedUrl(Object.assign({}, parsedUrl, {fragment})),
        }}>
        {children}
    </LocationContext.Provider>;
};

export { Location, LocationContext };
