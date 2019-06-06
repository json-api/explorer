import { parseJsonApiUrl, compileJsonApiUrl } from './url';

const baseUrl = 'http://drupal.test/jsonapi';
const articleUrl = `${baseUrl}/node/article`;

const base = {
  url: 'http://drupal.test/jsonapi',
  parsed: {
    protocol: 'http:',
    host: 'drupal.test',
    port: '',
    path: '/jsonapi',
    query: {
      filter: {},
      include: [],
      fields: {},
      sort: [],
    },
    fragment: '',
  },
};

const article = {
  url: `${base.url}/node/article`,
  parsed: {
    protocol: 'http:',
    host: 'drupal.test',
    port: '',
    path: '/jsonapi/node/article',
    query: {
      filter: {},
      include: [],
      fields: {},
      sort: [],
    },
    fragment: '',
  },
};

const include = {
  urls: ['include=uid', 'include=uid,node_type'],
  parsed: [
    {
      protocol: 'http:',
      host: 'drupal.test',
      port: '',
      path: '/jsonapi/node/article',
      query: {
        filter: {},
        include: ['uid'],
        fields: {},
        sort: [],
      },
      fragment: '',
    },
    {
      protocol: 'http:',
      host: 'drupal.test',
      port: '',
      path: '/jsonapi/node/article',
      query: {
        filter: {},
        include: ['uid', 'node_type'],
        fields: {},
        sort: [],
      },
      fragment: '',
    },
  ],
};

const fields = {
  urls: [
    'fields[node--article]=drupal_internal__nid',
    'fields[node--article]=drupal_internal__nid,status',
    'fields[node--article]=drupal_internal__nid&fields[user_role--user_role]=drupal_internal__id',
  ],
  parsed: [
    {
      protocol: 'http:',
      host: 'drupal.test',
      port: '',
      path: '/jsonapi/node/article',
      query: {
        filter: {},
        include: [],
        fields: {
          'node--article': new Set(['drupal_internal__nid']),
        },
        sort: [],
      },
      fragment: '',
    },
    {
      protocol: 'http:',
      host: 'drupal.test',
      port: '',
      path: '/jsonapi/node/article',
      query: {
        filter: {},
        include: [],
        fields: {
          'node--article': new Set(['drupal_internal__nid', 'status']),
        },
        sort: [],
      },
      fragment: '',
    },
    {
      protocol: 'http:',
      host: 'drupal.test',
      port: '',
      path: '/jsonapi/node/article',
      query: {
        filter: {},
        include: [],
        fields: {
          'node--article': new Set(['drupal_internal__nid']),
          'user_role--user_role': new Set(['drupal_internal__id']),
        },
        sort: [],
      },
      fragment: '',
    },
  ],
};

const filters = {
  urls: [
    'filter[foo]=bar',
    'filter[foo][bar]=baz',
    'filter[foo][]=bar&filter[foo][]=baz',
    'filter[foo][bar]=qux&filter[foo][baz]=quux',
    'filter[foo][bar][]=baz&filter[foo][bar][]=qux',
    'filter[foo][bar][]=qux&filter[foo][bar][]=quux&filter[foo][baz][]=quz&filter[foo][baz][]=quuz',
    'filter[a-label][condition][path]=field_first_name&filter[a-label][condition][operator]=%3D&filter[a-label][condition][value]=Janis',
  ],

  parsed: [
    {
      protocol: 'http:',
      host: 'drupal.test',
      port: '',
      path: '/jsonapi/node/article',
      query: {
        filter: { foo: 'bar' },
        include: [],
        fields: {},
        sort: [],
      },
      fragment: '',
    },
    {
      protocol: 'http:',
      host: 'drupal.test',
      port: '',
      path: '/jsonapi/node/article',
      query: {
        filter: { foo: { bar: 'baz' } },
        include: [],
        fields: {},
        sort: [],
      },
      fragment: '',
    },
    {
      protocol: 'http:',
      host: 'drupal.test',
      port: '',
      path: '/jsonapi/node/article',
      query: {
        filter: { foo: new Set(['bar', 'baz']) },
        include: [],
        fields: {},
        sort: [],
      },
      fragment: '',
    },
    {
      protocol: 'http:',
      host: 'drupal.test',
      port: '',
      path: '/jsonapi/node/article',
      query: {
        filter: { foo: { bar: 'qux', baz: 'quux' } },
        include: [],
        fields: {},
        sort: [],
      },
      fragment: '',
    },
    {
      protocol: 'http:',
      host: 'drupal.test',
      port: '',
      path: '/jsonapi/node/article',
      query: {
        filter: { foo: { bar: new Set(['baz', 'qux']) } },
        include: [],
        fields: {},
        sort: [],
      },
      fragment: '',
    },
    {
      protocol: 'http:',
      host: 'drupal.test',
      port: '',
      path: '/jsonapi/node/article',
      query: {
        filter: {
          foo: {
            bar: new Set(['qux', 'quux']),
            baz: new Set(['quz', 'quuz']),
          },
        },
        include: [],
        fields: {},
        sort: [],
      },
      fragment: '',
    },
    {
      protocol: 'http:',
      host: 'drupal.test',
      port: '',
      path: '/jsonapi/node/article',
      query: {
        filter: {
          'a-label': {
            condition: {
              path: 'field_first_name',
              operator: '=',
              value: 'Janis',
            },
          },
        },
        include: [],
        fields: {},
        sort: [],
      },
      fragment: '',
    },
  ],
};

const complex = {
  urls: [
    [
      'include=node_type,uid.roles',
      'fields[node--article]=drupal_internal__nid',
      'fields[node_type--node_type]=drupal_internal__type,name',
      'fields[user_role--user_role]=drupal_internal__id',
    ]
  ],
  parsed: [
    {
      protocol: 'http:',
      host: 'drupal.test',
      port: '',
      path: '/jsonapi/node/article',
      query: {
        filter: {},
        include: ['node_type', 'uid.roles'],
        fields: {
          'node--article': new Set(['drupal_internal__nid']),
          'node_type--node_type': new Set(['drupal_internal__type', 'name']),
          'user_role--user_role': new Set(['drupal_internal__id']),
        },
        sort: [],
      },
      fragment: '',
    }
  ]
};

describe('Parse JSON:API url from url string', () => {
  test('Top Level url', () => {
    expect(parseJsonApiUrl(base.url)).toEqual(base.parsed);
  });

  test('Collection url', () => {
    expect(parseJsonApiUrl(article.url)).toEqual(article.parsed);
  });

  test('With Include', () => {
    include.urls.forEach((url, index) => {
      expect(parseJsonApiUrl(`${article.url}?${url}`)).toEqual(
        include.parsed[index],
      );
    });
  });

  test('With Fields', () => {
    fields.urls.forEach((url, index) => {
      expect(parseJsonApiUrl(`${article.url}?${url}`)).toEqual(
        fields.parsed[index],
      );
    });
  });

  test('With Filters', () => {
    filters.urls.forEach((url, index) => {
      expect(parseJsonApiUrl(`${article.url}?${url}`)).toEqual(
        filters.parsed[index],
      );
    });
  });

  test('Complex url with fields and include', () => {
    complex.urls.forEach((url, index) => {
      expect(parseJsonApiUrl(`${article.url}?${url.join('&')}`)).toEqual(
        complex.parsed[index]
      );
    });
  });
});

describe('Compile url from JSON:API url object', () => {
  test('Top level url', () => {
    expect(compileJsonApiUrl(base.parsed)).toBe(base.url);
  });

  test('Collection url', () => {
    expect(compileJsonApiUrl(article.parsed)).toBe(article.url);
  });

  test('With Include', () => {
    include.urls.forEach((url, index) => {
      expect(compileJsonApiUrl(include.parsed[index])).toEqual(
        `${article.url}?${url}`,
      );
    });
  });

  test('With Fields', () => {
    fields.urls.forEach((url, index) => {
      expect(compileJsonApiUrl(fields.parsed[index])).toEqual(
        `${article.url}?${url}`,
      );
    });
  });

  test('Complex url', () => {
    complex.urls.forEach((url, index) => {
      expect(compileJsonApiUrl(complex.parsed[index])).toEqual(
        `${article.url}?${url.join('&')}`
      );
    });
  });
});
