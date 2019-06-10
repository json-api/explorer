import {Link} from "../link";
import { extract } from '../utils'

export default class ResourceObject {

  constructor({raw}) {
    this.raw = raw;
    this.parentDocument = null;
  }

  static parse(raw) {
    return new ResourceObject({raw});
  }

  withParentDocument(responseDocument) {
    this.parentDocument = responseDocument;
    return this;
  }

  getType() {
    return this.raw.type;
  }

  getID() {
    return this.raw.id;
  }

  getAttributes() {
    return this.raw.attributes || {};
  }

  getRelationships() {
    return this.raw.relationships || {};
  }

  getRelated(fieldName) {
    const relationshipData = extract(this.raw, `relationships.${fieldName}.data`) || null;
    const relatedObjects = this.parentDocument.getIncluded().filter(object => [relationshipData].flat().some(identifies(object)));
    return Array.isArray(relationshipData) ? relatedObjects : relatedObjects.pop();
  }

  getLinks() {
    return Link.parseLinks(this.raw.links || {});
  }

  matches({type, id}) {
    return this.getType() === type && this.getID() === id;
  }

}

const identifies = object => identifier => object.matches(identifier);
