/**
 * @license
 * Copyright UIUX Engineering All Rights Reserved.
 */

import {isPlainObject, isNull, isUndefined, isFunction} from '../lodash';

export function isScalar(value: any): boolean {
  return (
    (!isPlainObject(value) && !isFunction(value)) ||
    isNull(value) ||
    isUndefined(value)
  );
}
