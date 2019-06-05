import { parseJsonApiUrl, compileJsonApiUrl } from './url';

const baseUrl = 'http://drupal.test/jsonapi';
const articleUrl = `${baseUrl}/node/article`;

describe('Parse JSON:API url from url string', () => {
  test('Top Level url', () => {
    expect(parseJsonApiUrl(baseUrl)).toEqual({
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
    expect(parseJsonApiUrl(articleUrl)).toEqual({
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
    const urls = ['?include=uid', '?include=uid,node_type'];
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
      expect(parseJsonApiUrl(`${articleUrl}${url}`)).toEqual(parsed[index]);
    });
  });

  test('With Fields', () => {
    const urls = [
      '?fields[node--article]=drupal_internal__nid',
      '?fields[node--article]=drupal_internal__nid,status',
      '?fields[node--article]=drupal_internal__nid&fields[user_role--user_role]=drupal_internal__id',
    ];

    const parsed = [
      {
        protocol: 'http:',
        host: 'drupal.test',
        port: '',
        path: '/jsonapi/node/article',
        query: {
          filter: null,
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
          filter: null,
          include: [],
          fields: {
            'node--article': new Set(['drupal_internal__nid']),
            'user_role--user_role': new Set(['drupal_internal__id']),
          },
          sort: [],
        },
        fragment: '',
      },
    ];

    urls.forEach((url, index) => {
      expect(parseJsonApiUrl(`${articleUrl}${url}`)).toEqual(parsed[index]);
    });
  });
});
