/**
 * @license
 * Copyright NGPAT Engineering All Rights Reserved.
 */
import isString from '../lodash/isString';

export function convertToNumber(value: string | number): number {
  let _value: number;

  if (isString(value)) {
    _value = parseFloat(value.toString());
  } else {
    _value = Number(value);
  }

  return _value;
}
