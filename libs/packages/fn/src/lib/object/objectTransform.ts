/**
 * @license
 * Copyright UIUX Engineering All Rights Reserved.
 */
import isPlainObject from '../lodash/isPlainObject';
import isEmpty from '../lodash/isEmpty';
import set from '../lodash/set';
import get from '../lodash/get';
import isString from '../lodash/isString';

/**
 * @param srcObj
 * @param map
 */
export function objectTransform(srcObj: any, map: any): any {
  if (isPlainObject(srcObj) && isPlainObject(map)) {
    if (!isEmpty(srcObj) && !isEmpty(map)) {
      return Object.keys(map).reduce((acc: any, key: any) => {
        acc = set(acc, key, get(srcObj, map[key], null));
        return acc;
      }, {});
    } else {
      // is plain object but are empty
      // objects
      return {};
    }
  } else {
    // plain object is empty
    return {};
  }
}

export function objectTransformMap<T>(srcObj: any, map: any): any {
  if (
    isPlainObject(srcObj) &&
    isPlainObject(map) &&
    !isEmpty(srcObj) &&
    !isEmpty(map)
  ) {
    return Object.keys(map).reduce((tarObj: any, srcKey: string) => {
      if (isString(map[srcKey])) {
        const targetKey = map[srcKey];

        tarObj = set(tarObj, targetKey, get(srcObj, srcKey, null));
      } else if (Array.isArray(map[srcKey])) {
        for (let i = 0; i < map[srcKey].length; i++) {
          const targetKey = map[srcKey][i];
          tarObj = set(tarObj, targetKey, get(srcObj, srcKey, null));
        }
      }

      return tarObj;
    }, {});
  } else {
    // plain object is empty
    return {};
  }
}
