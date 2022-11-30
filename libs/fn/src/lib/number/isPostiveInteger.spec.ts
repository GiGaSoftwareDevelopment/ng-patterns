/**
 * @license
 * Copyright UIUX Engineering All Rights Reserved.
 */

import { isPostiveInteger } from './isPostiveInteger';

describe('isInteger', () => {
  it('positive to be true', () => {
    expect(isPostiveInteger(10)).toBeTruthy();
  });

  it('positive string to be true', () => {
    expect(isPostiveInteger('10')).toBeTruthy();
  });

  it('negative to be false', () => {
    expect(isPostiveInteger(-10)).toBeFalsy();
  });

  it('negative to be false', () => {
    expect(isPostiveInteger('-10')).toBeFalsy();
  });
});
