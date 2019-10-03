import {
  getAttributes,
  getRelationships,
  getRelationshipSchema,
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
  "$schema": "https://json-schema.org/draft/2019-09/hyper-schema",
  "$id": "http://drupal.test/jsonapi/node/article/resource/schema",
  "title": "Article content item",
  "allOf": [
    {
      "type": "object",
      "properties": {
        "type": {
          "$ref": "#definitions/type"
        },
        "attributes": {
          "$ref": "#/definitions/attributes"
        },
        "relationships": {
          "$ref": "#/definitions/relationships"
        }
      }
    },
    {
      "$ref": "https://jsonapi.org/schema#/definitions/resource"
    }
  ],
  "definitions": {
    "type": {
      "const": "node--article"
    },
    "attributes": {
      "description": "Entity attributes",
      "type": "object",
      "properties": {
        "uuid": {
          "type": "string",
          "title": "UUID",
          "maxLength": 128
        },
        "drupal_internal__nid": {
          "type": "integer",
          "title": "ID"
        },
        "drupal_internal__vid": {
          "type": "integer",
          "title": "Revision ID"
        },
        "langcode": {
          "type": "string",
          "title": "Language"
        },
        "revision_timestamp": {
          "type": "number",
          "title": "Revision create time",
          "format": "utc-millisec",
          "description": "The time that the current revision was created."
        },
        "revision_log": {
          "type": "string",
          "title": "Revision log message",
          "description": "Briefly describe the changes you have made.",
          "default": ""
        },
        "status": {
          "type": "boolean",
          "title": "Published",
          "default": true
        },
        "title": {
          "type": "string",
          "title": "Title",
          "maxLength": 255
        },
        "created": {
          "type": "number",
          "title": "Authored on",
          "format": "utc-millisec",
          "description": "The time that the node was created."
        },
        "changed": {
          "type": "number",
          "title": "Changed",
          "format": "utc-millisec",
          "description": "The time that the node was last edited."
        },
        "promote": {
          "type": "boolean",
          "title": "Promoted to front page",
          "default": true
        },
        "sticky": {
          "type": "boolean",
          "title": "Sticky at top of lists",
          "default": false
        },
        "default_langcode": {
          "type": "boolean",
          "title": "Default translation",
          "description": "A flag indicating whether this is the default translation.",
          "default": true
        },
        "revision_default": {
          "type": "boolean",
          "title": "Default revision",
          "description": "A flag indicating whether this was a default revision when it was saved."
        },
        "revision_translation_affected": {
          "type": "boolean",
          "title": "Revision translation affected",
          "description": "Indicates if the last edit of a translation belongs to current revision."
        },
        "path": {
          "type": "object",
          "properties": {
            "alias": {
              "type": "string",
              "title": "Path alias"
            },
            "pid": {
              "type": "integer",
              "title": "Path id"
            },
            "langcode": {
              "type": "string",
              "title": "Language Code"
            }
          },
          "title": "URL alias"
        },
        "body": {
          "type": "object",
          "properties": {
            "value": {
              "type": "string",
              "title": "Text"
            },
            "format": {
              "type": "string",
              "title": "Text format"
            },
            "summary": {
              "type": "string",
              "title": "Summary"
            }
          },
          "required": [
            "value"
          ],
          "title": "Body"
        },
        "comment": {
          "type": "object",
          "properties": {
            "status": {
              "type": "integer",
              "title": "Comment status"
            },
            "cid": {
              "type": "integer",
              "title": "Last comment ID"
            },
            "last_comment_timestamp": {
              "type": "integer",
              "title": "Last comment timestamp",
              "description": "The time that the last comment was created."
            },
            "last_comment_name": {
              "type": "string",
              "title": "Last comment name",
              "description": "The name of the user posting the last comment."
            },
            "last_comment_uid": {
              "type": "integer",
              "title": "Last comment user ID"
            },
            "comment_count": {
              "type": "integer",
              "title": "Number of comments",
              "description": "The number of comments."
            }
          },
          "required": [
            "status"
          ],
          "title": "Comments",
          "default": {
            "status": 2,
            "cid": 0,
            "last_comment_timestamp": 0,
            "last_comment_name": null,
            "last_comment_uid": 0,
            "comment_count": 0
          }
        },
        "field_multivalue": {
          "type": "array",
          "title": "multivalue",
          "items": {
            "type": "object",
            "properties": {
              "value": {
                "type": "string",
                "title": "Text",
                "maxLength": 255
              },
              "format": {
                "type": "string",
                "title": "Text format"
              }
            },
            "required": [
              "value"
            ]
          }
        },
        "field_number": {
          "type": "array",
          "title": "Number",
          "items": {
            "type": "integer",
            "title": "Integer value"
          }
        }
      },
      "required": [
        "uuid",
        "drupal_internal__nid",
        "drupal_internal__vid",
        "title",
        "revision_translation_affected",
        "path"
      ],
      "additionalProperties": false
    },
    "relationships": {
      "description": "Entity relationships",
      "properties": {
        "node_type": {
          "type": "object",
          "properties": {
            "data": {
              "type": "object",
              "required": [
                "type",
                "id"
              ],
              "properties": {
                "type": {
                  "type": "string",
                  "title": "Referenced resource",
                  "enum": [
                    "node_type--node_type"
                  ]
                },
                "id": {
                  "type": "string",
                  "title": "Resource ID",
                  "format": "uuid",
                  "maxLength": 128
                },
                "meta": {
                  "type": "string",
                  "title": "Content type ID"
                }
              }
            }
          },
          "title": "Content type",
          "links": [
            {
              "href": "{instanceHref}",
              "rel": "related",
              "targetMediaType": "application/vnd.api+json",
              "targetSchema": "http://drupal.test/jsonapi/node/article/resource/relationships/node_type/related/schema",
              "templatePointers": {
                "instanceHref": "/links/related/href"
              },
              "templateRequired": [
                "instanceHref"
              ]
            }
          ]
        },
        "revision_uid": {
          "type": "object",
          "properties": {
            "data": {
              "type": "object",
              "required": [
                "type",
                "id"
              ],
              "properties": {
                "type": {
                  "type": "string",
                  "title": "Referenced resource",
                  "enum": [
                    "user--user"
                  ]
                },
                "id": {
                  "type": "string",
                  "title": "Resource ID",
                  "format": "uuid",
                  "maxLength": 128
                },
                "meta": {
                  "type": "integer",
                  "title": "User ID"
                }
              }
            }
          },
          "title": "Revision user",
          "links": [
            {
              "href": "{instanceHref}",
              "rel": "related",
              "targetMediaType": "application/vnd.api+json",
              "targetSchema": "http://drupal.test/jsonapi/node/article/resource/relationships/revision_uid/related/schema",
              "templatePointers": {
                "instanceHref": "/links/related/href"
              },
              "templateRequired": [
                "instanceHref"
              ]
            }
          ]
        },
        "uid": {
          "type": "object",
          "properties": {
            "data": {
              "type": "object",
              "required": [
                "type",
                "id"
              ],
              "properties": {
                "type": {
                  "type": "string",
                  "title": "Referenced resource",
                  "enum": [
                    "user--user"
                  ]
                },
                "id": {
                  "type": "string",
                  "title": "Resource ID",
                  "format": "uuid",
                  "maxLength": 128
                },
                "meta": {
                  "type": "integer",
                  "title": "User ID"
                }
              }
            }
          },
          "title": "Authored by",
          "links": [
            {
              "href": "{instanceHref}",
              "rel": "related",
              "targetMediaType": "application/vnd.api+json",
              "targetSchema": "http://drupal.test/jsonapi/node/article/resource/relationships/uid/related/schema",
              "templatePointers": {
                "instanceHref": "/links/related/href"
              },
              "templateRequired": [
                "instanceHref"
              ]
            }
          ]
        },
        "field_image": {
          "type": "object",
          "properties": {
            "data": {
              "type": "array",
              "items": {
                "type": "object",
                "required": [
                  "type",
                  "id"
                ],
                "properties": {
                  "type": {
                    "type": "string",
                    "title": "Referenced resource",
                    "enum": [
                      "file--file"
                    ]
                  },
                  "id": {
                    "type": "string",
                    "title": "Resource ID",
                    "format": "uuid",
                    "maxLength": 128
                  },
                  "meta": {
                    "type": "object",
                    "properties": {
                      "target_id": {
                        "type": "integer",
                        "title": "File ID"
                      },
                      "alt": {
                        "type": "string",
                        "title": "Alternative text",
                        "description": "Alternative image text, for the image\\'s \\'alt\\' attribute."
                      },
                      "title": {
                        "type": "string",
                        "title": "Title",
                        "description": "Image title text, for the image\\'s \\'title\\' attribute."
                      },
                      "width": {
                        "type": "integer",
                        "title": "Width",
                        "description": "The width of the image in pixels."
                      },
                      "height": {
                        "type": "integer",
                        "title": "Height",
                        "description": "The height of the image in pixels."
                      }
                    },
                    "required": [
                      "target_id"
                    ]
                  }
                }
              }
            }
          },
          "title": "Image",
          "maxItems": 2,
          "links": [
            {
              "href": "{instanceHref}",
              "rel": "related",
              "targetMediaType": "application/vnd.api+json",
              "targetSchema": "http://drupal.test/jsonapi/node/article/resource/relationships/field_image/related/schema",
              "templatePointers": {
                "instanceHref": "/links/related/href"
              },
              "templateRequired": [
                "instanceHref"
              ]
            }
          ]
        },
        "field_tags": {
          "type": "object",
          "properties": {
            "data": {
              "type": "array",
              "items": {
                "type": "object",
                "required": [
                  "type",
                  "id"
                ],
                "properties": {
                  "type": {
                    "type": "string",
                    "title": "Referenced resource",
                    "enum": [
                      "taxonomy_term--other",
                      "taxonomy_term--tags"
                    ]
                  },
                  "id": {
                    "type": "string",
                    "title": "Resource ID",
                    "format": "uuid",
                    "maxLength": 128
                  },
                  "meta": {
                    "type": "integer",
                    "title": "Taxonomy term ID"
                  }
                }
              }
            }
          },
          "title": "Tags",
          "links": [
            {
              "href": "{instanceHref}",
              "rel": "related",
              "targetMediaType": "application/vnd.api+json",
              "targetSchema": "http://drupal.test/jsonapi/node/article/resource/relationships/field_tags/related/schema",
              "templatePointers": {
                "instanceHref": "/links/related/href"
              },
              "templateRequired": [
                "instanceHref"
              ]
            }
          ]
        }
      },
      "type": "object",
      "additionalProperties": false
    }
  }
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
    value: 'http://drupal.test/jsonapi/node/article/resource/relationships/node_type/related/schema',
  },
  {
    name: 'revision_uid',
    value: 'http://drupal.test/jsonapi/node/article/resource/relationships/revision_uid/related/schema',
  },
  {
    name: 'uid',
    value: 'http://drupal.test/jsonapi/node/article/resource/relationships/uid/related/schema',
  },
  {
    name: 'field_image',
    value: 'http://drupal.test/jsonapi/node/article/resource/relationships/field_image/related/schema',
  },
  {
    name: 'field_tags',
    value: 'http://drupal.test/jsonapi/node/article/resource/relationships/field_tags/related/schema',
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
    ).toEqual('http://drupal.test/jsonapi/node/article/resource/relationships/node_type/related/schema');
  });

  test('Get an empty object if recursion fails', () => {
    emptyVals.forEach(val => {
      expect(getRelationshipSchema(val)).toEqual(undefined);
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
