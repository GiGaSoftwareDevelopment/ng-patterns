/**
 * @license
 * Copyright UIUX Engineering All Rights Reserved.
 */

import {hasValueIn} from './hasValueIn';

describe('Object', () => {
  let object: any | null;

  beforeEach(() => {
    object = {
      foo: {
        bar: {
          baz: 'test',
          bazNot: '',
          bum: ['foo'],
          bumNot: [],
          boo: true,
          booNot: false,
          bee: {foo: 'bar'},
          beeNot: {}
        },
        baz: () => {
          /* noop */
        }
      }
    };
  });

  afterEach(() => {
    object = null;
  });

  describe('hasValueIn', function () {
    it('returns false when evaluating path through functions', function () {
      expect(hasValueIn(object, 'foo.baz.bum')).toBeFalsy();
    });

    it('returns true with filled string', function () {
      expect(hasValueIn(object, 'foo.bar.baz')).toBeTruthy();
    });

    it('returns false with empty string', function () {
      expect(hasValueIn(object, 'foo.bar.bazNot')).toBeFalsy();
    });

    it('returns true with filled _array', function () {
      expect(hasValueIn(object, 'foo.bar.bum')).toBeTruthy();
    });

    it('returns false with empty _array', function () {
      expect(hasValueIn(object, 'foo.bar.bumNot')).toBeFalsy();
    });

    it('returns true with true boolean', function () {
      expect(hasValueIn(object, 'foo.bar.boo')).toBeTruthy();
    });

    it('returns true with false boolean', function () {
      expect(hasValueIn(object, 'foo.bar.booNot')).toBeTruthy();
    });

    it('returns false for null object', function () {
      expect(hasValueIn(null, 'foo.bar.booNot')).toBeFalsy();
    });

    it('returns false for undefined object', function () {
      expect(hasValueIn(undefined, 'foo.bar.booNot')).toBeFalsy();
    });

    it('returns true with true with object that has props', function () {
      expect(hasValueIn(object, 'foo.bar.bee')).toBeTruthy();
    });

    it('returns false with false with object with no props', function () {
      expect(hasValueIn(object, 'foo.bar.beeNot')).toBeFalsy();
    });

    it('returns true for function', function () {
      expect(hasValueIn(object, 'foo.baz')).toEqual(true);
    });

    it('returns false for null object', function () {
      const object2: any = null;
      expect(hasValueIn(object2, 'foo.bar')).toEqual(false);
    });

    it('returns false for undefined object', function () {
      const object2: any = undefined;
      expect(hasValueIn(object2, 'foo.bar')).toEqual(false);
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
                    e: 'foo' // <-- _array 'a.b.c.[0].d.e'
                  }
                },
                {
                  // <-- _array 'a.b.c.[1]'
                  g: {
                    // <-- _array 'a.b.c.[1].g'
                    h: 'bar' // <-- _array 'a.b.c.[1].d.h'
                  }
                },
                [
                  {
                    // <-- _array 'a.b.c.[2][0]'
                    k: {
                      l: 'baz'
                    }
                  }
                ]
              ]
            },
            i: {
              j: 'baz'
            }
          }
        };
      });

      afterEach(() => {
        objectWithArray = null;
      });

      it('should get in _array', function () {
        expect(hasValueIn(objectWithArray, 'a.b.c[0].d.e')).toEqual(true);
      });

      it('should not accept non-integer index', function () {
        expect(hasValueIn(objectWithArray, 'a.b.c[foo]')).toEqual(false);
      });

      it('should not accept string as index', function () {
        expect(hasValueIn(objectWithArray, 'a.b.c[foo].d.e')).toEqual(false);
      });

      it('should evaluate _array as false if index value does not exist', function () {
        expect(hasValueIn(objectWithArray, 'a.b.c[3]')).toEqual(false);
      });

      it('should not accept a non-integer  notation to evaluate an _array', function () {
        expect(hasValueIn(objectWithArray, 'a.b.c.d.e')).toEqual(false);
      });

      it('should not accept a non-integer index notation to evaluate an _array', function () {
        // prettier-ignore
        expect(hasValueIn(objectWithArray, 'a.b.c[\'foo\']')).toEqual(false);
      });

      it('should not accept a non-integer index notation to evaluate an _array', function () {
        expect(hasValueIn(objectWithArray, 'a.b.c[d].d.e')).toEqual(false);
      });

      it('should drill into sub _array', function () {
        expect(hasValueIn(objectWithArray, 'a.b.c[2][0].k.l')).toEqual(true);
      });

      it('should evaluate second index as true', function () {
        expect(hasValueIn(objectWithArray, 'a.b.c[1]')).toEqual(true);
      });

      it('should evaluate _array as true', function () {
        expect(hasValueIn(objectWithArray, 'a.b.c[0]')).toEqual(true);
      });
    });
  });
});
