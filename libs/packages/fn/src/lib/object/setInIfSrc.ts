/**
 * @license
 * Copyright UIUX Engineering All Rights Reserved.
 */

import set from '../lodash/set';
import {hasValue} from '../common/hasValue';
import {ternaryIn} from '../common/ternaryIn';

/**
 * Sets the nested key to the provided value only if the property exists.
 *
 * If you have for example:
 * if (target && target.prop && target.prop.prop2 {
 *    target.prop.prop2 = someValue;
 * }
 *
 * Then you can use:
 * setIfSrc(target, 'prop.prop2', someValue);
 *
 */
export function setIfSrc(
  srcObject: any,
  srcKeys: string | string[],
  targetObject: any,
  targetKeys: string | string[],
  defaultValue?: any
): void {
  const _value: any = ternaryIn(srcObject, srcKeys, defaultValue);

  // if defaultValue is used, validate it
  if (hasValue(_value)) {
    set(targetObject, targetKeys, _value);
  }
}
