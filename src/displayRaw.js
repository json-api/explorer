import React, { useState } from 'react';

const DisplayRaw = ({ title, name, document, children }) => {
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
    <div className={`pane ${name}`}>
      {document && (
        <>
          <ul className="tabs">
            <TabMenu id={0} title={title} />
            <TabMenu id={1} title="Raw" />
          </ul>
          <div className={`tab ${activeTab === 0 ? 'tab__active' : ''}`}>
            <h2>{title}</h2>
            {children}
          </div>
          <div className={`tab ${activeTab === 1 ? 'tab__active' : ''}`}>
            <h2>Raw</h2>
            <div className="scrollable scrollable_x raw-results">
              <pre>{JSON.stringify(document, null, '  ')}</pre>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DisplayRaw;
