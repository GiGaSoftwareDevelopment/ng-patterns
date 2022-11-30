import { get } from 'lodash';
import { hasValueNotEqual } from './hasValueNotEqual';

export function hasValueNotEqualIn(targetValue: any, targetKeys: string, srcValue: any, srcKeys: string): boolean {
  return hasValueNotEqual(get(targetValue, targetKeys), get(srcValue, srcKeys));
}
