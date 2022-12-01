import {get} from 'lodash';
import {hasValueEqual} from './hasValueEqual';

export function hasValueEqualTo(
  targetValue: any,
  targetKeys: string,
  value: any
): boolean {
  return hasValueEqual(get(targetValue, targetKeys), value);
}
