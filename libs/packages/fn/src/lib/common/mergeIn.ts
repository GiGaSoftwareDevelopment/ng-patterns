/**
 * @license
 * Copyright UIUX Engineering All Rights Reserved.
 */

import {hasValue} from './hasValue';
import {cloneDeep, get} from '../lodash';
import {mergeWithoutArray} from './mergeWithoutArray';
import {set} from '../lodash';

export function mergeIn(object: any, keys: string | string[], value: any): any {
  if (!hasValue(keys)) {
    return mergeWithoutArray(cloneDeep(object), value);
  } else {
    const originalValue: any = get(object, keys);
    const newValue: any = mergeWithoutArray(originalValue, value);
    return set(cloneDeep(object), keys, newValue);
  }
}
