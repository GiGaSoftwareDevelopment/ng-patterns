/**
 * @license
 * Copyright NGPAT Engineering All Rights Reserved.
 */

import isPlainObject from '../lodash/isPlainObject';
import isEmpty from '../lodash/isEmpty';
import {isTruthy} from '../common/isTruthy';

/**
 * @param object to evaluate
 */
export function allValuesTruthy(object: any): boolean {
  if (isPlainObject(object)) {
    if (!isEmpty(object)) {
      return Object.keys(object).reduce(
        (_allPropsHaveValue: boolean, key: string) => {
          if (!_allPropsHaveValue) {
            return _allPropsHaveValue;
          }
          return isTruthy(object[key]);
        },
        true
      );
    } else {
      // object is empty
      return false;
    }
  } else {
    // not plain object
    return false;
  }
}
