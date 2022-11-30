/**
 * @license
 * Copyright UIUX Engineering All Rights Reserved.
 */

import { splitKeysIntoDotNotation, isArraySyntax, keySplitterIntoImmutablePath } from './keyConverter';

describe('_internal', () => {
  describe('splitKeysIntoDotNotation', () => {
    it('should split keys into dot notation', () => {
      expect(splitKeysIntoDotNotation('[0][1][3].bar[10][0].FOO[100].bum')).toBe(
        '[0].[1].[3].bar.[10].[0].FOO.[100].bum'
      );
    });
  });

  describe('isArraySyntax', () => {
    it('should test if _array syntax true', () => {
      expect(isArraySyntax('[0]')).toBeTruthy();
    });

    it('should test if _array syntax true', () => {
      expect(isArraySyntax('[10]')).toBeTruthy();
    });

    it('should test if _array syntax false', () => {
      expect(isArraySyntax('foo[0]')).toBeFalsy();
    });

    it('should test if _array syntax false', () => {
      expect(isArraySyntax('[0]foo')).toBeFalsy();
    });

    it('should test if _array syntax false', () => {
      expect(isArraySyntax('[foo]')).toBeFalsy();
    });

    it('should test if _array syntax false', () => {
      expect(isArraySyntax('[-1]')).toBeFalsy();
    });
  });

  describe('keySplitterIntoImmutablePath', () => {
    it('should return number in _array', () => {
      const r: any[] = keySplitterIntoImmutablePath('[3]');
      expect(r).toEqual([3]);
    });

    it('should return string in _array', () => {
      const r: any[] = keySplitterIntoImmutablePath('bum');
      expect(r).toEqual(['bum']);
    });

    it('should create immutable.js path', () => {
      const r: any[] = keySplitterIntoImmutablePath('[0][1][3].bar[10][0].FOO[100].bum');
      expect(r).toEqual([0, 1, 3, 'bar', 10, 0, 'FOO', 100, 'bum']);
    });

    it('should create immutable.js path', () => {
      const r: any[] = keySplitterIntoImmutablePath([0, 1, 3, 'bar', 10, 0, 'FOO', 100, 'bum']);
      expect(r).toEqual([0, 1, 3, 'bar', 10, 0, 'FOO', 100, 'bum']);
    });
  });
});
