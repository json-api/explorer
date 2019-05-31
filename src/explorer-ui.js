import React, { useState, useEffect, useContext } from 'react';

import { Link, LinkElement } from './link';
import Resource from './resource';
import { request } from './lib/request';
import { LocationContext } from './location';

const ExplorerUI = ({ homeUrl }) => {
    const location = useContext(LocationContext);
    const [result, setResult] = useState([]);
    const [links, setLinks] = useState([]);
    const [resourceLinks, setResourceLinks] = useState([]);

    const loadTopLevel = () => {
        const fetchDocument = async (url) => {
            const response = await request(url);
            setResourceLinks(Link.parseLinks(response.links));
        };

        fetchDocument(homeUrl);
    };

    const updateDocument = () => {
        const fetchDocument = async (url) => {
            const response = await request(url);
            setLinks(Link.parseLinks(response.links));
            setResult(response);
        };

        fetchDocument(location.locationUrl);
    };


    useEffect(() => {
        if (location.locationUrl === homeUrl) {
            loadTopLevel();
        }
        else {
            updateDocument();
        }
    }, [location.locationUrl]);

    return (
        <div className="container">
            <header className="location">
                <div className="pane query">
                    <h2>Query</h2>
                    <div className="scrollable scrollable_x query-url">{location.locationUrl}</div>
                </div>
            </header>
            <nav className="pane resourceLinks">
                <h2>Resources</h2>
                <ul className="scrollable scrollable_y">
                    {Object.keys(resourceLinks).map((key, index) => (
                        <li key={`resource-link-${index}`}>
                            <LinkElement link={resourceLinks[key]} />
                        </li>
                    ))}
                </ul>
            </nav>
            <Resource result={result} links={links} />
        </div>
    );
};

export default ExplorerUI;
