/**
 * @license
 * Copyright NGPAT Engineering All Rights Reserved.
 */
import {isDefined} from '@ngpat/fn';
import {Observable, OperatorFunction} from 'rxjs';

export function isDefinedOperator<T, K>(): OperatorFunction<T, K> {
  return (source: Observable<T>): Observable<K> => {
    return new Observable(observer => {
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
        }
      });
    });
  };
}
