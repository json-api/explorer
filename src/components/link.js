import React, { useContext } from 'react';

import { extract } from '../utils';
import { LocationContext } from '../contexts/location';

class Link {
  constructor({ href, rel, title }, text = '') {
    this.href = href;
    this.rel = rel;
    this.title = title;
    this.text = text;
  }

  static parseLinks(links, schema = null) {
    return Object.keys(links).reduce((parsed, key) => {
      const current = links[key];
      const href = current.href;
      const rel = extract(current, 'meta.linkParams.rel', key);
      const title = schema
        ? extract(extract(schema, 'links', []).find(linkSchema => linkSchema.rel === rel), 'title', null)
        : null;
      const params = {
        href,
        rel,
        title: extract(current, 'meta.linkParams.title', title || key),
      };
      const link = new Link(params, key);
      return Object.assign(parsed, {[key]: link})
    }, {});
  }
}

const LinkElement = ({ link }) => {
  const location = useContext(LocationContext);
  return (
    <button
      className={`${location.locationUrl === link.href ? 'active' : ''}`}
      onClick={() => location.setUrl(link.href)}
    >
      <span className="link__title">{link.title ? link.title : link.text}</span>
    </button>
  );
};

const MenuLinkElement = ({ link, next }) => {
  const location = useContext(LocationContext);
  const handleClick = () => {
    location.setUrl(link.href);
    next();
  };

  return (
    <button
      className={`link--next ${
        location.locationUrl === link.href ? 'active' : ''
      }`}
      onClick={handleClick}
    >
      {link.title ? (
        <span>
          <span className="link__title link__title--readable">
            {link.title}
          </span>
          <span className="link__text link__text--machine">{link.text}</span>
        </span>
      ) : (
        <span className="link__title">{link.text}</span>
      )}
    </button>
  );
};

export { Link, LinkElement, MenuLinkElement };
