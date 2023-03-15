/**
 * @license
 * Copyright NGPAT Engineering All Rights Reserved.
 */

import {mergeWithoutArray} from './mergeWithoutArray';

describe('merge', () => {
  beforeEach(() => {});

  afterEach(() => {});

  it('should replace target _array with src _array', () => {
    const target: any = {
      foo: true,
      bar: false,
      baz: ['one', 'two', 'three']
    };

    const source: any = {
      foo: true,
      bar: true,
      baz: ['four', 'five', 'six']
    };

    const result: any = mergeWithoutArray(target, source);

    expect(result.baz).toEqual(source.baz);
  });

  it('should be recursive', () => {
    const target: any = {
      foo: true,
      bar: false,
      baz: ['one', 'two', 'three'],
      bum: {
        foo: true,
        bar: false,
        baz: ['one', 'two', 'three']
      }
    };

    const source: any = {
      foo: true,
      bar: true,
      baz: ['four', 'five', 'six'],
      bum: {
        foo: true,
        bar: true,
        baz: ['four', 'five', 'six']
      }
    };

    const result: any = mergeWithoutArray(target, source);

    expect(result.foo).toBeTruthy();
    expect(result.bar).toBeTruthy();
    expect(result.baz).toEqual(source.baz);

    expect(result.bum.foo).toBeTruthy();
    expect(result.bum.bar).toBeTruthy();
    expect(result.bum.baz).toEqual(source.bum.baz);

    expect(result.bum.baz).not.toEqual(target.bum.baz);
  });

  it('should update boolean true', () => {
    const obj1: any = {
      foo: true,
      bar: false
    };

    const obj2: any = {
      foo: true,
      bar: true
    };

    expect(mergeWithoutArray(obj1, obj2).foo).toBeTruthy();
    expect(mergeWithoutArray(obj1, obj2).bar).toBeTruthy();
  });

  it('should update boolean false', () => {
    const obj1: any = {
      foo: true,
      bar: false
    };

    const obj2: any = {
      foo: false,
      bar: false
    };

    expect(mergeWithoutArray(obj1, obj2).foo).toBeFalsy();
    expect(mergeWithoutArray(obj1, obj2).bar).toBeFalsy();
  });

  it('should update partial boolean', () => {
    const obj1: any = {
      foo: true
    };

    const obj2: any = {
      foo: false
    };

    expect(mergeWithoutArray(obj1, obj2).foo).toBeFalsy();
    expect(mergeWithoutArray(obj1, obj2).bar).toBeUndefined();
  });
});
