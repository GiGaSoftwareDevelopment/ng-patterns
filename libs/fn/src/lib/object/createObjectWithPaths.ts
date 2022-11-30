/**
 * @license
 * Copyright UIUX Engineering All Rights Reserved.
 */

import { isString } from 'lodash';
import { set } from 'lodash';
import { isArray } from 'lodash';
import { isPlainObject } from 'lodash';

/**
 * Use Object with keys or _array with path notation 'a.b.c'
 * to create a javascript object.
 * @param paths _array or string of path
 * @param value optional path
 * For example
 *
 * createObjectWithPaths('a.b.c', null);
 * // { a: { b: { c: null }}};
 */
export function createObjectWithPaths(paths: any | any[], value?: any): any {
  const _value: any = value ? value : null;

  if (isString(paths)) {
    return set({}, paths, _value);
  } else if (isArray(paths)) {
    return paths.reduce((obj, _path: string[] | string) => {
      if (isArray(_path)) {
        const [_pathInObj, _valueInObj] = <string[]>_path;
        return set(obj, _pathInObj, _valueInObj);
      } else {
        return set(obj, <string>_path, _value);
      }
    }, {});
  } else if (isPlainObject(paths)) {
    return Object.keys(paths).reduce((_obj: any, _path: string) => {
      return set(_obj, _path, paths[_path]);
    }, {});
  } else {
    return {};
  }
}
