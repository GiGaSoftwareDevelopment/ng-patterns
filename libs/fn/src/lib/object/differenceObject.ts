/**
 * Deep diff between two object, using lodash
 * @param  object Object compared
 * @param  base   Object to compare with
 */
import { isObject } from 'lodash';
import { isEqual } from 'lodash';
import { objectTransform } from './objectTransform';

export function differenceObject(object: any, base: any): any {
  return objectTransform(object, function(result: any, value: any, key: string) {
    if (!isEqual(value, base[key])) {
      result[key] = isObject(value) && isObject(base[key]) ? differenceObject(value, base[key]) : value;
    }
  });
}
