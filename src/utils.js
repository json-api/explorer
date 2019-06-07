export function extract(obj, path, dflt) {
  const $n = {};
  return path.split('.').reduce((obj, key) => (obj || $n)[key], obj) || dflt;
}

export function isEmpty(value) {
  let length = 0;

  if (typeof value === 'object') {
    length = value instanceof Set ? value.size : Object.keys(value).length;
  } else if (Array.isArray(value)) {
    length = value.length;
  }

  return length === 0;
}

export function hasSetEntry(set, entry) {
  return set.has(entry);
}

export function toggleSetEntry(set, entry) {
  if (set.has(entry)) {
    set.delete(entry);
  } else {
    set.add(entry);
  }

  return set;
}

export function checkIncludesPath(include, includePath) {
  return includePath.length > 0
    ? new Set(include).has(includePath.join('.'))
    : true;
}
