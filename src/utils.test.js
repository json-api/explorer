import { checkIncludesPath } from './utils';

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
