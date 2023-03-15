/**
 * @license
 * Copyright NGPAT Engineering All Rights Reserved.
 */

import {isTruthy} from './isTruthy';

// checking for value, not truthy of value
describe('isTruthy', () => {
  it('should fail with string with spaces', () => {
    const value = '   ';
    expect(isTruthy(value)).toBeFalsy();
  });

  it('should fail with false boolean', () => {
    const value = false;
    expect(isTruthy(value)).toBeFalsy();
  });

  it('should pass with true boolean', () => {
    const value = true;
    expect(isTruthy(value)).toBeTruthy();
  });

  it('should pass with number 1', () => {
    const value = 1;
    expect(isTruthy(value)).toBeTruthy();
  });

  it('should fail with number 0', () => {
    const value = 0;
    expect(isTruthy(value)).toBeFalsy();
  });

  it('should pass with string 1', () => {
    const value = '1';
    expect(isTruthy(value)).toBeTruthy();
  });

  it('should fail with string 0', () => {
    const value = '0';
    expect(isTruthy(value)).toBeFalsy();
  });

  it('should fail with empty _array', () => {
    const value: any[] = [];
    expect(isTruthy(value)).toBeFalsy();
  });

  it('should pass with filled _array', () => {
    const value: any[] = [1, 2, 'foo'];
    expect(isTruthy(value)).toBeTruthy();
  });

  it('should fail with empty object', () => {
    const value: any = {};
    expect(isTruthy(value)).toBeFalsy();
  });

  it('should pass with object that has properties', () => {
    const value: any = {foo: 'bar'};
    expect(isTruthy(value)).toBeTruthy();
  });

  it('should fail with empty string', () => {
    const value = '';
    expect(isTruthy(value)).toBeFalsy();
  });

  it('should pass with string', () => {
    const value = 'foo';
    expect(isTruthy(value)).toBeTruthy();
  });

  it('should fail with undefined', () => {
    const value: any = undefined;
    expect(isTruthy(value)).toBeFalsy();
  });

  it('should fail with null', () => {
    const value: any = null;
    expect(isTruthy(value)).toBeFalsy();
  });
});
