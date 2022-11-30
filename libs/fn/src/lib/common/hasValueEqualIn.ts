import { get } from 'lodash';
import { hasValueEqual } from './hasValueEqual';

export function hasValueEqualIn(targetValue: any, targetKeys: string, srcValue: any, srcKeys: string): boolean {
  return hasValueEqual(get(targetValue, targetKeys), get(srcValue, srcKeys));
}
