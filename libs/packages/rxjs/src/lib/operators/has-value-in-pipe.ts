import { hasValueIn } from '@uiux/fn';
/**
 * @license
 * Copyright UIUX Engineering All Rights Reserved.
 */
import { Observable, OperatorFunction } from 'rxjs';

export function hasValueInPipe<T, K>(keys: string | string[]): OperatorFunction<T, K> {
  return (source: Observable<T>): Observable<K> => {
    return new Observable((observer) => {
      return source.subscribe({
        next(x: any) {
          if (hasValueIn(x, keys)) {
            observer.next(x);
          }
        },
        error(err) {
          observer.error(err);
        },
        complete() {
          observer.complete();
        },
      });
    });
  };
}
