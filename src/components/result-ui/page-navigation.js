import React, { useContext } from 'react';
import {LocationContext} from "../../contexts/location";

const PageNavigation = ({links}) => {
  const location = useContext(LocationContext);
  const {first, prev, next, last} = links;

  const followLink = link => () => {
    location.setUrl(link.href);
  };

  return (<div className="page_navigation">
    {first && <span title="Go to first page" className="page_navigation__link_arrow" onClick={followLink(first)}>&laquo;</span>}
    {prev && <span title="Go to previous page" className="page_navigation__link_arrow" onClick={followLink(prev)}>&lsaquo;</span>}
    {next && <span title="Go to next page" className="page_navigation__link_arrow" onClick={followLink(next)}>&rsaquo;</span>}
    {last && <span title="Go to last page" className="page_navigation__link_arrow" onClick={followLink(last)}>&raquo;</span>}
  </div>);
};

export default PageNavigation;
