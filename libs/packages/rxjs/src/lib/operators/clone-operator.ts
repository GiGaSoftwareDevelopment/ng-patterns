/**
 * @license
 * Copyright NGPAT Engineering All Rights Reserved.
 */
import {cloneDeep} from '@ngpat/fn';
import {OperatorFunction} from 'rxjs';
import {map} from 'rxjs/operators';

export function cloneOperator<T>(): OperatorFunction<T, T> {
  return map((d: T) => {
    try {
      return cloneDeep(d);
    } catch (e: any) {
      return d;
    }
  });
}
