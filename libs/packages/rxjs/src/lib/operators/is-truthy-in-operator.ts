import {isTruthyIn} from '@ngpat/fn';
/**
 * @license
 * Copyright NGPAT Engineering All Rights Reserved.
 */
import {Observable, OperatorFunction} from 'rxjs';

export function isTruthyInOperator<T>(
  keys: string | string[]
): OperatorFunction<T, T> {
  return (source: Observable<T>): Observable<T> => {
    return new Observable(observer => {
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
        }
      });
    });
  };
}
