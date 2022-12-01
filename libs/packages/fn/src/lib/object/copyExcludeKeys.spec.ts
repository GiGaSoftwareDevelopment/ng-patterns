/**
 * @license
 * Copyright UIUX Engineering All Rights Reserved.
 */

import {copyExcludeKeys} from './copyExcludeKeys';

describe('copyExcludeKeys', () => {
  it('should return object with keys excluded', () => {
    const obj1 = {
      foo: 'foo',
      bar: 'bar',
      baz: 'baz'
    };

    const obj2 = {
      foo: 'foo'
    };

    const result = copyExcludeKeys(obj1, ['bar', 'baz']);

    expect(result).toEqual(obj2);
  });

  it('should return object with keys excluded', () => {
    const obj1 = {
      foo: 'foo',
      bar: 'bar',
      baz: 'baz'
    };

    const result = copyExcludeKeys(obj1, []);

    expect(result).toEqual(obj1);
  });
});
