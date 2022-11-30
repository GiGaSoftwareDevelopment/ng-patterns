import { keysAreTruthy } from '../object/keysAreTruthy';
import { isArray } from 'lodash';

/**
 * Given a collection of objects, test if provided keys are truthy in each object.
 * Returns true if each provided key in each object of collection is truthy.
 * @param collection of objects
 * @param keys array of key strings
 */
export function keysAreTruthyInCollection<T>(collection: T[], keys: string | string[]): boolean {
  const _keys: string[] = isArray(keys) ? keys : [keys];

  return collection.reduce((isTruthy: boolean, i: T) => {
    if (isTruthy === true) {
      return keysAreTruthy(i, _keys);
    }

    return isTruthy;
  }, true);
}
