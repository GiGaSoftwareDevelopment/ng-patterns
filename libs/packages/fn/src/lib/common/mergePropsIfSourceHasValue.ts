/**
 * @license
 * Copyright UIUX Engineering All Rights Reserved.
 */

import {isPlainObject} from 'lodash';
import {hasValue} from './hasValue';

/**
 * Only merge a value from a source object to the target object if it has value
 * @param target
 * @param source
 */
export function mergePropsIfSourceHasValue(target: any, source: any): any {
  if (!isPlainObject(source)) {
    return target;
  }

  const sourceKeys: string[] = Object.keys(source);

  // Walk over keys of source object
  for (let i = 0; i < sourceKeys.length; i++) {
    const key = sourceKeys[i];

    // Only merge source keys that are NOT null or undefined
    if (hasValue(source[key])) {
      // if target and source key is an object, recurse
      if (isPlainObject(target[key]) && isPlainObject(source[key])) {
        // Don't pass encapsulated context of container function
        target[key] = mergePropsIfSourceHasValue.apply(null, [
          target[key],
          source[key]
        ]);
      } else {
        // Should be assigning scalar values at this point
        target[key] = source[key];
      }
    }
  }

  return target;
}
