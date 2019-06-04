import React, { useState } from 'react';

const DisplayRaw = ({ title, name, data, children }) => {

  const [activeTab, setActiveTab] = useState(0);

  const length = Array.isArray(data) ? data.length : Object.keys(data).length;

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
      {length > 0 &&
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
            <pre>{JSON.stringify(data, null, '  ')}</pre>
          </div>
        </div>
      </>
      }
    </div>
  )
};

export default DisplayRaw;
