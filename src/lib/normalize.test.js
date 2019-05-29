import { getAttributes } from './normalize';


const schemaMenu = {
  "$schema": "http://json-schema.org/draft-07/schema",
  "$id": "http://drupal.test/jsonapi/menu/menu/resource/schema.json",
  "allOf": [
    {
      "type": "object",
      "properties": {
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
  "properties": {
    "attributes": {
      "$ref": "#/definitions/attributes"
    }
  },
  "definitions": {
    "attributes": {
      "type": "object",
      "properties": {
        "drupal_internal__id": {},
        "langcode": {},
        "status": {},
        "dependencies": {},
        "third_party_settings": {},
        "label": {},
        "description": {},
        "locked": {}
      },
      "additionalProperties": false
    }
  }
};

const schemaArticle = {
  "$schema": "http://json-schema.org/draft-07/schema",
  "$id": "http://drupal.test/jsonapi/node/article/resource/schema.json",
  "allOf": [
    {
      "type": "object",
      "properties": {
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
  "properties": {
    "attributes": {
      "$ref": "#/definitions/attributes"
    }
  },
  "definitions": {
    "attributes": {
      "type": "object",
      "properties": {
        "drupal_internal__nid": {},
        "drupal_internal__vid": {},
        "langcode": {},
        "revision_timestamp": {},
        "revision_log": {},
        "status": {},
        "title": {},
        "created": {},
        "changed": {},
        "promote": {},
        "sticky": {},
        "default_langcode": {},
        "revision_default": {},
        "revision_translation_affected": {},
        "path": {},
        "body": {}
      },
      "additionalProperties": false
    },
    "relationships": {
      "type": "object",
      "properties": {
        "node_type": {
          "type": "object",
          "properties": {
            "links": {
              "type": "object",
              "properties": {
                "related": {
                  "type": "object",
                  "properties": {
                    "meta": {
                      "type": "object",
                      "properties": {
                        "linkParams": {
                          "type": "object",
                          "properties": {
                            "describedBy": {
                              "const": "http://drupal.test/jsonapi/node/article/resource/relationships/node_type/related/schema.json"
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        "revision_uid": {
          "type": "object",
          "properties": {
            "links": {
              "type": "object",
              "properties": {
                "related": {
                  "type": "object",
                  "properties": {
                    "meta": {
                      "type": "object",
                      "properties": {
                        "linkParams": {
                          "type": "object",
                          "properties": {
                            "describedBy": {
                              "const": "http://drupal.test/jsonapi/node/article/resource/relationships/revision_uid/related/schema.json"
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        "uid": {
          "type": "object",
          "properties": {
            "links": {
              "type": "object",
              "properties": {
                "related": {
                  "type": "object",
                  "properties": {
                    "meta": {
                      "type": "object",
                      "properties": {
                        "linkParams": {
                          "type": "object",
                          "properties": {
                            "describedBy": {
                              "const": "http://drupal.test/jsonapi/node/article/resource/relationships/uid/related/schema.json"
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        "field_image": {
          "type": "object",
          "properties": {
            "links": {
              "type": "object",
              "properties": {
                "related": {
                  "type": "object",
                  "properties": {
                    "meta": {
                      "type": "object",
                      "properties": {
                        "linkParams": {
                          "type": "object",
                          "properties": {
                            "describedBy": {
                              "const": "http://drupal.test/jsonapi/node/article/resource/relationships/field_image/related/schema.json"
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        "field_tags": {
          "type": "object",
          "properties": {
            "links": {
              "type": "object",
              "properties": {
                "related": {
                  "type": "object",
                  "properties": {
                    "meta": {
                      "type": "object",
                      "properties": {
                        "linkParams": {
                          "type": "object",
                          "properties": {
                            "describedBy": {
                              "const": "http://drupal.test/jsonapi/node/article/resource/relationships/field_tags/related/schema.json"
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      },
      "additionalProperties": false
    }
  }
};

test('Extract attribute names from schema definitions', () => {
  expect(getAttributes(schemaMenu)).toEqual([
    'drupal_internal__id',
    'langcode',
    'status',
    'dependencies',
    'third_party_settings',
    'label',
    'description',
    'locked'
  ]);

  expect(getAttributes(schemaArticle)).toEqual([
    'drupal_internal__nid',
    'drupal_internal__vid',
    'langcode',
    'revision_timestamp',
    'revision_log',
    'status',
    'title',
    'created',
    'changed',
    'promote',
    'sticky',
    'default_langcode',
    'revision_default',
    'revision_translation_affected',
    'path',
    'body'
  ]);

});