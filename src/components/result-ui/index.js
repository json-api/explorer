import React, { useContext } from 'react';

import { LocationContext } from '../../contexts/location';
import DisplayRaw from './display-raw';
import Summary from "./summary";

const ResultUI = () => {
  const { responseDocument } = useContext(LocationContext);
  const data = responseDocument ? responseDocument.getData() : [];

  return (
    <>
      <DisplayRaw
        title="Summary"
        name="results"
        responseDocument={responseDocument}
      >
        <Summary responseDocument={responseDocument} />
      </DisplayRaw>
    </>
  );
};

export default ResultUI;
