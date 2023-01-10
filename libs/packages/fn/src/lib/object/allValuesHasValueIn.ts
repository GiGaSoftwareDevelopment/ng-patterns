/**
 * @license
 * Copyright UIUX Engineering All Rights Reserved.
 */

import get from '../lodash/get';
import hasIn from '../lodash/hasIn';
import {allValuesHasValue} from './allValuesHasValue';

/**
 * @param object to evaluate
 * @param keys path to value such as a.b.c[2].d
 */
export function allValuesHasValueIn(
  object: any,
  keys: string | string[]
): boolean {
  if (hasIn(object, keys)) {
    const value: any = get(object, keys);
    return allValuesHasValue(value);
  }

  return false;
}
