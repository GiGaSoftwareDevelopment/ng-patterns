/**
 * @license
 * Copyright UIUX Engineering All Rights Reserved.
 */

import { hasIn } from 'lodash';
import { get } from 'lodash';
import { hasValue } from './hasValue';

/**
 * Returns whether or not the nested property is defined. Keys may be an
 * _array, or a dot-delimited string of properties.
 *
 * @param object
 * @param keys
 */
export function hasValueIn(object: any, keys: string | string[]): boolean {
  if (hasIn(object, keys)) {
    const value: any = get(object, keys);
    return hasValue(value);
  }

  return false;
}
