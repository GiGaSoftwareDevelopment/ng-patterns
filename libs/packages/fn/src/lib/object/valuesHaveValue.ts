/**
 * @license
 * Copyright NGPAT Engineering All Rights Reserved.
 */
import {hasValue} from '../common/hasValue';
import isEmpty from '../lodash/isEmpty';
import isPlainObject from '../lodash/isPlainObject';

export function valuesHaveValue(object: any, keys?: string[]): boolean {
  if (isPlainObject(object)) {
    if (!isEmpty(object)) {
      if (keys && keys.length) {
        return keys.reduce((_allPropsHaveValue: boolean, key: string) => {
          if (!_allPropsHaveValue) {
            return _allPropsHaveValue;
          }
          return hasValue(object[key]);
        }, true);
      } else {
        // is plain object but not keys provided
        // and object is not empty
        return false;
      }
    } else {
      // plain object is empty
      return false;
    }
  } else {
    return false;
  }
}
