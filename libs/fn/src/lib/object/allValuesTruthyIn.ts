/**
 * @license
 * Copyright UIUX Engineering All Rights Reserved.
 */

import { hasIn } from 'lodash';
import { get } from 'lodash';
import { allValuesTruthy } from './allValuesTruthy';

/**
 * @param object to evaluate
 * @param keys path to value such as a.b.c[2].d
 */
export function allValuesTruthyIn(object: any, keys: string | string[]): boolean {
  if (hasIn(object, keys)) {
    const value: any = get(object, keys);
    return allValuesTruthy(value);
  }

  return false;
}
