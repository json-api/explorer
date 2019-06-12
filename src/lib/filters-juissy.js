const Groups = {
  and: (...members) => {
    return Groups.group(members, 'AND');
  },

  or: (...members) => {
    return Groups.group(members, 'OR');
  },

  group: (members, conjunction) => {
    return {
      conjunction,
      members,
    };
  },
};

const Conditions = function(path, value) {
  return Conditions.eq(path, value);
};

Conditions.and = Groups.and;

Conditions.or = Groups.or;

Conditions.eq = (path, value) => {
  return Conditions.condition(path, value, '=');
};

Conditions.notEq = (path, value) => {
  return Conditions.condition(path, value, '<>');
};

Conditions.gt = (path, value) => {
  return Conditions.condition(path, value, '>');
};

Conditions.gtEq = (path, value) => {
  return Conditions.condition(path, value, '>=');
};

Conditions.lt = (path, value) => {
  return Conditions.condition(path, value, '<');
};

Conditions.ltEq = (path, value) => {
  return Conditions.condition(path, value, '<=');
};

Conditions.startsWith = (path, value) => {
  return Conditions.condition(path, value, 'STARTS_WITH');
};

Conditions.contains = (path, value) => {
  return Conditions.condition(path, value, 'CONTAINS');
};

Conditions.endsWith = (path, value) => {
  return Conditions.condition(path, value, 'ENDS_WITH');
};

Conditions.in = (path, value) => {
  return Conditions.condition(path, value, 'IN');
};

Conditions.notIn = (path, value) => {
  return Conditions.condition(path, value, 'NOT IN');
};

Conditions.between = (path, value) => {
  return Conditions.condition(path, value, 'BETWEEN');
};

Conditions.notBetween = (path, value) => {
  return Conditions.condition(path, value, 'NOT BETWEEN');
};

Conditions.null = path => {
  return Conditions.condition(path, undefined, 'IS NULL');
};

Conditions.notNull = path => {
  return Conditions.condition(path, undefined, 'IS NOT NULL');
};

Conditions.condition = (path, value, operator) => {
  return Conditions.validate({ path, value, operator });
};

Conditions.unaryOperators = new Set([
  '=',
  '<>',
  '>',
  '>=',
  '<',
  '<=',
  'STARTS_WITH',
  'CONTAINS',
  'ENDS_WITH',
]);
Conditions.unaryValueTypes = new Set(['string', 'boolean', 'number']);
Conditions.binaryOperators = new Set(['BETWEEN', 'NOT BETWEEN']);
Conditions.stringOperators = new Set(['STARTS_WITH', 'CONTAINS', 'ENDS_WITH']);
Conditions.nullOperators = new Set(['IS NULL', 'IS NOT NULL']);

Conditions.validate = condition => {
  if (
    condition.operator instanceof Function ||
    condition.value instanceof Function
  ) {
    return condition;
  }
  if (Conditions.nullOperators.has(condition.operator)) {
    if (typeof condition.value !== 'undefined') {
      throw new Error(
        `Conditions with an '${
          condition.operator
        }' operator must not specify a value.`,
      );
    }
  } else if (Conditions.unaryOperators.has(condition.operator)) {
    if (!Conditions.unaryValueTypes.has(typeof condition.value)) {
      throw new Error(
        `The '${condition.operator}' operator requires a single value.`,
      );
    }
    if (
      Conditions.stringOperators.has(condition.operator) &&
      typeof condition.value != 'string'
    ) {
      throw new Error(
        `The '${
          condition.operator
        }' operator requires that the condition value be a string.`,
      );
    }
  } else {
    if (!Array.isArray(condition.value)) {
      throw new Error(
        `The '${condition.operator}' operator requires an array of values.`,
      );
    }
    if (
      Conditions.binaryOperators.has(condition.operator) &&
      condition.value.length !== 2
    ) {
      throw new Error(
        `The '${
          condition.operator
        }' operator requires an array of exactly 2 values.`,
      );
    }
  }
  return condition;
};

Conditions.process = (condition, parameters) => {
  let revalidate = false;
  const replace = item => {
    if (item instanceof Function) {
      revalidate = true;
      return item(parameters);
    }
    return item;
  };
  const processed = {
    path: replace(condition.path),
    operator: replace(condition.operator),
  };
  if (!Conditions.nullOperators.has(processed.operator)) {
    processed.value = replace(condition.value);
  }
  if (revalidate) {
    Conditions.validate(processed);
  }
  return processed;
};

export { Conditions };
