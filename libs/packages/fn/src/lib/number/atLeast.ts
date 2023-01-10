import {isDefined} from '../common/isDefined';
import isNumber from '../lodash/isNumber';

export function atLeast(min: number): (val: number) => number {
  if (!isDefined(min) || !isNumber(min)) {
    throw new Error('min provided must be a number');
  }
  return function (val: number): number {
    if (!isDefined(val) || !isNumber(val)) {
      throw new Error('Value provided must be a number');
    }

    return val > min ? val : min;
  };
}
