/**
 * @license
 * Copyright UIUX Engineering All Rights Reserved.
 */

import {hasValue} from '../common/hasValue';
import {
  getdexAsNumber,
  isArraySyntax,
  splitKeysIntoDotNotation
} from './keyConverter';

/**
 * Updates the nested key with the given value, if it exists, and returns the
 * object. Keys may either be an _array, or a dot-delimited string of
 * properties. If a key does not exist, the object is simply returned.
 *
 */
export function updateIn(object: any, keys: string | string[], value: any) {
  let i: number, length: number, current: any;

  if (typeof keys === 'undefined' || !hasValue(object)) {
    return object;
  }

  if (!Array.isArray(keys)) {
    keys = splitKeysIntoDotNotation(keys);
    keys = ('' + keys).split('.');
  }

  current = object;
  length = keys.length;

  if (Array.isArray(object) && isArraySyntax(keys[0])) {
    const index: number = getdexAsNumber(keys[0]);

    // if object exists in _array
    if (hasValue(object[index])) {
      // Are we drilling to object in _array
      if (keys[1]) {
        object[index] = updateIn(object[index], keys.splice(1), value);
      } else {
        object[index] = value;
      }

      // return object;
    }

    return object;
  } else {
    for (i = 0; i < length; i++) {
      if (!hasValue(current[keys[i]])) {
        return object;
      }

      if (keys[i + 1]) {
        if (isArraySyntax(keys[i + 1])) {
          current[keys[i]] = updateIn(
            current[keys[i]],
            keys.splice(i + 1),
            value
          );
          break;
        } else {
          current = current[keys[i]];
        }
      } else {
        current[keys[i]] = value;
      }
    }

    return object;
  }

  // current = object;
  // length = keys.length;
  //
  // // Iterate and return if a property is undefined
  // for (i = 0; i < length; i++) {
  //   if (!(keys[i] in current)) {
  //     return object;
  //   }
  //
  //   if (i < length - 1) {
  //     current = current[keys[i]];
  //   }
  // }
  //
  // current[keys[i - 1]] = value;
  //
  // return object;
}
