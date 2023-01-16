/**
 * @license
 * Copyright UIUX Engineering All Rights Reserved.
 */
import { cloneDeep } from '@uiux/fn';
import { OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';

export function clonePipe<T>(): OperatorFunction<T, T> {
  return map((d: T) => {
    try {
      return cloneDeep(d);
    } catch (e: any) {
      return d;
    }
  });
}
