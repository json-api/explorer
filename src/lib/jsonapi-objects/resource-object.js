import { Link } from '../../components/link';
import {copyObject, extract} from '../../utils';

export default class ResourceObject {
  constructor({ raw }) {
    this.raw = raw;
    this.parentDocument = null;
    this.related = false;
    this.relatedBy = null;
  }

  static parse(raw) {
    return new ResourceObject({ raw });
  }

  withParentDocument(responseDocument) {
    this.parentDocument = responseDocument;
    return this;
  }

  withRelated(related) {
    this.related = related;
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
    if (this.related === false) {
      const identifiersByField = Object.entries(this.getRelationships()).reduce((identifiers, [fieldName, relationship]) => {
        return Object.assign(identifiers, {
          [fieldName]: [relationship.data].flat().filter(i => i),
        });
      }, {});
      const allIdentifiers = Object.values(identifiersByField).flat();
      const allRelated = this.parentDocument
        .getIncluded()
        .filter(object => allIdentifiers.some(identifies(object)))
        .map(relatedObject => relatedObject.copy())
        .map(relatedObject => relatedObject.withRelatedBy(this));
      this.related = Object.entries(identifiersByField).reduce((related, [fieldName, identifiers]) => {
        const identified = allRelated.filter(object => identifiers.some(identifies(object)));
        return Object.assign(related, {
          [fieldName]: Array.isArray(extract(this.raw, `relationships.${fieldName}.data`) || null)
            ? identified
            : identified.pop() || null,
        });
      }, {})
    }
    return this.related[fieldName];
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
      .withRelated(this.related)
      .withRelatedBy(this.relatedBy);
  }
}

const identifies = object => identifier => object.matches(identifier);
