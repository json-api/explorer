import { checkIncludesPath, isEmpty } from './utils';

describe('Enabled if matches includes', () => {
  test('Top level: No includes', () => {
    expect(checkIncludesPath([], [])).toBe(true);
  });

  test('Top level: One include', () => {
    expect(checkIncludesPath(['uid'], [])).toBe(true);
  });

  test('Top level: Multiple includes', () => {
    expect(checkIncludesPath(['uid', 'node_type'], [])).toBe(true);
  });

  test('Relationship: No includes', () => {
    expect(checkIncludesPath([], ['uid'])).toBe(false);
  });

  test('Relationship: matching include', () => {
    expect(checkIncludesPath(['uid'], ['uid'])).toBe(true);
  });

  test('Relationship: mismatch include', () => {
    expect(checkIncludesPath(['node_type'], ['uid'])).toBe(false);
  });

  test('Relationship: matching include plus other', () => {
    expect(checkIncludesPath(['uid', 'node_type'], ['uid'])).toBe(true);
  });

  test('Relationship: matching deep include', () => {
    expect(checkIncludesPath(['uid.roles'], ['uid', 'roles'])).toBe(true);
  });

  test('Relationship: mismatching deep include', () => {
    expect(checkIncludesPath(['uid'], ['uid', 'user_picture', 'uid'])).toBe(
      false,
    );
  });
});

describe('Check if different type variables are empty', () => {
  test('Arrays are empty', () => {
    expect(isEmpty([])).toBe(true);
    expect(isEmpty(['foo'])).toBe(false);
  });

  test('Objects are empty', () => {
    expect(isEmpty({})).toBe(true);
    expect(isEmpty({ foo: 'bar' })).toBe(false);
  });

  test('Sets are empty', () => {
    expect(isEmpty(new Set())).toBe(true);
    expect(isEmpty(new Set(['foo']))).toBe(false);
  });
});
