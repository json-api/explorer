const queryParams = ['include', 'fields', 'sort'];

export const parseListParameter = parameterValue => {
  return parameterValue ? parameterValue.split(',') : [];
};

export const parseDictionaryParameter = (baseName, query) => {
  const dictionary = {};

  for (let [key, value] of query) {
    if (key.startsWith(baseName) && key.indexOf('[') > -1) {
      const entry = key.substring(key.indexOf('[') + 1, key.indexOf(']'));
      dictionary[entry] = new Set(parseListParameter(value));
    }
  }

  return dictionary;
};

export const parseJsonApiUrl = fromUrl => {
  const url = new URL(fromUrl);
  const query = url.searchParams;

  return {
    protocol: url.protocol,
    host: url.host,
    port: url.port,
    path: url.pathname,
    query: {
      filter: query.get('filter'),
      include: parseListParameter(query.get('include')),
      fields: parseDictionaryParameter('fields', query.entries()),
      sort: query.get('sort') || [],
    },
    fragment: url.hash,
  };
};

export const compileJsonApiUrl = ({
  protocol,
  host,
  port,
  path,
  query,
  fragment,
}) => {
  const queryString = queryParams
    .filter(
      name =>
        (query[name] && !Array.isArray(query[name])) || query[name].length,
    )
    .map(name => {
      return name === 'fields'
        ? Object.keys(query[name])
            .map(type => `fields[${type}]=${[...query.fields[type]].join(',')}`)
            .join('&')
        : `${name}=${query[name].join(',')}`;
    })
    .join('&');
  return `${protocol}//${host}${port.length ? ':' + port : ''}${path}${
    fragment.length ? '#' + fragment : ''
  }${queryString.length ? '?' + queryString : ''}`;
};
