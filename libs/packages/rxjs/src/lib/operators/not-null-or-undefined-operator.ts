/**
 * @license
 * Copyright NGPAT Engineering All Rights Reserved.
 */
import {Observable, OperatorFunction} from 'rxjs';

export function notNullOrUndefinedOperator<T>(): OperatorFunction<T, T> {
  return (source: Observable<T>): Observable<T> => {
    return new Observable(observer => {
      return source.subscribe({
        next(x: any) {
          if (x !== null && x !== undefined) {
            observer.next(x);
          }
        },
        error(err) {
          observer.error(err);
        },
        complete() {
          observer.complete();
        }
      });
    });
  };
}
