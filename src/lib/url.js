const queryParams = ['include', 'fields', 'sort'];

export const parseInclude = include => {
  return include ? include.split(',') : [];
};

export const parseFields = query => {
  let fields = {};

  if (query) {
    for (let [key, value] of query) {
      if (key.startsWith('fields') && key.indexOf('[') > -1) {
        const type = key.substring(key.indexOf('[') + 1, key.indexOf(']'));
        fields[type] = new Set(value.split(','));
      }
    }
  }
  return fields;
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
      include: parseInclude(query.get('include')),
      fields: parseFields(query.entries()),
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
