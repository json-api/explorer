import { parseJsonApiUrl, compileJsonApiUrl } from './url';

describe('Parse JSON:API url from url string', () => {
  test('Top Level url', () => {
    const url = 'http://drupal.test/jsonapi';
    expect(parseJsonApiUrl(url)).toEqual({
      protocol: 'http:',
      host: 'drupal.test',
      port: '',
      path: '/jsonapi',
      query: {
        filter: null,
        include: [],
        fields: {},
        sort: [],
      },
      fragment: '',
    });
  });

  test('Collection url', () => {
    const url = 'http://drupal.test/jsonapi/node/article';
    expect(parseJsonApiUrl(url)).toEqual({
      protocol: 'http:',
      host: 'drupal.test',
      port: '',
      path: '/jsonapi/node/article',
      query: {
        filter: null,
        include: [],
        fields: {},
        sort: [],
      },
      fragment: '',
    });
  });

  test('With Include', () => {
    const urls = [
      'http://drupal.test/jsonapi/node/article?include=uid',
      'http://drupal.test/jsonapi/node/article?include=uid,node_type',
    ];
    const parsed = [
      {
        protocol: 'http:',
        host: 'drupal.test',
        port: '',
        path: '/jsonapi/node/article',
        query: {
          filter: null,
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
          filter: null,
          include: ['uid', 'node_type'],
          fields: {},
          sort: [],
        },
        fragment: '',
      },
    ];

    urls.forEach((url, index) => {
      expect(parseJsonApiUrl(url)).toEqual(parsed[index]);
    });
  });

  test('Complex url', () => {
    const url =
      'http://drupal.test/jsonapi/node/article?include=node_type,uid.roles&fields[node--article]=drupal_internal__nid&fields[node_type--node_type]=drupal_internal__type,name&fields[user_role--user_role]=drupal_internal__id';
  });
});
