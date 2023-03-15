/**
 * @license
 * Copyright NGPAT Engineering All Rights Reserved.
 */
import {hasValue} from './hasValue';

export function hasValueEqual(targetValue: any, srcValue: any): boolean {
  if (hasValue(srcValue)) {
    return targetValue === srcValue;
  } else {
    return false;
  }
}
