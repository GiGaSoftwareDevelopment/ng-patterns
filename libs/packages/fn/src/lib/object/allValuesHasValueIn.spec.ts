/**
 * @license
 * Copyright NGPAT Engineering All Rights Reserved.
 */
import {allValuesHasValueIn} from './allValuesHasValueIn';

describe('Hoops', () => {
  let object: any | null;
  let object2: any | null;

  beforeEach(() => {
    object = {
      foo: {
        bar: {
          baz: 'test',
          bum: ['foo'],
          boo: true,
          bee: {foo: 'bar'}
        },
        baz: {
          bazNot: '',
          bumNot: [],
          booNot: false,
          beeNot: {}
        }
      }
    };

    object2 = {
      foo: {
        bar: {
          baz1: {
            one: 1,
            bum: 'foo'
          },
          baz2: {
            one: 0,
            bum: 'foo'
          },
          baz3: {
            one: '1',
            bum: 'foo'
          },
          baz4: {
            one: '0',
            bum: 'foo'
          }
        }
      }
    };
  });

  afterEach(() => {
    object = null;
    object2 = null;
  });

  describe('allValuesHasValueIn', function () {
    it('returns true', function () {
      expect(allValuesHasValueIn(object, 'foo.bar')).toBeTruthy();
    });

    it('returns false', function () {
      expect(allValuesHasValueIn(object, 'foo.baz')).toBeFalsy();
    });

    it('returns true with number 1', function () {
      expect(allValuesHasValueIn(object2, 'foo.bar.baz1')).toBeTruthy();
    });

    it('returns true with number 0', function () {
      expect(allValuesHasValueIn(object2, 'foo.bar.baz2')).toBeTruthy();
    });

    it('returns true with string 1', function () {
      expect(allValuesHasValueIn(object2, 'foo.bar.baz3')).toBeTruthy();
    });

    it('returns true with string 0', function () {
      expect(allValuesHasValueIn(object2, 'foo.bar.baz4')).toBeTruthy();
    });

    it('returns false for null object', function () {
      const object3: any = null;
      expect(allValuesHasValueIn(object3, 'foo.bar')).toEqual(false);
    });

    it('returns false for undefined object', function () {
      const object4: any = undefined;
      expect(allValuesHasValueIn(object4, 'foo.bar')).toEqual(false);
    });
  });
});
