/**
 * @license
 * Copyright UIUX Engineering All Rights Reserved.
 */

import { isEqual } from 'lodash';
import { get } from 'lodash';
import { isArray } from 'lodash';
import { isEmpty } from 'lodash';
import { hasValue } from '../common/hasValue';
import { isPlainObject } from 'lodash';
import { objectTransform } from './objectTransform';

export function valuesEqualHash(target: any, source: any, paths: string[] | any): boolean {
  if (isPlainObject(target) && isPlainObject(source) && hasValue(paths)) {
    if (!isEmpty(target) && !isEmpty(source)) {
      if (isArray(paths)) {
        let _mappedPropsAreEqual = true;
        const length = paths.length;

        for (let i = 0; i < length; i++) {
          _mappedPropsAreEqual = get(target, paths[i]) === get(source, paths[i]);

          if (!_mappedPropsAreEqual) {
            break;
          }
        }
        return _mappedPropsAreEqual;
      } else {
        // is object
        const _transTar: any = objectTransform(target, paths);
        const _transSrc: any = objectTransform(source, paths);
        return isEqual(_transTar, _transSrc);
      }
    } else {
      // is plain object but are empty
      // objects
      return false;
    }
  } else {
    // plain object is empty
    return false;
  }
}
