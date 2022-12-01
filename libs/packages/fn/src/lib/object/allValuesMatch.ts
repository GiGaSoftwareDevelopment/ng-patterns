import {isFunction} from 'lodash';
import {isPlainObject} from 'lodash';
import {isScalar} from '../common/isScalar';
import {isArray} from 'lodash';
import {hasValue} from '../common/hasValue';
import {isDefined} from '../common/isDefined';

export interface IAllValuesMatchConfig {
  includeArrays?: boolean;
  excludeKeys?: string[];
}

function keyIsExcludedIn(key: string, keys: string[]): boolean {
  return !!keys.filter((_key: string) => key === _key).length;
}

export function allValuesMatch(
  src: any,
  tar: any,
  config?: IAllValuesMatchConfig
): boolean {
  if (isDefined(src) && isDefined(tar)) {
    const keys: string[] = Object.keys(tar);
    const includeArrays: undefined | boolean =
      config && hasValue(config.includeArrays) ? config.includeArrays : false;
    const exludeKeys: string[] | undefined =
      config && hasValue(config.excludeKeys) ? config.excludeKeys : [];

    return keys.reduce(function (acc: boolean, key: string) {
      if (acc && exludeKeys && !keyIsExcludedIn(key, exludeKeys)) {
        if (isArray(tar[key])) {
          if (includeArrays) {
            let isMatch = true;
            for (let i = 0; i < tar[key].length; i++) {
              if (isScalar(tar[key][i])) {
                isMatch = src[key][i] === tar[key][i];
              } else {
                isMatch = allValuesMatch(src[key][i], tar[key][i], config);
              }

              if (!isMatch) {
                break;
              }
            }

            return isMatch;
          } else {
            return isDefined(src[key]) && isDefined(tar[key]);
          }
        } else if (isScalar(tar[key])) {
          return src[key] === tar[key];
        } else if (isPlainObject(tar[key])) {
          return allValuesMatch(src[key], tar[key], config);
        } else if (isFunction(tar[key])) {
          return isDefined(src[key]) && isDefined(tar[key]);
        } else {
          return false;
        }
      }

      return acc;
    }, true);
  } else {
    return false;
  }
}
