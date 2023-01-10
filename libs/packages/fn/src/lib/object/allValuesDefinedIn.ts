/**
 * @license
 * Copyright UIUX Engineering All Rights Reserved.
 */

import hasIn from '../lodash/hasIn';
import get from '../lodash/get';
import {allValuesDefined} from './allValuesDefined';

/**
 * Returns whether or not the nested property is defined. Keys may be an
 * _array, or a dot-delimited string of properties.
 */
export function allValuesDefinedIn(
  object: any,
  keys: string | string[]
): boolean {
  if (hasIn(object, keys)) {
    const value: any = get(object, keys);
    return allValuesDefined(value);
  }

  return false;
}
