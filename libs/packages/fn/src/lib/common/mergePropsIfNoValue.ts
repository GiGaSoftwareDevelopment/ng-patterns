/**
 * @license
 * Copyright UIUX Engineering All Rights Reserved.
 */

import {hasValue} from './hasValue';
import {cloneDeep} from '../lodash';
import {propsWithNoValue} from './propsWithNoValue';

export function mergePropsIfNoValue(
  target: any,
  source: any,
  exclude?: string[]
): any {
  const e: string[] = exclude ? exclude : [];

  // get only the properties that have no value
  // from the target object
  const t: any = propsWithNoValue(target);
  const keys: string[] = Object.keys(t);

  // make target immutable
  const r: any = cloneDeep(target);

  keys.forEach((key: any) => {
    if (e.indexOf(key) === -1) {
      if (hasValue(source[key])) {
        r[key] = source[key];
      }
    }
  });

  return r;
}
