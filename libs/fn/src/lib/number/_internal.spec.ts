/**
 * @license
 * Copyright UIUX Engineering All Rights Reserved.
 */

import { isNumber } from 'lodash';
import { convertToNumber } from './_internal';

describe('convertToNumber', () => {
  it('should create', () => {
    expect(isNumber(convertToNumber('-1'))).toBeTruthy();
  });

  it('should create', () => {
    expect(isNumber(convertToNumber('1'))).toBeTruthy();
  });
});
