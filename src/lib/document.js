import {Link} from "../link";
import ResourceObject from "./resource-object";
import { extract } from "../utils";
import SchemaParser from "../schema-parser";
import { identifies } from "./resource-object";

const schemaParser = new SchemaParser();

export default class Document {

  constructor({raw}) {
    this.raw = raw;
  }

  static parse(raw) {
    return new Document({raw});
  }

  getData() {
    return this.getResourceObjects()
      .filter(object => this.isCollectionDocument()
        ? this.raw.data.some(identifies(object))
        : identifies(object)(this.raw.data)
      );
  }

  getIncluded() {
    return this.getResourceObjects()
      .filter(object => this.hasIncluded() && this.raw.included.some(identifies(object)))
  }

  getResourceObjects() {
    if (this.isEmptyDocument()) {
      return [];
    }

    const rawDataObjects = this.isCollectionDocument() ? this.raw.data : [this.raw.data];
    const includedObjects = this.hasIncluded() ? this.raw.included : [];

    return []
      .concat(rawDataObjects)
      .concat(includedObjects)
      .map(raw => ResourceObject.parse(raw).withParentDocument(this));
  }

  getSchema(forPath = []) {
    return schemaParser.parse(this, forPath);
  }

  getLinks() {
    return Link.parseLinks(this.raw.links || {});
  }

  hasIncluded() {
    return Array.isArray(this.raw.included);
  }

  isEmptyDocument() {
    return this.isErrorDocument() || (this.isCollectionDocument() && !this.raw.data.length) || !this.raw.data;
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
