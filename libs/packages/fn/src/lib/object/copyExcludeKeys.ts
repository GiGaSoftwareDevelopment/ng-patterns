import {clone} from '../common/clone';

export function copyExcludeKeys<T, R>(obj: any, keys: string[]): R {
  const _obj = clone(obj);

  return Object.keys(_obj).reduce((acc: any, key: string) => {
    const found = keys.indexOf(key) > -1;
    if (!found) {
      acc[key] = _obj[key];
    }
    return acc;
  }, <R>{});
}
