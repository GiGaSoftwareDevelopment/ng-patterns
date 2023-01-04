/**
 * @license
 * Copyright UIUX Engineering All Rights Reserved.
 */
import { isDefined } from '@uiux/fn';
import { Observable, OperatorFunction } from 'rxjs';

export function isDefinedPipe<T, K>(): OperatorFunction<T, K> {
  return (source: Observable<T>): Observable<K> => {
    return new Observable((observer) => {
      return source.subscribe({
        next(x: any) {
          if (isDefined(x)) {
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
