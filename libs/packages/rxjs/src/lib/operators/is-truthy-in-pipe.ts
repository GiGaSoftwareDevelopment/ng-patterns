import { isTruthyIn } from '@uiux/fn';
/**
 * @license
 * Copyright UIUX Engineering All Rights Reserved.
 */
import { Observable, OperatorFunction } from 'rxjs';

export function isTruthyInPipe<T>(keys: string | string[]): OperatorFunction<T, T> {
  return (source: Observable<T>): Observable<T> => {
    return new Observable((observer) => {
      return source.subscribe({
        next(x: any) {
          if (isTruthyIn(x, keys)) {
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
