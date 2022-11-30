/**
 * @license
 * Copyright UIUX Engineering All Rights Reserved.
 */
import { hasValue } from './hasValue';

export function hasValueNotEqual(targetValue: any, srcValue: any): boolean {
  if (hasValue(srcValue)) {
    return targetValue !== srcValue;
  } else {
    return false;
  }
}
