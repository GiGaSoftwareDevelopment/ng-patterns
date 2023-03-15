/**
 * @license
 * Copyright NGPAT Engineering All Rights Reserved.
 */

import {isArrayInteger} from './isArrayInteger';

describe('isInteger', () => {
  it('0 to be true', () => {
    expect(isArrayInteger(0)).toBeTruthy();
  });

  it('0 string to be true', () => {
    expect(isArrayInteger('0')).toBeTruthy();
  });

  it('positive to be true', () => {
    expect(isArrayInteger(10)).toBeTruthy();
  });

  it('positive string to be true', () => {
    expect(isArrayInteger('10')).toBeTruthy();
  });

  it('negative to be false', () => {
    expect(isArrayInteger(-10)).toBeFalsy();
  });

  it('negative to be false', () => {
    expect(isArrayInteger('-10')).toBeFalsy();
  });
});
