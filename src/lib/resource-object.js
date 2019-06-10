import {Link} from "../link";
import { extract } from '../utils'

export const identifies = object => identifier => object.matches(identifier);

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
    if (!this.parentDocument.hasIncluded()) {
      return [];
    }
    const relationshipData = extract(this.raw, `relationships.${fieldName}.data`) || null;
    return Array.isArray(relationshipData)
      ? this.parentDocument.getIncluded().filter(object => relationshipData.some(identifies(object)))
      : this.parentDocument.getIncluded().find(object => relationshipData && identifies(object)(relationshipData)) || null;
  }

  getLinks() {
    return Link.parseLinks(this.raw.links || {});
  }

  matches({type, id}) {
    return this.getType() === type && this.getID() === id;
  }

}
