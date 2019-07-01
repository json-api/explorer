import React, { useContext, useState } from 'react';
import {FieldFocusContext} from "../../contexts/field-focus";
import { textDisabled } from '../../lib/messages'

const getFocusString = (focus) => {
  return [...(focus.path||[]), ...(focus.field ? [focus.field] : [])].join('.')
};

const FieldFocusToggle = ({path}) => {
  const { focus, changeFocus, availableFocusPaths } = useContext(FieldFocusContext);
  const [ pinned, setPinned ] = useState(false);
  const [ unpinned, setUnpinned ] = useState(false);

  const onMouseEnter = () => {
    changeFocus('focusOn', {
      path: path.slice(0, -1),
      field: path[path.length - 1],
    });
  };

  const onMouseLeave = () => {
    if (unpinned) {
      changeFocus('focusOff');
    } else if (pinned) {
      changeFocus('focusOn', {
        path: path.slice(0, -1),
        field: path[path.length - 1],
      });
    }
    else {
      changeFocus('toLast');
    }
    setPinned(false);
    setUnpinned(false);
  };

  if (availableFocusPaths.includes([...path].join('.'))) {
    const focusString = getFocusString(focus);
    const active = focusString === path.join('.');
    const classes = active
      ? 'link__toggle link__toggle--active'
      : 'link__toggle';
    return (
      <span
        className={classes}
        onClick={() => {
          (getFocusString(focus.last) === path.join('.')) || pinned ? setUnpinned(!unpinned) : setPinned(!pinned);
        }}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >{(active && !unpinned) || (!active && pinned) ? <>&oplus;</> : <>&#8857;</>}</span>
    );
  } else {
    return (
      <span
        className="link__toggle link__toggle--disabled"
        title={textDisabled}
      >&otimes;</span>);
  }
};

export default FieldFocusToggle;
