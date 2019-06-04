import {
  getAttributes,
  getRelationships,
  getRelationshipSchema,
  getResourceRef,
  mapDefinitions,
} from './normalize';

let schemaUnd;

const emptyVals = [[], {}, null, schemaUnd];

const schemaMenu = {
  $schema: 'http://json-schema.org/draft-07/schema',
  $id: 'http://drupal.test/jsonapi/menu/menu/resource/schema.json',
  allOf: [
    {
      type: 'object',
      properties: {
        attributes: {
          $ref: '#/definitions/attributes',
        },
        relationships: {
          $ref: '#/definitions/relationships',
        },
      },
    },
    {
      $ref: 'https://jsonapi.org/schema#/definitions/resource',
    },
  ],
  properties: {
    attributes: {
      $ref: '#/definitions/attributes',
    },
  },
  definitions: {
    attributes: {
      type: 'object',
      properties: {
        drupal_internal__id: {},
        langcode: {},
        status: {},
        dependencies: {},
        third_party_settings: {},
        label: {},
        description: {},
        locked: {},
      },
      additionalProperties: false,
    },
  },
};

const schemaArticleCollection = {
  $schema: 'http://json-schema.org/draft-07/schema',
  $id: 'http://drupal.test/jsonapi/node/article/collection/schema.json',
  allOf: [
    {
      $ref: 'https://jsonapi.org/schema',
    },
    {
      if: {
        $ref: 'https://jsonapi.org/schema#/definitions/success',
      },
      then: {
        type: 'object',
        properties: {
          data: {
            $ref: '#/definitions/data',
          },
        },
        required: ['data'],
      },
    },
  ],
  definitions: {
    data: {
      type: 'array',
      items: {
        $ref: 'http://drupal.test/jsonapi/node/article/resource/schema.json',
      },
    },
  },
};

const schemaNodeTypeRelated = {
  $schema: 'http://json-schema.org/draft-07/schema',
  $id:
    'http://drupal.test/jsonapi/node/article/resource/relationships/node_type/related/schema.json',
  allOf: [
    {
      $ref: 'https://jsonapi.org/schema',
    },
    {
      if: {
        $ref: 'https://jsonapi.org/schema#/definitions/success',
      },
      then: {
        type: 'object',
        properties: {
          data: {
            $ref: '#/definitions/data',
          },
        },
        required: ['data'],
      },
    },
  ],
  definitions: {
    data: {
      $ref:
        'http://drupal.test/jsonapi/node_type/node_type/resource/schema.json',
    },
  },
};

const schemaArticle = {
  $schema: 'http://json-schema.org/draft-07/schema',
  $id: 'http://drupal.test/jsonapi/node/article/resource/schema.json',
  allOf: [
    {
      type: 'object',
      properties: {
        attributes: {
          $ref: '#/definitions/attributes',
        },
        relationships: {
          $ref: '#/definitions/relationships',
        },
      },
    },
    {
      $ref: 'https://jsonapi.org/schema#/definitions/resource',
    },
  ],
  properties: {
    attributes: {
      $ref: '#/definitions/attributes',
    },
  },
  definitions: {
    attributes: {
      type: 'object',
      properties: {
        drupal_internal__nid: {},
        drupal_internal__vid: {},
        langcode: {},
        revision_timestamp: {},
        revision_log: {},
        status: {},
        title: {},
        created: {},
        changed: {},
        promote: {},
        sticky: {},
        default_langcode: {},
        revision_default: {},
        revision_translation_affected: {},
        path: {},
        body: {},
      },
      additionalProperties: false,
    },
    relationships: {
      type: 'object',
      properties: {
        node_type: {
          type: 'object',
          properties: {
            links: {
              type: 'object',
              properties: {
                related: {
                  type: 'object',
                  properties: {
                    meta: {
                      type: 'object',
                      properties: {
                        linkParams: {
                          type: 'object',
                          properties: {
                            describedBy: {
                              const:
                                'http://drupal.test/jsonapi/node/article/resource/relationships/node_type/related/schema.json',
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        revision_uid: {
          type: 'object',
          properties: {
            links: {
              type: 'object',
              properties: {
                related: {
                  type: 'object',
                  properties: {
                    meta: {
                      type: 'object',
                      properties: {
                        linkParams: {
                          type: 'object',
                          properties: {
                            describedBy: {
                              const:
                                'http://drupal.test/jsonapi/node/article/resource/relationships/revision_uid/related/schema.json',
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        uid: {
          type: 'object',
          properties: {
            links: {
              type: 'object',
              properties: {
                related: {
                  type: 'object',
                  properties: {
                    meta: {
                      type: 'object',
                      properties: {
                        linkParams: {
                          type: 'object',
                          properties: {
                            describedBy: {
                              const:
                                'http://drupal.test/jsonapi/node/article/resource/relationships/uid/related/schema.json',
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        field_image: {
          type: 'object',
          properties: {
            links: {
              type: 'object',
              properties: {
                related: {
                  type: 'object',
                  properties: {
                    meta: {
                      type: 'object',
                      properties: {
                        linkParams: {
                          type: 'object',
                          properties: {
                            describedBy: {
                              const:
                                'http://drupal.test/jsonapi/node/article/resource/relationships/field_image/related/schema.json',
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        field_tags: {
          type: 'object',
          properties: {
            links: {
              type: 'object',
              properties: {
                related: {
                  type: 'object',
                  properties: {
                    meta: {
                      type: 'object',
                      properties: {
                        linkParams: {
                          type: 'object',
                          properties: {
                            describedBy: {
                              const:
                                'http://drupal.test/jsonapi/node/article/resource/relationships/field_tags/related/schema.json',
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      additionalProperties: false,
    },
  },
};

const mappedMenuAttributes = [
  { name: 'drupal_internal__id', value: {} },
  { name: 'langcode', value: {} },
  { name: 'status', value: {} },
  { name: 'dependencies', value: {} },
  { name: 'third_party_settings', value: {} },
  { name: 'label', value: {} },
  { name: 'description', value: {} },
  { name: 'locked', value: {} },
];

const mappedArticleRelationships = [
  {
    name: 'node_type',
    value: {
      describedBy: {
        const:
          'http://drupal.test/jsonapi/node/article/resource/relationships/node_type/related/schema.json',
      },
    },
  },
  {
    name: 'revision_uid',
    value: {
      describedBy: {
        const:
          'http://drupal.test/jsonapi/node/article/resource/relationships/revision_uid/related/schema.json',
      },
    },
  },
  {
    name: 'uid',
    value: {
      describedBy: {
        const:
          'http://drupal.test/jsonapi/node/article/resource/relationships/uid/related/schema.json',
      },
    },
  },
  {
    name: 'field_image',
    value: {
      describedBy: {
        const:
          'http://drupal.test/jsonapi/node/article/resource/relationships/field_image/related/schema.json',
      },
    },
  },
  {
    name: 'field_tags',
    value: {
      describedBy: {
        const:
          'http://drupal.test/jsonapi/node/article/resource/relationships/field_tags/related/schema.json',
      },
    },
  },
];

const schemaNoDefinitions = {
  $schema: 'http://json-schema.org/draft-07/schema',
  $id: 'http://drupal.test/jsonapi/menu/menu/resource/schema.json',
};

const schemaNoProperties = {
  $schema: 'http://json-schema.org/draft-07/schema',
  $id: 'http://drupal.test/jsonapi/menu/menu/resource/schema.json',
  definitions: {},
};

describe('Schema metadata', () => {
  test('Get the resource $ref from a collection schema', () => {
    expect(getResourceRef(schemaArticleCollection)).toBe(
      'http://drupal.test/jsonapi/node/article/resource/schema.json',
    );
  });

  test('Get the resource $ref from a related schema', () => {
    expect(getResourceRef(schemaNodeTypeRelated)).toBe(
      'http://drupal.test/jsonapi/node_type/node_type/resource/schema.json',
    );
  });
});

describe('Schema Attributes', () => {
  test('Extract attribute names from schema definitions', () => {
    expect(getAttributes(schemaMenu)).toEqual(mappedMenuAttributes);
    expect(getAttributes(schemaArticle)).toEqual([
      { name: 'drupal_internal__nid', value: {} },
      { name: 'drupal_internal__vid', value: {} },
      { name: 'langcode', value: {} },
      { name: 'revision_timestamp', value: {} },
      { name: 'revision_log', value: {} },
      { name: 'status', value: {} },
      { name: 'title', value: {} },
      { name: 'created', value: {} },
      { name: 'changed', value: {} },
      { name: 'promote', value: {} },
      { name: 'sticky', value: {} },
      { name: 'default_langcode', value: {} },
      { name: 'revision_default', value: {} },
      { name: 'revision_translation_affected', value: {} },
      { name: 'path', value: {} },
      { name: 'body', value: {} },
    ]);
  });

  test('Return empty array for incomplete or empty schema', () => {
    expect(getAttributes(schemaNoDefinitions)).toEqual([]);
    expect(getAttributes(schemaNoProperties)).toEqual([]);
    emptyVals.forEach(val => {
      expect(getAttributes(val)).toEqual([]);
    });
  });
});

describe('Schema Includes', () => {
  test('Get relationship list from schema', () => {
    expect(getRelationships(schemaArticle)).toEqual(mappedArticleRelationships);
  });

  test('Return empty array for incomplete or empty schema', () => {
    expect(getRelationships(schemaNoDefinitions)).toEqual([]);
    expect(getRelationships(schemaNoProperties)).toEqual([]);
    emptyVals.forEach(val => {
      expect(getRelationships(val)).toEqual([]);
    });
  });
});

describe('Normalize Properties', () => {
  test('Get flattened object from nested properties', () => {
    expect(
      getRelationshipSchema(
        schemaArticle.definitions.relationships.properties.node_type,
      ),
    ).toEqual({
      describedBy: {
        const:
          'http://drupal.test/jsonapi/node/article/resource/relationships/node_type/related/schema.json',
      },
    });
  });

  test('Get an empty object if recursion fails', () => {
    emptyVals.forEach(val => {
      expect(getRelationshipSchema(val)).toEqual({});
    });
  });

  test('Map property names and values', () => {
    expect(
      mapDefinitions(schemaMenu.definitions.attributes.properties),
    ).toEqual(mappedMenuAttributes);
  });

  test('Map property names and processed values', () => {
    expect(
      mapDefinitions(
        schemaArticle.definitions.relationships.properties,
        getRelationshipSchema,
      ),
    ).toEqual(mappedArticleRelationships);
  });
});
