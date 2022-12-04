/**
 * @license
 * Copyright UIUX Engineering All Rights Reserved.
 */

import {get} from 'lodash';
import {forIn} from 'lodash';
import {hasIn} from 'lodash';
import {allValuesTruthy} from './allValuesTruthy';

/**
 * Return truthy of all _common properties in different paths.
 * @param object
 * @param basePath is a path to an object and may be a path such as 'a.b.c[0]' etc.
 * @param keyOrPath can by a property key, or path to property key
 * @returns boolean
 */
export function interfaceTruthyIn(
  object: any,
  basePath: string,
  keyOrPath: string
): boolean {
  const t: any = {};
  if (hasIn(object, basePath)) {
    const baseObj: any = get(object, basePath, object);

    forIn(baseObj, (o: any, oKey) => {
      // to keep unique keys for truthy object
      const concatPath = `${basePath}.${oKey}.${keyOrPath}`;
      t[concatPath] = get(o, keyOrPath);
    });

    return allValuesTruthy(t);
  }

  return false;
}
