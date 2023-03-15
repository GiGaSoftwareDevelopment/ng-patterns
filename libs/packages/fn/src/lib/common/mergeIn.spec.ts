/**
 * @license
 * Copyright NGPAT Engineering All Rights Reserved.
 */

import {mergeWithoutArray} from './mergeWithoutArray';
import {mergeIn} from './mergeIn';

describe('mergeIn', () => {
  describe('works like mergeIn', () => {
    it('should merge nested', () => {
      const o1: any = {
        a: 'a',
        b: {
          c: {
            d: 'd'
          }
        },
        e: 'e'
      };

      const o2: any = {
        f: 'f'
      };

      const result = mergeIn(o1, 'b.c', o2);

      expect(o1.b.c.f).toBeUndefined();
      expect(result.b.c.f).toEqual('f');
    });

    it('should merge second tier', () => {
      const o1: any = {
        a: 'a',
        b: {
          c: {
            d: 'd'
          }
        },
        e: 'e'
      };

      const o2: any = {
        f: 'f'
      };

      const result = mergeIn(o1, 'b', o2);

      expect(o1.b.f).toBeUndefined();
      expect(result.b.f).toEqual('f');
      expect(result.b.c.d).toEqual('d');
    });
  });

  describe('works like merge', () => {
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

      const result: any = mergeIn(target, '', source);

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

      expect(mergeIn(obj1, '', obj2).foo).toBeTruthy();
      expect(mergeIn(obj1, '', obj2).bar).toBeTruthy();
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

      expect(mergeIn(obj1, '', obj2).foo).toBeFalsy();
      expect(mergeIn(obj1, '', obj2).bar).toBeFalsy();
    });

    it('should update partial boolean', () => {
      const obj1: any = {
        foo: true
      };

      const obj2: any = {
        foo: false
      };

      expect(mergeIn(obj1, '', obj2).foo).toBeFalsy();
      expect(mergeIn(obj1, '', obj2).bar).toBeUndefined();
    });
  });
});
