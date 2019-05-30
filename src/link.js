import React from 'react';

import { extract } from "./utils";


class Link {

    constructor({href, meta}, text = '') {
        this.href = href;
        this.text = extract(meta, 'linkParams.title', text);
    }

    static parseLinks(links) {
        return Object.keys(links).reduce((parsed, key) => Object.assign(parsed, {
            [key]: new Link(links[key], key),
        }), {});
    }

}

const LinkElement = ({link, handleClick}) => (
  <button onClick={() => handleClick(link.href)}>{link.text}</button>
);


export { Link, LinkElement };
