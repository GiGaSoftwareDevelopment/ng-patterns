/**
 * @license
 * Copyright UIUX Engineering All Rights Reserved.
 */

import { allValuesTruthy } from './allValuesTruthy';

describe('allPropsAreTruthy', () => {
  beforeEach(() => {});

  afterEach(() => {});

  describe('object with multiple props', () => {
    it('should return true for valid keys', () => {
      const obj: any = {
        foo: 'foo',
        bar: ['bar'],
        baz: { foo: 'foo' },
        bum: true,
      };
      expect(allValuesTruthy(obj)).toBeTruthy();
    });

    it('should return false for object with false prop', () => {
      const obj: any = {
        foo: true,
        bar: false,
      };
      expect(allValuesTruthy(obj)).toBeFalsy();
    });

    it('should return true for object with truthy prop', () => {
      const obj: any = {
        foo: true,
        bar: true,
      };
      expect(allValuesTruthy(obj)).toBeTruthy();
    });

    it('should return true for object with null prop', () => {
      const obj: any = {
        foo: true,
        bar: null,
      };
      expect(allValuesTruthy(obj)).toBeFalsy();
    });

    it('should return true for object with undefined prop', () => {
      const obj: any = {
        foo: true,
        bar: undefined,
      };
      expect(allValuesTruthy(obj)).toBeFalsy();
    });

    it('should return false for object with empty _array', () => {
      const obj: any = {
        foo: true,
        bar: [],
      };
      expect(allValuesTruthy(obj)).toBeFalsy();
    });

    it('should return true for object with filled _array and truthy prop', () => {
      const obj: any = {
        foo: true,
        bar: ['asdf'],
      };
      expect(allValuesTruthy(obj)).toBeTruthy();
    });

    it('should return false for object with empty string', () => {
      const obj: any = {
        foo: true,
        bar: '',
      };
      expect(allValuesTruthy(obj)).toBeFalsy();
    });

    it('should return false for object with empty _array', () => {
      const obj: any = {
        foo: true,
        bar: 'asdf',
      };
      expect(allValuesTruthy(obj)).toBeTruthy();
    });

    it('should return true for all props defined and truthy prop', () => {
      const obj: any = {
        foo: true,
        bar: 'asdf',
        baz: ['foo'],
        bum: { someKey: 'someValue' },
      };
      expect(allValuesTruthy(obj)).toBeTruthy();
    });

    it('should return true for all props defined and falsey prop', () => {
      const obj: any = {
        foo: false,
        bar: 'asdf',
        baz: ['foo'],
        bum: { someKey: 'someValue' },
      };
      expect(allValuesTruthy(obj)).toBeFalsy();
    });

    it('should return false for all props defined with empty string and _array', () => {
      const obj: any = {
        foo: true,
        bar: '',
        baz: [],
        bum: { someKey: 'someValue' },
      };
      expect(allValuesTruthy(obj)).toBeFalsy();
    });

    it('should return false for all props defined and empty object', () => {
      const obj: any = {
        foo: true,
        bar: 'asdf',
        baz: ['foo'],
        bum: {},
      };
      expect(allValuesTruthy(obj)).toBeFalsy();
    });

    it('should return false for null prop', () => {
      const obj: any = {
        foo: true,
        bar: 'asdf',
        baz: ['foo'],
        bum: null,
      };
      expect(allValuesTruthy(obj)).toBeFalsy();
    });

    it('should return false for undefined prop', () => {
      const obj: any = {
        foo: true,
        bar: 'asdf',
        baz: ['foo'],
        bum: undefined,
      };
      expect(allValuesTruthy(obj)).toBeFalsy();
    });
  });

  describe('object', () => {
    it('should return false for empty object value', () => {
      expect(allValuesTruthy({})).toBeFalsy();
    });

    it('should return false for empty object with no keys', () => {
      expect(allValuesTruthy({})).toBeFalsy();
    });

    it('should return false for empty object with keys', () => {
      expect(allValuesTruthy({})).toBeFalsy();
    });

    it('should return false for object with falsey prop', () => {
      const obj: any = {
        foo: false,
      };
      expect(allValuesTruthy(obj)).toBeFalsy();
    });

    it('should return true for object with truthy prop', () => {
      const obj: any = {
        foo: true,
      };
      expect(allValuesTruthy(obj)).toBeTruthy();
    });
  });

  describe('empty value', () => {
    it('should return false for empty object value', () => {
      expect(allValuesTruthy({})).toBeFalsy();
    });

    it('should return false for null value', () => {
      expect(allValuesTruthy(null)).toBeFalsy();
    });

    it('should return false for undefined value', () => {
      expect(allValuesTruthy(undefined)).toBeFalsy();
    });

    it('should return false for empty string value', () => {
      expect(allValuesTruthy('')).toBeFalsy();
    });

    it('should return false for empty string value', () => {
      expect(allValuesTruthy([])).toBeFalsy();
    });
  });
});
