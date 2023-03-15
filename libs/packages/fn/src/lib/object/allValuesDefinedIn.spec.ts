/**
 * @license
 * Copyright NGPAT Engineering All Rights Reserved.
 */

import {allValuesDefinedIn} from './allValuesDefinedIn';

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
        },
        bum: {
          bazNot: '',
          bumNot: [],
          booNot: null,
          beeNot: {}
        },
        bear: {
          bazNot: '',
          bumNot: [],
          booNot: undefined,
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

  describe('allPropsAreDefinedIn', function () {
    it('returns false if a prop is null', function () {
      expect(allValuesDefinedIn(object, 'foo.bum')).toBe(false);
    });

    it('returns false if a prop is undefined', function () {
      expect(allValuesDefinedIn(object, 'foo.bear')).toBe(false);
    });

    it('returns true', function () {
      expect(allValuesDefinedIn(object, 'foo.bar')).toBe(true);
    });

    it('returns true', function () {
      expect(allValuesDefinedIn(object, 'foo.baz')).toBe(true);
    });

    it('returns true with number 1', function () {
      expect(allValuesDefinedIn(object2, 'foo.bar.baz1')).toBe(true);
    });

    it('returns true with number 0', function () {
      expect(allValuesDefinedIn(object2, 'foo.bar.baz2')).toBe(true);
    });

    it('returns true with string 1', function () {
      expect(allValuesDefinedIn(object2, 'foo.bar.baz3')).toBe(true);
    });

    it('returns true with string 0', function () {
      expect(allValuesDefinedIn(object2, 'foo.bar.baz4')).toBe(true);
    });

    it('returns false for null object', function () {
      const object3: any = null;
      expect(allValuesDefinedIn(object3, 'foo.bar')).toEqual(false);
    });

    it('returns false for undefined object', function () {
      const object4: any = undefined;
      expect(allValuesDefinedIn(object4, 'foo.bar')).toEqual(false);
    });
  });
});
