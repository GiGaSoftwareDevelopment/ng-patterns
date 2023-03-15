/**
 * @license
 * Copyright NGPAT Engineering All Rights Reserved.
 */

import {searchObjectByKeys} from './searchObjectByKeys';
import {ISearchObjectByKeysResult} from './_interfaces';

/**
 * Only return data
 * @param node
 * @param searchParam
 * @param path
 */
export function searchValuesByKeys(
  node: any,
  searchParam: any,
  path = ''
): any[] {
  return searchObjectByKeys(node, searchParam, path).reduce(
    (acc: any, item: ISearchObjectByKeysResult) => {
      acc.push(item.data);
      return acc;
    },
    []
  );
}
