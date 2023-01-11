/**
 * @license
 * Copyright UIUX Engineering All Rights Reserved.
 */

import {isArray, isBoolean, cloneDeep, mergeWith} from '../lodash';

export function mergeWithoutArray(target: any, source: any): any {
  return mergeWith(cloneDeep(target), cloneDeep(source), mergeCustomizer);
}

function mergeCustomizer(targetValue: any, srcValue: any): any {
  if (isArray(targetValue) || isBoolean(srcValue)) {
    return srcValue;
  }
}
