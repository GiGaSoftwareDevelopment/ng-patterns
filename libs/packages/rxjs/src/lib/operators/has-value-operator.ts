/**
 * @license
 * Copyright UIUX Engineering All Rights Reserved.
 */
import { Observable, OperatorFunction } from 'rxjs';
import { hasValue } from '@uiux/fn';

export function hasValueOperator<T, K>(): OperatorFunction<T, K> {
  return (source: Observable<T>): Observable<K> => {
    return new Observable((observer) => {
      return source.subscribe({
        next(x: any) {
          if (hasValue(x)) {
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
