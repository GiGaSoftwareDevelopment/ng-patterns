/**
 * @license
 * Copyright UIUX Engineering All Rights Reserved.
 */
import { clone } from '@uiux/fn';
import { OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';

export function clonePipe<T>(): OperatorFunction<T, T> {
  return map((d: T) => {
    try {
      return clone(d);
    } catch (e: any) {
      return d;
    }
  });
}
