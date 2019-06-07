const queryParams = ['include', 'filter', 'fields', 'sort'];
import { isEmpty } from '../utils';

export const parseListParameter = value => {
  return value ? value.split(',') : [];
};

export const parseQueryParameterFamily = (baseName, query) => {
  const members = [];

  const lex = (key, value) => {
    const stateMachine = (mode, token, index) => {
      if (key.length === index) {
        return token.length ? { [token]: value } : value;
      }
      const current = key.charAt(index);
      switch (mode) {
        case 'word':
          return ['[', ']'].includes(current)
            ? stateMachine('bracket', token, index)
            : stateMachine(mode, token + current, index + 1);
        case 'bracket':
          switch (current) {
            case '[':
              return { [token]: stateMachine('word', '', index + 1) };
            case ']':
              return stateMachine('bracket', token, index + 1);
          }
      }
    };
    return stateMachine('word', '', 0);
  };

  for (let [key, value] of query) {
    const lexed = lex(key, value);
    if (lexed.hasOwnProperty(baseName)) {
      members.push(lexed);
    }
  }

  const merge = (a, b) => {
    if (typeof a !== 'object' && typeof b !== 'object') {
      return new Set(Set.prototype.isPrototypeOf(a) ? [...a, b] : [a, b]);
    } else {
      return Object.keys(b).reduce((merged, key) => {
        return Object.assign({}, merged, {
          [key]: merged.hasOwnProperty(key) ? merge(a[key], b[key]) : b[key],
        });
      }, a);
    }
  };

  return members.length ? members.reduce(merge, {})[baseName] : {};
};

export const parseDictionaryParameter = (baseName, query) => {
  const family = parseQueryParameterFamily(baseName, query);
  return Object.keys(family).reduce((dictionary, key) => {
    return Object.assign({}, dictionary, {
      [key]: new Set(parseListParameter(family[key])),
    });
  }, {});
};

export const compileListParameter = value => {
  return [...value].join(',');
};

export const compileDictionaryParameter = (baseName, type, query) => {
  return `${baseName}[${type}]=${compileListParameter(query[type])}`;
};

export const compileQueryParameterFamily = (baseName, query) => {
  const create = (path, value) => ({ [path]: encodeURIComponent(value) });
  const extract = (query, path = '') => {
    const extracted = [];

    Object.keys(query).reduce((paths, key) => {
      const value = query[key];
      const current = `${path}[${key}]`;
      const isSet = Set.prototype.isPrototypeOf(value);

      if (isSet || typeof value === 'string') {
        return isSet
          ? [...value].forEach(val =>
              extracted.push(create(`${current}[]`, val)),
            )
          : extracted.push(create(current, value));
      }
      extracted.push(...extract(value, current));
    }, {});

    return extracted;
  };

  return extract(query)
    .map(Object.entries)
    .map(entries => entries.pop())
    .map(([key, value]) => `${baseName}${key}=${value}`)
    .join('&');
};

export const compileQueryParameter = (baseName, query) => {
  const queryValue = query[baseName];

  switch (baseName) {
    case 'fields':
      return Object.keys(queryValue)
        .map(type => compileDictionaryParameter(baseName, type, queryValue))
        .join('&');
    case 'filter':
      return compileQueryParameterFamily(baseName, queryValue);

    default:
      return `${baseName}=${compileListParameter(queryValue)}`;
  }
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
      filter: parseQueryParameterFamily('filter', query.entries()),
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
    .filter(name => query[name] && !isEmpty(query[name]))
    .map(name => compileQueryParameter(name, query))
    .join('&');

  return `${protocol}//${host}${port.length ? ':' + port : ''}${path}${
    fragment.length ? '#' + fragment : ''
  }${queryString.length ? '?' + queryString : ''}`;
};
