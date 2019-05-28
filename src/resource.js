import React from 'react';

const Resource = ({ data }) => {


  return (
    <main>
      <div className="controls">
        <div id="filters" className="pane">
          {data.length > 0 &&
          <>
          <h2>Filters</h2>
          {data.length > 0 &&
          <ul className="scrollable scrollable_y">
            {Object.keys(data[0].attributes).map((attribute, index) => (
              <li key={`includes-${index}`}>
                {attribute}
              </li>
            ))}
          </ul>
          }
          </>}
        </div>
        <div id="includes" className="pane">
          {data.length > 0 &&
          <>
          <h2>Includes</h2>
          {data.length > 0 &&
          <ul className="scrollable scrollable_y">
            {Object.keys(data[0].relationships).map((relationship, index) => (
              <li key={`includes-${index}`}>
                {relationship}
              </li>
            ))}
          </ul>
          }
          </>}
        </div>
        <div id="fields" className="pane">
          {data.length > 0 &&
          <>
          <h2>Fields</h2>
          <ul className="scrollable scrollable_y">

          </ul>
          </>}
        </div>
      </div>
      <div className="results">
        <div className="pane tree">
          {data.length > 0 &&
          <>
          <h2>Results ({data.length})</h2>
          {data.length === 0 && <p><em>No results</em></p>}
          <ul>
            {data.map((item, index) => (
              <li key={`item-${index}`}>
                {item.attributes.title}
              </li>
            ))}
          </ul>
          </>}
        </div>
        <div className="pane raw">
          {data.length > 0 &&
          <>
          <h2>Raw</h2>
          <div className="scrollable scrollable_x raw-results">
            <pre>{JSON.stringify(data, null, '\t')}</pre>
          </div>
          </>}
        </div>
      </div>
    </main>
  )

};

export default Resource;