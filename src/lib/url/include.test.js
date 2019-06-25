import {optimizeInclude} from "./include";


describe.each([
  [['uid'], ['uid']],
  [['uid.roles'], ['uid.roles']],
  [['uid', 'uid.roles'], ['uid.roles']],
  [['uid.roles', 'uid.user_picture'], ['uid.roles', 'uid.user_picture']],
  [['uid', 'uid.roles', 'uid.user_picture'], ['uid.roles', 'uid.user_picture']],
  [
    ['field_image', 'uid', 'uid.roles', 'uid.user_picture'],
    ['field_image', 'uid.roles', 'uid.user_picture']
  ],
  [
    ['field_image', 'field_image.uid', 'uid', 'uid.roles', 'uid.user_picture'],
    ['field_image.uid', 'uid.roles', 'uid.user_picture']
  ],
])('optimizeInclude', (input, expected) => {
  const msg = `${JSON.stringify(input)} should be optimized into ${JSON.stringify(expected)}`;
  console.log(msg);
  test(msg, () => {
    expect(optimizeInclude(input)).toStrictEqual(expected);
  });
});
