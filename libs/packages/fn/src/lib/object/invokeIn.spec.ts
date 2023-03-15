/**
 * @license
 * Copyright NGPAT Engineering All Rights Reserved.
 */

import {invokeIn} from './invokeIn';

describe('Hoops', () => {
  let object: any | null;

  beforeEach(() => {
    object = {foo: {bar: {baz: 'test'}}};
  });

  afterEach(() => {
    object = null;
  });

  describe('invokeIn', function () {
    let count: number;

    beforeEach(function () {
      count = 0;

      // Adding some nested methods
      const fn = function () {
        count++;
      };

      object.fn = fn;
      object.foo.fn = fn;
      object.foo.bar.fn = fn;
    });

    afterEach(function () {
      delete object.fn;
      delete object.foo.fn;
      delete object.foo.bar.fn;
    });

    it('invokes the function at the given key if it exists', function () {
      let i, res;

      const keys = [['fn'], ['foo', 'fn'], ['foo', 'bar', 'fn']];

      for (i = 0; i < keys.length; i++) {
        res = invokeIn(object, keys[i]);
        expect(count).toEqual(i + 1);
        expect(res).toEqual(object);
      }
    });

    it('returns the object if the key does not correspond to a fn', function () {
      const res = invokeIn(object, ['foo', 'bar']);
      expect(res).toEqual(object);
    });

    it('accepts a letiable number of arguments to pass to the fn', function () {
      let x;

      object.foo.bar.fn = function (y: number, z: number) {
        x = y + z;
      };

      const res = invokeIn(object, ['foo', 'bar', 'fn'], [10, 5]);
      expect(x).toEqual(15);
      expect(res).toEqual(object);
    });

    it('accepts dot delimited strings for keys', function () {
      let i, res;

      const keys = ['fn', 'foo.fn', 'foo.bar.fn'];

      for (i = 0; i < keys.length; i++) {
        res = invokeIn(object, keys[i]);
        expect(count).toEqual(i + 1);
        expect(res).toEqual(object);
      }
    });

    it('returns false for null object', function () {
      const object2: any = null;
      expect(invokeIn(object2, 'foo.bar')).toEqual(object2);
    });

    it('returns false for undefined object', function () {
      const object2: any = undefined;
      expect(invokeIn(object2, 'foo.bar')).toEqual(object2);
    });
  });
});
