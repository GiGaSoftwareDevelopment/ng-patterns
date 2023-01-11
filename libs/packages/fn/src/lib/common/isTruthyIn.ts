/**
 * @license
 * Copyright UIUX Engineering All Rights Reserved.
 */

import {get, hasIn} from '../lodash';
import {isTruthy} from './isTruthy';

/**
 * Returns whether or not the nested property is defined. Keys may be an
 * _array, or a dot-delimited string of properties.
 *
 * @param object
 * @param keys
 *boolean
 */
export function isTruthyIn(object: any, keys: string | string[]): boolean {
  if (hasIn(object, keys)) {
    const value: any = get(object, keys);
    return isTruthy(value);
  }

  return false;
}
