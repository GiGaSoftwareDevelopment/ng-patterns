/**
 * @license
 * Copyright UIUX Engineering All Rights Reserved.
 */
import {isObject} from 'lodash';
import {ixIsMatch} from '../common/ixIsMatch';

export interface IFindPropsWithValueResult {
  search: any;
  path: string;
  data: any;
}

/**
 *
 * @param node
 * @param _searchMap map of property value pairs
 *
 * Example: {
 *    prop1: val1,
 *    prop2: val2
 * }
 *
 * @param path
 */
export function searchValuesByMatch(
  node: any | any[],
  _searchMap: any,
  path = ''
): IFindPropsWithValueResult[] {
  let result: any[] = [];

  /**
   * If node is _array, iterate over every object
   */
  if (Array.isArray(node)) {
    node.map((item: any, index: number) => {
      result = result.concat(
        searchValuesByMatch(item, _searchMap, path + '[' + index + ']')
      );
    });

    // map(node, (item: any, index: number) => {
    //   result = result
    //     .concat(findPropsWithValue(item, _searchMap, (path + '[' + index + ']')));
    // });
  } else {
    /**
     * if _searchMap is found in node,
     * add as a result
     */
    if (ixIsMatch(node, _searchMap)) {
      const _result: IFindPropsWithValueResult = _buildResult(
        node,
        _searchMap,
        path
      );
      result.push(_result);
    } else {
      /**
       * No match on current node,
       * so iterate over every property key
       * and recurse through values ( objects, arrays)
       */
      let tempPath = '';

      for (const _prop in node) {
        // eslint-disable-next-line no-prototype-builtins
        if (node.hasOwnProperty(_prop)) {
          // concat . in path if recursion
          tempPath = path.length ? '.' + _prop : _prop;

          if (isObject(node[_prop]) || Array.isArray(node[_prop])) {
            result = result.concat(
              searchValuesByMatch(node[_prop], _searchMap, path + tempPath)
            );
          }
          // else {
          //
          //
          //   if (isMatch(_searchMap, (_prop)) && hasValue(node[_prop])) {
          //     const _result: IFindPropsWithValueResult = _resultObject();
          //     _result.key = _prop;
          //
          //     // concat path if recursion
          //     _result.path = path + tempPath;
          //     _result.data = node[_prop];
          //
          //     result.push(_result);
          //   }
          //
          // }
        }
      }
    }
  }

  return result;
}

/**
 * @ignore
 */
function _resultObject(): IFindPropsWithValueResult {
  return {
    search: null,
    path: '',
    data: ''
  };
}

/**
 * @ignore
 * @param data
 * @param _searchMap
 * @param _path
 */
function _buildResult(
  data: any,
  _searchMap: any,
  _path: string
): IFindPropsWithValueResult {
  const _result: IFindPropsWithValueResult = _resultObject();

  _result.search = _searchMap;
  _result.path = _path;
  _result.data = data;

  return _result;
}
