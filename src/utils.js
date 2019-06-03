export function extract(obj, path, dflt) {
    const $n = {};
    return path.split('.').reduce((obj, key) => (obj||$n)[key], obj) || dflt;
}

export function toggleSetEntry(set, entry) {
    if (set.has(entry)) {
        set.delete(entry);
    } else {
        set.add(entry);
    }
}
