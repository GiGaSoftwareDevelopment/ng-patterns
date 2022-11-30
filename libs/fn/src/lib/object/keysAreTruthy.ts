/**
 * @license
 * Copyright UIUX Engineering All Rights Reserved.
 */
import { isPlainObject } from 'lodash';
import { isEmpty } from 'lodash';
import { isTruthy } from '../common/isTruthy';

export function keysAreTruthy(value: any, keys?: string[]): boolean {
  if (isPlainObject(value)) {
    if (!isEmpty(value)) {
      if (keys && keys.length) {
        let allPropsHaveValue = true;
        const length = keys.length;

        for (let i = 0; i < length; i++) {
          const _key: string = keys[i];
          const _value: any = value[_key];

          allPropsHaveValue = isTruthy(_value);

          if (!allPropsHaveValue) {
            break;
          }
        }

        return allPropsHaveValue;
      } else {
        // is plain object but not keys provided
        // and object is not empty
        return true;
      }
    } else {
      // plain object is empty
      return false;
    }
  } else {
    return !isEmpty(value);
  }
}
