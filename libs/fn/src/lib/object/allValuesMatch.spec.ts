import { allValuesMatch, IAllValuesMatchConfig } from './allValuesMatch';

describe('allValuesMatch', () => {
  it('should return true for like objects', () => {
    const obj1 = {
      foo: 'foo',
      bar: 'bar',
      baz: 'baz',
    };

    const obj2 = {
      foo: 'foo',
      bar: 'bar',
      baz: 'baz',
    };

    const result = allValuesMatch(obj1, obj2);

    expect(result).toBe(true);
  });

  it('should return false for different objects', () => {
    const obj3 = {
      foo: 'foo',
      bar: 'bar',
      baz: 'baz',
    };

    const obj4 = {
      foo: 'foo',
      bar: 'different',
      baz: 'baz',
    };

    const result = allValuesMatch(obj3, obj4);

    expect(result).toBe(false);
  });

  it('should return true for nested objects that are the same', () => {
    const obj3 = {
      foo: 'foo',
      bar: {
        bum: 'bum',
      },
      baz: 'baz',
    };

    const obj4 = {
      foo: 'foo',
      bar: {
        bum: 'bum',
      },
      baz: 'baz',
    };

    const result = allValuesMatch(obj3, obj4);

    expect(result).toBe(true);
  });

  it('should return false for nested objects that are different', () => {
    const obj3 = {
      foo: 'foo',
      bar: {
        bum: 'bum',
      },
      baz: 'baz',
    };

    const obj4 = {
      foo: 'foo',
      bar: {
        bum: 'bummer',
      },
      baz: 'baz',
    };

    const result = allValuesMatch(obj3, obj4);

    expect(result).toBe(false);
  });

  it('should return true for each object has function assigned to the same key', () => {
    const obj3 = {
      foo: 'foo',
      bar: {
        bum: 'bum',
        fn: () => {},
      },
      baz: 'baz',
    };

    const obj4 = {
      foo: 'foo',
      bar: {
        bum: 'bum',
        fn: () => {},
      },
      baz: 'baz',
    };

    const result = allValuesMatch(obj3, obj4);

    expect(result).toBe(true);
  });

  it('should return false if function does not exist on one of the objects', () => {
    const obj3 = {
      foo: 'foo',
      bar: {
        bum: 'bum',
      },
      baz: 'baz',
    };

    const obj4 = {
      foo: 'foo',
      bar: {
        bum: 'bum',
        fn: () => {},
      },
      baz: 'baz',
    };

    const result = allValuesMatch(obj3, obj4);

    expect(result).toBe(false);
  });

  it('should return true for if arrays match', () => {
    const obj3 = {
      foo: 'foo',
      bar: {
        bum: 'bum',
        arr: [1, 2],
        // arr: [ { foo: 'foo'}, { bar: 'bar' }],
      },
      baz: 'baz',
    };

    const obj4 = {
      foo: 'foo',
      bar: {
        bum: 'bum',
        arr: [1, 2],
        // arr: [ { foo: 'foo'}, { bar: 'bar' }],
      },
      baz: 'baz',
    };

    const result = allValuesMatch(obj3, obj4);

    expect(result).toBe(true);
  });

  it('should return false if arrays do not match', () => {
    const obj3 = {
      foo: 'foo',
      bar: {
        bum: 'bum',
        arr: [1, 2],
        // arr: [ { foo: 'foo'}, { bar: 'bar' }],
      },
      baz: 'baz',
    };

    const obj4 = {
      foo: 'foo',
      bar: {
        bum: 'bum',
        arr: [1, 3],
        // arr: [ { foo: 'foo'}, { bar: 'baz' }],
      },
      baz: 'baz',
    };

    const result = allValuesMatch(obj3, obj4, { includeArrays: true });

    expect(result).toBe(false);
  });

  it('should return true for if arrays with objects match', () => {
    const obj3 = {
      foo: 'foo',
      bar: {
        bum: 'bum',
        // arr: [ 1, 2],
        arr: [{ foo: 'foo' }, { bar: 'bar' }],
      },
      baz: 'baz',
    };

    const obj4 = {
      foo: 'foo',
      bar: {
        bum: 'bum',
        // arr: [ 1, 2],
        arr: [{ foo: 'foo' }, { bar: 'bar' }],
      },
      baz: 'baz',
    };

    const result = allValuesMatch(obj3, obj4, { includeArrays: true });

    expect(result).toBe(true);
  });

  it('should return false if arrays with objects do not match', () => {
    const obj3 = {
      foo: 'foo',
      bar: {
        bum: 'bum',
        // arr: [ 1, 2],
        arr: [{ foo: 'foo' }, { bar: 'bar' }],
      },
      baz: 'baz',
    };

    const obj4 = {
      foo: 'foo',
      bar: {
        bum: 'bum',
        // arr: [ 1, 3],
        arr: [{ foo: 'foo' }, { bar: 'different' }],
      },
      baz: 'baz',
    };

    const result = allValuesMatch(obj3, obj4, { includeArrays: true });

    expect(result).toBe(false);
  });

  it('should exclude keys', () => {
    const obj3 = {
      foo: 'foo',
      bar: {
        bum: 'bum',
        // arr: [ 1, 2],
        arr: [{ foo: 'foo' }, { bar: 'bar' }],
      },
      baz: 'baz',
    };

    const obj4 = {
      foo: 'foo',
      bar: {
        bum: 'bum',
        // arr: [ 1, 3],
        arr: [{ foo: 'foo' }, { bar: 'different' }],
      },
      baz: 'boo',
    };

    const config: IAllValuesMatchConfig = {
      includeArrays: true,
      excludeKeys: ['arr', 'baz'],
    };

    const result = allValuesMatch(obj3, obj4, config);

    expect(result).toBe(true);
  });
});
