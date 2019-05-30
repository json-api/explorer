export function extract(obj, path, dflt) {
    const $n = {};
    return path.split('.').reduce((obj, key) => (obj||$n)[key], obj) || dflt;
}
