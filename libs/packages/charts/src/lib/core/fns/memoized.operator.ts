import {Observable, Observer} from 'rxjs';
import * as equal from 'fast-deep-equal';

/**
 * Usage:
 *
 * this.store.pipe(
 *   select(selectSomeData),
 *   memoize()
 * .subscribe((result: any) => { ...  });
 *
 */
export const memoize = <T>(): ((source: Observable<T>) => Observable<T>) => {
  let previousValue: T;

  return (source: Observable<T>) => {
    return new Observable((observer: Observer<T>) => {
      return source.subscribe({
        next(x: T) {
          try {
            // stringify for comparison
            //

            if (!equal(x, previousValue)) {
              previousValue = x;

              observer.next(x);
            } else {
              observer.next(previousValue);
            }
          } catch (e) {
            // TODO better error message
            observer.error('Data is not a JSON parsable object.');
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
};
