import React, { useState } from 'react';

import CodeMirrorElem from './code-mirror';

const DisplayRaw = ({ title, name, responseDocument, children }) => {
  const [activeTab, setActiveTab] = useState(0);

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
            <h2 className="tab__title">{title}</h2>
            {(!Array.isArray(responseDocument.data) || responseDocument.data.length)
              ? children
              : <div />
            }
          </div>
          <div className={`tab flex-height ${activeTab === 1 ? 'tab__active' : ''}`}>
            <h2 className="tab__title">Raw</h2>
            <CodeMirrorElem
              code={JSON.stringify(responseDocument, null, '  ')}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default DisplayRaw;
