/**
 * @license
 * Copyright NGPAT Engineering All Rights Reserved.
 */
import {hasValue} from '../common/hasValue';
import isPlainObject from '../lodash/isPlainObject';

export function valuesWithKey(obj: any, key: string): any[] {
  if (isPlainObject(obj) && hasValue(obj) && hasValue(key)) {
    return Object.keys(obj).reduce((acc: any[], _key: string) => {
      if (isPlainObject(obj[_key])) {
        acc.push({
          [key]: _key,
          ...obj[_key]
        });
      }

      return acc;
    }, []);
  } else {
    return Object.keys(obj).reduce((acc: any[], _key: string) => {
      if (isPlainObject(obj[_key])) {
        acc.push({
          ...obj[_key]
        });
      }

      return acc;
    }, []);
  }
}
