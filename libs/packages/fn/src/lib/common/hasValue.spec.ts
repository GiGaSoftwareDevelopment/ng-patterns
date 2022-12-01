/**
 * @license
 * Copyright UIUX Engineering All Rights Reserved.
 */

import {hasValue} from './hasValue';

describe('HasValue', () => {
  it('should determine data has value', () => {
    const value = new Date();
    expect(hasValue(value)).toBeTruthy();
  });

  it('should pass with string with spaces', () => {
    const value = '   ';
    expect(hasValue(value)).toBe(true);
  });

  it('should pass with number greather than 0', () => {
    const value = 1;
    expect(hasValue(value)).toBeTruthy();
  });

  it('should pass with number 0', () => {
    const value = 0;
    expect(hasValue(value)).toBeTruthy();
  });

  it('should fail with empty _array', () => {
    const value: any[] = [];
    expect(hasValue(value)).toBeFalsy();
  });

  it('should pass with filled _array', () => {
    const value: any[] = [1, 2, 'foo'];
    expect(hasValue(value)).toBeTruthy();
  });

  it('should fail with empty object', () => {
    const value: any = {};
    expect(hasValue(value)).toBeFalsy();
  });

  it('should pass with object that has properties', () => {
    const value: any = {foo: 'bar'};
    expect(hasValue(value)).toBeTruthy();
  });

  // checking for value, not truthy of value
  it('should pass with false boolean', () => {
    const value = false;
    expect(hasValue(value)).toBeTruthy();
  });

  it('should pass with true boolean', () => {
    const value = true;
    expect(hasValue(value)).toBeTruthy();
  });

  it('should fail with empty string', () => {
    const value = '';
    expect(hasValue(value)).toBeFalsy();
  });

  it('should pass with string', () => {
    const value = 'foo';
    expect(hasValue(value)).toBeTruthy();
  });

  it('should fail with undefined', () => {
    const value: any = undefined;
    expect(hasValue(value)).toBeFalsy();
  });

  it('should fail with null', () => {
    const value: any = null;
    expect(hasValue(value)).toBeFalsy();
  });
});
