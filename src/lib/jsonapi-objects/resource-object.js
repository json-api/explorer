import { Link } from '../../components/link';
import {copyObject, extract} from '../../utils';

export default class ResourceObject {
  constructor({ raw }) {
    this.raw = raw;
    this.parentDocument = null;
    this.relatedBy = null;
  }

  static parse(raw) {
    return new ResourceObject({ raw });
  }

  withParentDocument(responseDocument) {
    this.parentDocument = responseDocument;
    return this;
  }

  withRelatedBy(resourceObject) {
    this.relatedBy = resourceObject;
    return this;
  }

  getType() {
    return this.raw.type;
  }

  getID() {
    return this.raw.id;
  }

  getIdentifier() {
    return {
      type: this.raw.type,
      id: this.raw.id,
    };
  }

  getFieldnames() {
    return [
      ...Object.keys(this.getAttributes()),
      ...Object.keys(this.getRelationships()),
    ];
  }

  getAttributes() {
    return this.raw.attributes || {};
  }

  hasAttribute(fieldName) {
    return this.raw.attributes && this.raw.attributes.hasOwnProperty(fieldName);
  }

  getRelationships() {
    return this.raw.relationships || {};
  }

  hasRelationship(fieldName) {
    return this.raw.relationships && this.raw.relationships.hasOwnProperty(fieldName);
  }

  getRelated(fieldName) {
    const relationshipData =
      extract(this.raw, `relationships.${fieldName}.data`) || null;
    const relatedObjects = this.parentDocument
      .getIncluded()
      .filter(
        object =>
          relationshipData &&
          [relationshipData].flat().some(identifies(object)),
      )
      .map(relatedObject => relatedObject.copy())
      .map(relatedObject => relatedObject.withRelatedBy(this));
    return Array.isArray(relationshipData)
      ? relatedObjects
      : relatedObjects.pop() || null;
  }

  getRelatedBy() {
    return this.relatedBy;
  }

  getLinks() {
    return Link.parseLinks(this.raw.links || {});
  }

  getOutgoingLinks() {
    const {self, describedBy, ...outgoing} = this.getLinks();
    return outgoing;
  }

  matches({ type, id }) {
    return this.getType() === type && this.getID() === id;
  }

  same(resourceObject) {
    return this.matches(resourceObject.getIdentifier()) && ((!this.getRelatedBy() && !this.getRelatedBy()) || this.getRelatedBy().same(resourceObject.getRelatedBy()));
  }

  copy() {
    return ResourceObject
      .parse(copyObject(this.raw))
      .withParentDocument(this.parentDocument)
      .withRelatedBy(this.relatedBy);
  }
}

const identifies = object => identifier => object.matches(identifier);
