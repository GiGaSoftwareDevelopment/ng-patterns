/**
 * @license
 * Copyright UIUX Engineering All Rights Reserved.
 */

import { get } from 'lodash';
import { ternary } from './ternary';

/**
 * Return value of nested node if node has a value,
 * else return conditional value.
 *
 * ternaryIn(object: 'prop1.prop2[0].prop3', alternateValue);
 */
export function ternaryIn(object: any, keys: string | string[], elseValue: any): any {
  // getIn or get Will return value of any key defined
  // even if value is null or undefined
  return ternary(get(object, keys), elseValue);
}
