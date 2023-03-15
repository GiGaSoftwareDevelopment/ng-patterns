/**
 * @license
 * Copyright NGPAT Engineering All Rights Reserved.
 */

import {hasValue} from '../common/hasValue';
import {ternaryIn} from '../common/ternaryIn';

/**
 * Call value into target function if value exists
 *
 *  If you have:
 * if (target && target.prop && target.prop.prop2 {
 *    someFunction( target.prop && target.prop.prop2 );
 * } else {
 *    someFunction( defaultValue );
 * }
 *
 * Then you can use:
 * invokeIfElseIn(target, 'prop.prop2', defaultValue, someFunction);
 *
 */
export function invokeIfElseIn(
  object: any,
  keys: string | string[],
  elseValue: any,
  fn: Function,
  context: any = null
) {
  const valueFromObject: any = ternaryIn(object, keys, elseValue);

  if (hasValue(valueFromObject)) {
    fn.call(context, valueFromObject);
  } else {
    fn.call(context, elseValue);
  }
}
