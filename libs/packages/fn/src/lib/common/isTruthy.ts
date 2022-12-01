/**
 * @license
 * Copyright UIUX Engineering All Rights Reserved.
 */

import {trim, isNumber, isString, isFunction, isEmpty, isBoolean} from 'lodash';
import {hasValue} from './hasValue';

export function isTruthy(value: any): boolean {
  if (hasValue(value)) {
    // Testing for Truthy
    if (isString(value)) {
      return value === '0'
        ? Boolean(parseInt(value, 10))
        : !isEmpty(trim(value));
    } else if (isNumber(value)) {
      return Boolean(value); // true for all numbers
    } else if (isBoolean(value)) {
      // Testing for value, not truthy
      return value;
    } else if (isFunction(value)) {
      return true;
    } else {
      return !isEmpty(value);
    }
  }

  return false;
}
