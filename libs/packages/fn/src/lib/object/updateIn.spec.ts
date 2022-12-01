/**
 * @license
 * Copyright UIUX Engineering All Rights Reserved.
 */

import {updateIn} from './updateIn';

describe('Hoops', () => {
  let object: any | null;

  beforeEach(() => {
    object = {
      foo: {
        bar: {
          baz: 'test'
        },
        baz: [
          {
            bum: 'test2'
          }
        ]
      }
    };
  });

  afterEach(() => {
    object = null;
  });

  describe('updateIn', function () {
    it('updates the value at the given key if it exists', function () {
      const res = updateIn(object, ['foo', 'bar'], 'updateInTest');
      expect(res).toEqual(object);
      expect(object.foo.bar).toEqual('updateInTest');
    });

    it('returns the object if the key does not exist', function () {
      const res = updateIn(object, ['foo', 'invalid'], 'updateInTest');
      expect(res).toEqual(object);
    });

    it('accepts dot delimited strings for keys', function () {
      const res = updateIn(object, 'foo.bar', 'updateInTest');
      expect(res).toEqual(object);
      expect(object.foo.bar).toEqual('updateInTest');
    });

    it('returns false for null object', function () {
      const object2: any = null;
      expect(updateIn(object2, 'foo.bar', 'updateInTest')).toEqual(object2);
    });

    it('returns false for undefined object', function () {
      const object2: any = undefined;
      expect(updateIn(object2, 'foo.bar', 'updateInTest')).toEqual(object2);
    });

    describe('arrays', () => {
      it('drill into _array', () => {
        const res = updateIn(object, 'foo.baz[0].bum', 'updateInTest');
        expect(res).toEqual(object);
        expect(object.foo.baz[0].bum).toEqual('updateInTest');
      });

      it('returns the object if the key does not exist', () => {
        const res = updateIn(object, 'foo.bum[0].bar', 'updateInTest');
        expect(res).toEqual(object);
      });
    });
  });
});
