import { Link } from '../../components/link';
import { extract } from '../../utils';

export default class ResourceObject {
  constructor({ raw }) {
    this.raw = raw;
    this.parentDocument = null;
  }

  static parse(raw) {
    return new ResourceObject({ raw });
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
    return this.raw.attributes.hasOwnProperty(fieldName);
  }

  getRelationships() {
    return this.raw.relationships || {};
  }

  hasRelationship(fieldName) {
    return this.raw.relationships.hasOwnProperty(fieldName);
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
      );
    return Array.isArray(relationshipData)
      ? relatedObjects
      : relatedObjects.pop() || null;
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
}

const identifies = object => identifier => object.matches(identifier);
