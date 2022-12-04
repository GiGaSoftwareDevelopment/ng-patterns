/**
 * @license
 * Copyright UIUX Engineering All Rights Reserved.
 */

import {hasValue} from '../common/hasValue';
import {get} from 'lodash';

/**
 * Invokes the function nested at the provided path of keys, if it exists,
 * and returns the object. The given keys may be an _array, or a dot-delimited
 * string of properties. invokeIn accepts a variable number of arguments to
 * be passed. If a function at the key does not exist, the object is simply
 * returned.
 *
 */

export function invokeIn(
  object: any,
  keys: string | string[],
  args?: any[],
  context = null
) {
  let fn: Function;

  if (typeof keys === 'undefined' || !hasValue(object)) {
    return object;
  }

  fn = get(object, keys);
  if (typeof fn !== 'function') {
    return object;
  }

  fn.apply(context, args);

  return object;
}
