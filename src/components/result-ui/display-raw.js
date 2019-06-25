import React, { useEffect, useState } from 'react';

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
    <div className={`pane ${name} flex-height`}>
      {responseDocument && (
        <>
          <ul className="tabs">
            <TabMenu id={0} title={title} />
            <TabMenu id={1} title="Raw" />
          </ul>
          <div className={`tab flex-height ${activeTab === 0 ? 'tab__active' : ''}`}>
            <h2>{title}</h2>
            {children}
          </div>
          <div className={`tab flex-height ${activeTab === 1 ? 'tab__active' : ''}`}>
            <h2>Raw</h2>
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
