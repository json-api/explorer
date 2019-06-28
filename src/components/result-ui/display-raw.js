import React, { useContext, useState } from 'react';

import CodeMirrorElem from './code-mirror';
import {LocationContext} from "../../contexts/location";

const PageNavigation = ({links}) => {
  const location = useContext(LocationContext);
  const {first, prev, next, last} = links;

  const followLink = link => () => {
    location.setUrl(link.href);
  };

  return (<div className="page_navigation">
    {first && <span className="page_navigation__link_arrow" onClick={followLink(first)}>&laquo;</span>}
    {prev && <span className="page_navigation__link_arrow" onClick={followLink(prev)}>&lsaquo;</span>}
    {next && <span className="page_navigation__link_arrow" onClick={followLink(next)}>&rsaquo;</span>}
    {last && <span className="page_navigation__link_arrow" onClick={followLink(last)}>&raquo;</span>}
  </div>);
};

const DisplayRaw = ({ title, name, responseDocument, children }) => {
  const [activeTab, setActiveTab] = useState(0);
  const isCollection = responseDocument && responseDocument.isCollectionDocument();
  const resultCount = isCollection ? responseDocument.getData().length : 1;
  const links = responseDocument ? responseDocument.getPaginationLinks() : false;

  const TabMenu = ({ title, id }) => (
    <li
      className={id === activeTab ? 'is_active' : ''}
      onClick={() => setActiveTab(id)}
    >
      {title}
    </li>
  );

  return (
    <div className={`${name} flex-height`}>
      {responseDocument && (
        <>
          <ul className="tabs">
            <TabMenu id={0} title={title} />
            <TabMenu id={1} title="Raw" />
          </ul>
          <div className={`tab flex-height ${activeTab === 0 ? 'tab__active' : ''}`}>
            <div className="tab__header">
              <span className="tab__header__result_count">{isCollection ? resultCount ? `${resultCount} results` : 'No results' : 'Result'}</span>
              {links && <PageNavigation links={links}/>}
            </div>
            {resultCount ? children : <></>}
          </div>
          <div className={`tab flex-height ${activeTab === 1 ? 'tab__active' : ''}`}>
            <div className="tab__header">
              <span className="tab__header__result_count">{isCollection ? resultCount ? `${resultCount} results` : 'No results' : 'Result'}</span>
              {links && <PageNavigation links={links}/>}
            </div>
            <CodeMirrorElem
              code={JSON.stringify(responseDocument.raw, null, '  ')}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default DisplayRaw;
