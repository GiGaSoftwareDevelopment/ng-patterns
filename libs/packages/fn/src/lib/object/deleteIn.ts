import isLength from '../lodash/isLength';
import get from '../lodash/get';
import set from '../lodash/set';
import {hasValue} from '../common/hasValue';
import isNumber from '../lodash/isNumber';
import {clone} from '../common/clone';
import {keySplitterIntoImmutablePath} from './keyConverter';

function deleteNode(object: any, path: string): any {
  const _path: string[] = keySplitterIntoImmutablePath(path);

  const _lastProp: string | undefined = _path.pop();

  // lastProp is a nested prop
  if (isLength(_path.length) && _path.length) {
    // parent object
    const obj = get(object, _path);

    if (hasValue(obj)) {
      if (Array.isArray(obj) && isNumber(_lastProp)) {
        obj.splice(Number(_lastProp));
      } else {
        // remove last prop from parent object
        if (_lastProp) {
          delete obj[_lastProp];
        }
      }

      // place parent object back in tree
      // if obj is not empty after removing target node
      if (hasValue(obj)) {
        set(object, _path, obj);
      }
    }
  } else {
    // _lastProp is at the root level of the object,
    // just delete it.
    if (_lastProp) {
      delete object[_lastProp];
    }
  }

  return object;
}

/**
 * @param object to be mutated
 * @param path must be in dot notation: 'a.b.c' or [ 'a.b.c', 'a.d[0]' ]
 */
export function deleteIn(object: any, path: string | string[]): any {
  if (path === undefined || path === null) {
    throw new Error('deleteIn: object path must have a value.');
  }

  if (Array.isArray(path)) {
    return (<string[]>path).reduce((_obj: any, _path: string) => {
      return deleteNode(_obj, _path);
    }, clone(object));
  } else {
    return deleteNode(clone(object), <string>path);
  }
}
