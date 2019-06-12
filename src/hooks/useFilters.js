import React, { useEffect, useReducer } from 'react';
import { expandFilter } from '../lib/filter';

const load = filter =>
  Object.entries(filter).map(([id, value]) => ({
    id,
    expanded: expandFilter({ [id]: value }),
  }));

const reducer = (state, action) => {
  switch (action.type) {
    case 'refresh':
      return load(action.value);
      break;
  }
};

const useFilters = filter => {
  const [filters, dispatch] = useReducer(reducer, []);

  useEffect(() => {
    dispatch({ type: 'refresh', value: filter });
  }, [filter]);

  return {
    filters,
  };
};

export default useFilters;
