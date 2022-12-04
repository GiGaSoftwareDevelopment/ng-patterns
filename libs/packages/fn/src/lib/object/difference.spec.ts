/**
 * @license
 * Copyright UIUX Engineering All Rights Reserved.
 */

import {differenceObject} from './differenceObject';

describe('difference', () => {
  it('should return empty object if properties are the same', () => {
    const obj1 = {
      foo: 'foo',
      bar: 'bar',
      baz: 'baz'
    };

    const obj2 = {
      foo: 'foo',
      bar: 'bar',
      baz: 'baz'
    };

    const result = differenceObject(obj1, obj2);

    expect(!!Object.keys(result).length).toBe(false);
  });

  it('should return differenceObject object if properties are not the same', () => {
    const obj3 = {
      foo: 'foo',
      bar: 'bar',
      baz: 'baz'
    };

    const obj4 = {
      foo: 'foo',
      bar: 'different',
      baz: 'baz'
    };

    const result = differenceObject(obj3, obj4);

    expect(!!Object.keys(result).length).toBe(false);
  });
});
