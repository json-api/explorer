import { Link } from '../../components/link';
import { extract } from "../../utils";
import ResourceObject from './resource-object';
import SchemaParser from '../schema/schema-parser';

const schemaParser = new SchemaParser();

export default class Document {
  constructor({ raw }) {
    this.raw = raw;
    this.data = false;
    this.included = false;
    this.schema = undefined;
  }

  static parse(raw) {
    return new Document({ raw });
  }

  getData() {
    if (this.data === false) {
      this.data = [this.raw.data]
        .flat()
        .map(ResourceObject.parse)
        .map(obj => obj.withParentDocument(this));
    }
    return this.data;
  }

  getIncluded() {
    if (this.included === false) {
      this.included = this.hasIncluded()
        ? this.raw.included
          .map(ResourceObject.parse)
          .map(obj => obj.withParentDocument(this))
        : [];
    }
    return this.included;
  }

  getRelated(fieldName) {
    return this.getData().flatMap(resourceObject => resourceObject.getRelated(current));
  }

  getResourceObjects() {
    return !this.isEmptyDocument()
      ? [this.getData()].flat().concat(this.getIncluded())
      : [];
  }

  getSchema(forPath = []) {
    if (this.schema) {
      return Promise.resolve(this.schema);
    }
    return schemaParser.parse(this, forPath).then(schema => {
      if (forPath.length === 0) {
        this.schema = schema;
      }
      return schema;
    });
  }

  getLinks() {
    return Link.parseLinks(this.raw.links || {}, this.schema || null);
  }

  getPaginationLinks() {
    const {first, prev, next, last} = this.getLinks();
    return {first, prev, next, last};
  }

  getOutgoingLinks() {
    const { self, describedby, first, prev, next, last, ...outgoing } = this.getLinks();
    return outgoing;
  }

  hasIncluded() {
    return Array.isArray(this.raw.included);
  }

  isEmptyDocument() {
    return this.isErrorDocument() || ![this.raw.data].flat().length;
  }

  isIndividualDocument() {
    return !this.isErrorDocument() && !this.isCollectionDocument();
  }

  isCollectionDocument() {
    return !this.isErrorDocument() && Array.isArray(this.raw.data);
  }

  isErrorDocument() {
    return this.raw.errors;
  }
}
