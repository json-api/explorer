import React, { useState } from 'react';

import CodeMirrorElem from './code-mirror';
import PageNavigation from "./page-navigation";

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
