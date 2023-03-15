/**
 * @license
 * Copyright NGPAT Engineering All Rights Reserved.
 */

import {valuesWithKey} from './valuesWithKey';

describe('isObject', () => {
  let obj: any;

  beforeEach(() => {
    obj = {
      a001: {
        foo: 'bar'
      },
      a002: {
        foo: 'bar'
      },
      a003: {
        foo: 'bar'
      }
    };
  });

  afterEach(() => {
    obj = null;
  });

  it('should add named key to object and convert to _array', () => {
    const r: any[] = valuesWithKey(obj, 'guid');

    // order is not guarenteed
    expect(r[0]).toEqual({guid: 'a001', foo: 'bar'});
    expect(r[1]).toEqual({guid: 'a002', foo: 'bar'});
    expect(r[2]).toEqual({guid: 'a003', foo: 'bar'});
  });

  // it('should return _array without key if key is null', () => {
  //   const r: any[] = valuesWithKey.apply(null, [obj, null]);
  //
  //   // order is not guarenteed
  //   expect(r[0]).toEqual({ foo: 'bar' });
  //   expect(r[1]).toEqual({ foo: 'bar' });
  //   expect(r[2]).toEqual({ foo: 'bar' });
  // });
  //
  // it('should return _array without key if key is undefined', () => {
  //   const r: any[] = valuesWithKey.apply(null, [obj]);
  //
  //   // order is not guarenteed
  //   expect(r[0]).toEqual({ foo: 'bar' });
  //   expect(r[1]).toEqual({ foo: 'bar' });
  //   expect(r[2]).toEqual({ foo: 'bar' });
  // });
});
