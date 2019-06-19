import React, { useContext } from 'react';

import { LocationContext } from '../../contexts/location';
import DisplayRaw from './display-raw';
import Summary from "./summary";

const ResultUI = () => {
  const { responseDocument } = useContext(LocationContext);
  const data = responseDocument ? responseDocument.getData() : [];
  const included = responseDocument ? responseDocument.getIncluded() : [];

  return (
    <>
      <DisplayRaw
        title="Results"
        name="results"
        responseDocument={responseDocument && responseDocument.raw}
      >
        <Summary data={data}/>
      </DisplayRaw>
    </>
  );
};

export default ResultUI;
