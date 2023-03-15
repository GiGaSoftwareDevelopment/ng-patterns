/**
 * @license
 * Copyright NGPAT Engineering All Rights Reserved.
 */

import {isScalar} from './isScalar';

describe('isScalar', () => {
  it('object', () => {
    expect(isScalar({})).toBeFalsy();
  });

  it('string', () => {
    expect(isScalar('')).toBeTruthy();
  });

  it('null', () => {
    expect(isScalar(null)).toBeTruthy();
  });

  it('undefined', () => {
    expect(isScalar(undefined)).toBeTruthy();
  });

  it('boolean', () => {
    expect(isScalar(true)).toBeTruthy();
    expect(isScalar(false)).toBeTruthy();
  });

  it('array', () => {
    expect(isScalar([])).toBeTruthy();
  });

  it('number', () => {
    expect(isScalar(0)).toBeTruthy();
  });
  it('function', () => {
    expect(isScalar(() => {})).toBeFalsy();
  });
});
