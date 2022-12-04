/**
 * @param object to evaluate
 */
import {isDefined} from '../common/isDefined';
import {isEmpty} from 'lodash';
import {isPlainObject} from 'lodash';

export function allValuesDefined(object: any): boolean {
  if (isPlainObject(object)) {
    if (!isEmpty(object)) {
      return Object.keys(object).reduce(
        (_allValuesDefined: boolean, key: string) => {
          if (!_allValuesDefined) {
            return _allValuesDefined;
          }
          return isDefined(object[key]);
        },
        true
      );
    } else {
      // object is empty
      return false;
    }
  } else {
    // not isPlainObject
    return false;
  }
}
