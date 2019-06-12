import React, { useContext } from 'react';

import { extract } from '../utils';
import { LocationContext } from '../contexts/location';

class Link {
  constructor({ href, meta }, text = '') {
    this.href = href;
    this.text = extract(meta, 'linkParams.title', text);
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

const LinkElement = ({ link }) => {
  const location = useContext(LocationContext);
  return (
    <button onClick={() => location.setUrl(link.href)}>{link.text}</button>
  );
};

export { Link, LinkElement };
