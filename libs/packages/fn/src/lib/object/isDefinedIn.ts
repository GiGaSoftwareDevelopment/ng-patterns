/**
 * @license
 * Copyright UIUX Engineering All Rights Reserved.
 */

import get from '../lodash/get';
import hasIn from '../lodash/hasIn';
import {isDefined} from '../common/isDefined';

/**
 * Returns whether or not the nested property is defined. Keys may be an
 * _array, or a dot-delimited string of properties.
 *
 * @param object
 * @param string | string[]
 * @returns boolean
 */
export function isDefinedIn(object: any, keys: string | string[]): boolean {
  if (hasIn(object, keys)) {
    const value: any = get(object, keys);
    return isDefined(value);
  }

  return false;
}
