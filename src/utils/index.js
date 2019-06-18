export function copyObject(obj) {
  return JSON.parse(JSON.stringify(obj));
}

export function extract(obj, path, dflt) {
  const $n = {};
  return path.split('.').reduce((obj, key) => (obj || $n)[key], obj) || dflt;
}

export function removeEmpty(value) {
  let obj = { ...value };
  Object.entries(obj).forEach(([key, val]) => {
    if (val && !Set.prototype.isPrototypeOf(val) && !Array.isArray(val)) {
      if (typeof val === 'object') {
        obj[key] = removeEmpty(val);
      }
    } else if (val === null || val === '') {
      delete obj[key];
    }
  });

  return obj;
}

export function isEmpty(value) {
  if (Set.prototype.isPrototypeOf(value)) {
    return !value.size;
  } else if (Array.isArray(value)) {
    return !value.length;
  } else if (typeof value === 'object') {
    return !Object.keys(value).length;
  } else {
    return !value;
  }
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
