/**
 * @license
 * Copyright UIUX Engineering All Rights Reserved.
 */
import { isPlainObject } from 'lodash';
import { hasValue } from './hasValue';
// import { fromJS } from 'immutable';

export function clone(obj: any): any {
  // return cloneDeep(obj);
  if (isPlainObject(obj) && hasValue(obj)) {
    try {
      return JSON.parse(JSON.stringify(obj));
      // return fromJS(obj).toJS();
    } catch (e: any) {
      return obj;
    }
  } else {
    return obj;
  }
}
