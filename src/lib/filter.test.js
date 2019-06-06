import { expandFilter, optimizeFilter } from './filter';

const expanded = [
  {
    field_first_name: {
      condition: {
        path: 'field_first_name',
        operator: '=',
        value: 'Janis',
        memberOf: '@root',
      },
    },
  },
  {
    foo: {
      condition: {
        path: 'foo',
        operator: '=',
        value: 'bar',
        memberOf: '@root',
      },
    },
  },
  {
    foo: {
      condition: {
        path: 'foo',
        operator: '=',
        value: 'bar',
        memberOf: 'baz',
      },
    },
    baz: {
      group: {
        conjunction: 'OR',
        memberOf: '@root',
      },
    },
  },
  {
    foo: {
      condition: {
        path: 'foo',
        operator: 'STARTS_WITH',
        value: 'bar',
        memberOf: '@root',
      },
    },
  },
  {
    foo: {
      condition: {
        path: 'foo',
        operator: '=',
        value: 'bar',
        memberOf: 'baz',
      },
    },
    bar: {
      condition: {
        path: 'foo',
        operator: 'STARTS_WITH',
        value: 'bar',
        memberOf: '@root',
      },
    },
    baz: {
      group: {
        conjunction: 'AND',
        memberOf: '@root',
      }
    },
  },
];

const optimized = [
  { field_first_name: 'Janis' },
  { foo: 'bar' },
  {
    foo: {
      condition: {
        path: 'foo',
        operator: '=',
        value: 'bar',
        memberOf: 'baz',
      },
    },
    baz: {
      group: {
        conjunction: 'OR'
      },
    },
  },
  {
    foo: {
      condition: {
        path: 'foo',
        operator: 'STARTS_WITH',
        value: 'bar',
      },
    },
  },
  {
    foo: {
      condition: {
        path: 'foo',
        operator: '=',
        value: 'bar',
        memberOf: 'baz',
      },
    },
    bar: {
      condition: {
        path: 'foo',
        operator: 'STARTS_WITH',
        value: 'bar',
      },
    },
    baz: {
      group: {
        conjunction: 'AND',
      }
    }
  },
];

const unoptimizable = [
  {
    field_first_name: {
      condition: {
        path: 'field_first_name',
        value: 'Janis',
        memberOf: 'bug'
      },
    },
  },
  {
    field_first_name: {
      condition: {
        path: 'field_first_name',
        value: 'Janis',
        operator: 'STARTS_WITH'
      },
    },
  },
];

describe('Expand Filter', () => {
  test('Expanded filter should be processed', () => {
    expanded.forEach((filter, index) => {
      expect(expandFilter(filter)).toEqual(expanded[index]);
    });
  });

  test('Optimized filter should be expanded', () => {
    optimized.forEach((filter, index) => {
      expect(expandFilter(filter)).toEqual(expanded[index]);
    });
  });
});

describe('Optimize Filter', () => {
  test('Expanded filter should be optimized', () => {
    expanded.forEach((filter, index) => {
      expect(optimizeFilter(filter)).toEqual(optimized[index]);
    });
  });

  test('Optimized filter should be unchanged', () => {
    optimized.forEach((filter, index) => {
      expect(optimizeFilter(filter)).toEqual(optimized[index]);
    });
  });

  test('Unexpanded filter should be optimized', () => {
    unoptimizable.forEach((filter, index) => {
      expect(optimizeFilter(filter)).toEqual(unoptimizable[index]);
    });
  });
});
