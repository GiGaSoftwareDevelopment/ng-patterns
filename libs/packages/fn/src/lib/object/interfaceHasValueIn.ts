/**
 * @license
 * Copyright UIUX Engineering All Rights Reserved.
 */

import forIn from '../lodash/forIn';
import get from '../lodash/get';
import hasIn from '../lodash/hasIn';
import {allValuesHasValue} from './allValuesHasValue';

/**
 * In an object that has nested nodes of a _common interface,
 * Return truthy of all _common properties hasValue.
 *
 * @param object
 * @param basePath is a path to an object and may be a path such as 'a.b.c[0]' etc.
 * @param keyOrPath can by a property key, or path to property key
 */
export function interfaceHasValueIn(
  object: any,
  basePath: string,
  keyOrPath: string
): boolean {
  const t: any = {};
  if (hasIn(object, basePath)) {
    const baseObj: any = get(object, basePath, object);

    forIn(baseObj, (o: any, oKey: any) => {
      // to keep unique keys for truthy object
      const concatPath = `${basePath}.${oKey}.${keyOrPath}`;
      t[concatPath] = get(o, keyOrPath);
    });

    return allValuesHasValue(t);
  }

  return false;
}
