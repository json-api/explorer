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
    const url = 'http://drupal.test/jsonapi/node/article?include=uid,node_type';
    expect(parseJsonApiUrl(url)).toEqual({
      protocol: 'http:',
      host: 'drupal.test',
      port: '',
      path: '/jsonapi/node/article',
      query: {
        filter: null,
        include: 'uid,node_type',
        fields: {},
        sort: [],
      },
      fragment: '',
    });
  });

});
