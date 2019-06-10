import {Link} from "../link";
import ResourceObject from "./resource-object";
import SchemaParser from "../schema-parser";

const schemaParser = new SchemaParser();

export default class Document {

  constructor({raw}) {
    this.raw = raw;
  }

  static parse(raw) {
    return new Document({raw});
  }

  getData() {
    return [this.raw.data].flat().map(ResourceObject.parse).map(obj => obj.withParentDocument(this));
  }

  getIncluded() {
    return this.hasIncluded() ? this.raw.included.map(ResourceObject.parse).map(obj => obj.withParentDocument(this)): [];
  }

  getResourceObjects() {
    return !this.isEmptyDocument() ? [this.getData()].flat().concat(this.getIncluded()) : [];
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
