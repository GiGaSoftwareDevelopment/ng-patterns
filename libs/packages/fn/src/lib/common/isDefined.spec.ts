/**
 * @license
 * Copyright UIUX Engineering All Rights Reserved.
 */

import {isDefined} from './isDefined';

describe('isDefined', () => {
  it('should fail with undefined', () => {
    const value: any = undefined;
    expect(isDefined(value)).toBe(false);
  });

  it('should fail with null', () => {
    const value: any = null;
    expect(isDefined(value)).toBe(false);
  });

  it('should determine data is defined', () => {
    const value = new PackagesDate();
    expect(isDefined(value)).toBe(true);
  });

  it('should pass with string with spaces', () => {
    const value = '   ';
    expect(isDefined(value)).toBe(true);
  });

  it('should pass with number greather than 0', () => {
    const value = 1;
    expect(isDefined(value)).toBe(true);
  });

  it('should pass with number 0', () => {
    const value = 0;
    expect(isDefined(value)).toBe(true);
  });

  it('should pass with empty _array', () => {
    const value: any[] = [];
    expect(isDefined(value)).toBe(true);
  });

  it('should pass with filled _array', () => {
    const value: any[] = [1, 2, 'foo'];
    expect(isDefined(value)).toBe(true);
  });

  it('should pass with empty object', () => {
    const value: any = {};
    expect(isDefined(value)).toBe(true);
  });

  it('should pass with object that has properties', () => {
    const value: any = {foo: 'bar'};
    expect(isDefined(value)).toBe(true);
  });

  // checking for value, not truthy of value
  it('should pass with false boolean', () => {
    const value = false;
    expect(isDefined(value)).toBe(true);
  });

  it('should pass with true boolean', () => {
    const value = true;
    expect(isDefined(value)).toBe(true);
  });

  it('should pAA with empty string', () => {
    const value = '';
    expect(isDefined(value)).toBe(true);
  });

  it('should pass with string', () => {
    const value = 'foo';
    expect(isDefined(value)).toBe(true);
  });
});
