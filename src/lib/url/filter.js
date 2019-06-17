/**
 * The key for the implicit root group.
 */
const ROOT_ID = '@root';

/**
 * The value key in the filter condition: filter[lorem][condition][<value>].
 *
 * @var string
 */
const VALUE_KEY = 'value';

/**
 * Key in the filter[<key>] parameter for conditions.
 *
 * @var string
 */
const CONDITION_KEY = 'condition';

/**
 * The field key in the filter condition: filter[lorem][condition][<field>].
 *
 * @var string
 */
const PATH_KEY = 'path';

/**
 * The operator key in the condition: filter[lorem][condition][<operator>].
 *
 * @var string
 */
const OPERATOR_KEY = 'operator';

/**
 * Key in the filter[<key>] parameter for groups.
 *
 * @var string
 */
const GROUP_KEY = 'group';

/**
 * Key in the filter[<id>][<key>] parameter for group membership.
 *
 * @var string
 */
const MEMBER_KEY = 'memberOf';

export function newFilter(param) {
  return {
    [param]: {
      [CONDITION_KEY]: {
        [PATH_KEY]: param,
        [OPERATOR_KEY]: '=',
        [VALUE_KEY]: '',
        [MEMBER_KEY]: ROOT_ID,
      },
    },
  };
}

function expandItem(filterIndex, filterItem) {
  if (filterItem.hasOwnProperty(VALUE_KEY)) {
    if (!filterItem[PATH_KEY]) {
      filterItem[PATH_KEY] = filterIndex;
    }

    filterItem = {
      [CONDITION_KEY]: filterItem,
    };
  }

  if (filterItem[CONDITION_KEY] && !filterItem[CONDITION_KEY][OPERATOR_KEY]) {
    filterItem[CONDITION_KEY][OPERATOR_KEY] = '=';
  }

  return filterItem;
}

export const expandFilter = unexpandedFilter => {
  let filter = Object.assign({}, unexpandedFilter);
  const expanded = {};

  // Allow extreme shorthand filters, f.e. `?filter[promote]=1`.
  for (let key in filter) {
    if (filter.hasOwnProperty(key)) {
      let value = filter[key];

      if (typeof value !== 'object') {
        value = {
          [VALUE_KEY]: value,
          [MEMBER_KEY]: ROOT_ID,
        };
      }

      // Add a memberOf key to all items.
      if (value[CONDITION_KEY] && !value[CONDITION_KEY][MEMBER_KEY]) {
        value[CONDITION_KEY][MEMBER_KEY] = ROOT_ID;
      } else if (value[GROUP_KEY] && !value[GROUP_KEY][MEMBER_KEY]) {
        value[GROUP_KEY][MEMBER_KEY] = ROOT_ID;
      }

      // Expands shorthand filters.
      expanded[key] = expandItem(key, value);
    }
  }

  return expanded;
};

export const optimizeFilter = unoptimizedFilter => {
  let filter = Object.assign({}, unoptimizedFilter);
  let optimized = {};

  const expanded = expandFilter(filter);

  for (let [key, value] of Object.entries(expanded)) {
    if (
      value[CONDITION_KEY] &&
      value[CONDITION_KEY][OPERATOR_KEY] === '=' &&
      value[CONDITION_KEY][MEMBER_KEY] === ROOT_ID
    ) {
      optimized[value[CONDITION_KEY][PATH_KEY]] = value[CONDITION_KEY][VALUE_KEY];
    } else if (
      value[CONDITION_KEY] && value[CONDITION_KEY][MEMBER_KEY] === ROOT_ID
    ) {
      optimized[key] = value;
      delete(optimized[key][CONDITION_KEY][MEMBER_KEY]);
    } else if (
      value[GROUP_KEY] && value[GROUP_KEY][MEMBER_KEY] === ROOT_ID
    ) {
      optimized[key] = value;
      delete(optimized[key][GROUP_KEY][MEMBER_KEY]);
    } else {
      // Original unoptimized
      optimized[key] = filter[key];
    }
  }

  return optimized;
};
