/**
 * @license
 * Copyright UIUX Engineering All Rights Reserved.
 */

import { isDefinedIn } from './isDefinedIn';

describe('Object', () => {
  let object: any | null;

  beforeEach(() => {
    object = {
      foo: {
        bar: {
          baz: 'test',
          bazNot: '',
          bazNull: null,
          bazUndefined: undefined,
          bum: ['foo'],
          bumNot: [],
          boo: true,
          booNot: false,
          bee: { foo: 'bar' },
          beeNot: {},
        },
        baz: () => {
          /* noop */
        },
      },
    };
  });

  afterEach(() => {
    object = null;
  });

  describe('isDefinedIn', function() {
    it('returns false null value', function() {
      expect(isDefinedIn(object, 'foo.bar.bazNull')).toBe(false);
    });

    it('returns false undefined value', function() {
      expect(isDefinedIn(object, 'foo.bar.bazUndefined')).toBe(false);
    });

    it('returns false when evaluating path through functions', function() {
      expect(isDefinedIn(object, 'foo.baz.bum')).toBe(false);
    });

    it('returns true with filled string', function() {
      expect(isDefinedIn(object, 'foo.bar.baz')).toBe(true);
    });

    it('returns true with empty string', function() {
      expect(isDefinedIn(object, 'foo.bar.bazNot')).toBe(true);
    });

    it('returns true with filled _array', function() {
      expect(isDefinedIn(object, 'foo.bar.bum')).toBe(true);
    });

    it('returns true with empty _array', function() {
      expect(isDefinedIn(object, 'foo.bar.bumNot')).toBe(true);
    });

    it('returns true with true boolean', function() {
      expect(isDefinedIn(object, 'foo.bar.boo')).toBe(true);
    });

    it('returns true with false boolean', function() {
      expect(isDefinedIn(object, 'foo.bar.booNot')).toBe(true);
    });

    it('returns false for null object', function() {
      expect(isDefinedIn(null, 'foo.bar.booNot')).toBe(false);
    });

    it('returns false for undefined object', function() {
      expect(isDefinedIn(undefined, 'foo.bar.booNot')).toBe(false);
    });

    it('returns true with true with object that has props', function() {
      expect(isDefinedIn(object, 'foo.bar.bee')).toBe(true);
    });

    it('returns true with object with no props', function() {
      expect(isDefinedIn(object, 'foo.bar.beeNot')).toBe(true);
    });

    it('returns false for null object', function() {
      const object2: any = null;
      expect(isDefinedIn(object2, 'foo.bar')).toEqual(false);
    });

    it('returns false for undefined object', function() {
      const object2: any = undefined;
      expect(isDefinedIn(object2, 'foo.bar')).toEqual(false);
    });

    describe('arrays', () => {
      let objectWithArray: any;

      beforeEach(() => {
        objectWithArray = {
          a: {
            b: {
              c: [
                {
                  // <-- _array 'a.b.c.[0]'
                  d: {
                    // <-- _array 'a.b.c.[0].d'
                    e: 'foo', // <-- _array 'a.b.c.[0].d.e'
                  },
                },
                {
                  // <-- _array 'a.b.c.[1]'
                  g: {
                    // <-- _array 'a.b.c.[1].g'
                    h: 'bar', // <-- _array 'a.b.c.[1].d.h'
                  },
                },
                [
                  {
                    // <-- _array 'a.b.c.[2][0]'
                    k: {
                      l: 'baz',
                    },
                  },
                ],
              ],
            },
            i: {
              j: 'baz',
            },
          },
        };
      });

      afterEach(() => {
        objectWithArray = null;
      });

      it('should get in _array', function() {
        expect(isDefinedIn(objectWithArray, 'a.b.c[0].d.e')).toEqual(true);
      });

      it('should not accept non-integer index', function() {
        expect(isDefinedIn(objectWithArray, 'a.b.c[foo]')).toEqual(false);
      });

      it('should not accept string as index', function() {
        expect(isDefinedIn(objectWithArray, 'a.b.c[foo].d.e')).toEqual(false);
      });

      it('should evaluate _array as false if index value does not exist', function() {
        expect(isDefinedIn(objectWithArray, 'a.b.c[3]')).toEqual(false);
      });

      it('should not accept a non-integer  notation to evaluate an _array', function() {
        expect(isDefinedIn(objectWithArray, 'a.b.c.d.e')).toEqual(false);
      });

      it('should not accept a non-integer index notation to evaluate an _array', function() {
        // prettier-ignore
        expect(isDefinedIn(objectWithArray, 'a.b.c[\'foo\']')).toEqual(false);
      });

      it('should not accept a non-integer index notation to evaluate an _array', function() {
        expect(isDefinedIn(objectWithArray, 'a.b.c[d].d.e')).toEqual(false);
      });

      it('should drill into sub _array', function() {
        expect(isDefinedIn(objectWithArray, 'a.b.c[2][0].k.l')).toEqual(true);
      });

      it('should evaluate second index as true', function() {
        expect(isDefinedIn(objectWithArray, 'a.b.c[1]')).toEqual(true);
      });

      it('should evaluate _array as true', function() {
        expect(isDefinedIn(objectWithArray, 'a.b.c[0]')).toEqual(true);
      });
    });
  });
});
