/**
 * @license
 * Copyright NGPAT Engineering All Rights Reserved.
 */
import {
  isBoolean,
  isDate,
  isEmpty,
  isFunction,
  isNumber,
  isString
} from '../lodash';

export function hasValue(value: any): boolean {
  if (isDate(value)) {
    return value.toJSON().length > 0;
  } else if (isString(value)) {
    return !isEmpty(value);
  } else if (isNumber(value)) {
    return true; // true for all numbers
  } else if (isBoolean(value)) {
    // Testing for value, not truthy
    return true;
  } else if (isFunction(value)) {
    // Testing for value, not truthy
    return true;
  } else {
    return !isEmpty(value);
  }
}
