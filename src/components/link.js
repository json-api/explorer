import React, { useContext } from 'react';

import { extract } from '../utils';
import { LocationContext } from '../contexts/location';

class Link {
  constructor({ href, meta }, text = '') {
    this.href = href;
    this.title = extract(meta, 'linkParams.title');
    this.text = text;
  }

  static parseLinks(links) {
    return Object.keys(links).reduce(
      (parsed, key) =>
        Object.assign(parsed, {
          [key]: new Link(links[key], key),
        }),
      {},
    );
  }
}

const LinkElement = ({ link, next }) => {
  const location = useContext(LocationContext);
  const handleClick = () => {
    location.setUrl(link.href);
    next();
  };

  return (
    <button
      className={`${location.locationUrl === link.href ? 'active' : ''}`}
      onClick={handleClick}
    >
      {link.title ? (
        <>
          <span className="link__title link__title--readable">
            {link.title}
          </span>
          <span className="link__text link__text--machine">{link.text}</span>
        </>
      ) : (
        <span className="link__title">{link.text}</span>
      )}
    </button>
  );
};

export { Link, LinkElement };
