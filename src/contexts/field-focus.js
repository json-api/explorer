import React, { createContext, useContext, useEffect, useReducer } from 'react';
import {LocationContext} from "./location";
import {copyObject} from "../utils";

const defaults = {
  focus: {
    path: [],
    field: null,
    on: null,
    last: null,
  },
  changeFocus: () => {},
  availableFocusPaths: [],
};

const findUniqueFieldNames = (resourceObjects) => {
  const reduceAvailableFieldPaths = crumb => (reduced, resourceObject) => {
    const fields = resourceObject.getFieldnames();
    return fields.reduce((reduced, field) => {
      reduced = reduced.add(`${crumb}${field}`);
      if (resourceObject.hasRelationship(field)) {
        const related = [resourceObject.getRelated(field)].flat().filter(o => o);
        reduced = related.reduce(reduceAvailableFieldPaths(`${crumb}${field}.`), reduced);
      }
      return reduced;
    }, reduced);
  };
  return [...resourceObjects.reduce(reduceAvailableFieldPaths(''), new Set([]))];
};

const fieldFocusReducer = (state, action) => {
  let {path, field, on} = action.arg || defaults.focus;
  switch(action.type) {
    case 'focusOn':
      const newState = {path, field, last: {...state}};
      if (path.join('.') !== state.path.join('.')) {
        newState['on'] = null;
      }
      return Object.assign({...state}, newState);
    case 'focusOff':
      return Object.assign({...state}, {
        path: defaults.focus.path,
        field: defaults.focus.field,
        last: {...state},
      });
    case 'focusUp':
      return chain({...state}, {
        type: 'focusOn',
        arg: {
          path: state.path.slice(0, -1),
          field: state.path[state.path.length - 1],
        }
      }, {
        type: 'zoomOn',
        arg: {on: action.arg.on.getRelatedBy()},
      });
    case 'focusDown':
      const { field, of } = action.arg;
      return chain({...state}, {
        type: 'focusOn',
        arg: {
          path: [...state.path, field],
          field: null,
        }
      }, {
        type: 'zoomOn',
        arg: {on: of.getRelated(field)},
      });
    case 'zoomOn':
      return Object.assign({...state}, {on: action.arg.on, last: state});
    case 'zoomOff':
      return Object.assign({...state}, {on: defaults.focus.on, last: state});
    case 'expand':
      return chain(state, {
        type: 'focusOn',
        arg: {
          path: state.path,
          field: null,
        }
      }, {
        type: 'zoomOn',
        arg: action.arg,
      });
    case 'set':
      return Object.assign({path, field, on}, {last: state});
    case 'toLast':
      return Object.assign({...state.last}, {last: state});
    case 'reset':
      return defaults.focus;
  }
};

const chain = (state, ...actions) => {
  return Object.assign(actions.reduce(fieldFocusReducer, state), {last: {...state}});
};

const FieldFocusContext = createContext(defaults);

const FieldFocus = ({children}) => {
  const { baseUrl, fields, responseDocument } = useContext(LocationContext);
  const [ focus, dispatch ] = useReducer(fieldFocusReducer, defaults.focus);
  const availableFocusPaths = findUniqueFieldNames(responseDocument
    ? [responseDocument.getData()].flat()
    : []
  );

  const changeFocus = (command, arg) => dispatch({type: command, arg});

  useEffect(() => {
    changeFocus('reset');
  }, [baseUrl, fields]);

  return (
    <FieldFocusContext.Provider value={{
      focus,
      changeFocus,
      availableFocusPaths,
    }}>
      {children}
    </FieldFocusContext.Provider>
  );
};

export { FieldFocusContext };
export default FieldFocus;
