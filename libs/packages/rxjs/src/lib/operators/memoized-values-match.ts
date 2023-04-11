import { Observable, Observer } from 'rxjs';
import { allValuesMatch } from '@ngpat/fn';

/**
 * Usage:
 *
 * this.store.pipe(
 *   select(selectSomeData),
 *   memoize()
 * .subscribe((result: any) => { ...  });
 *
 */
export const memoizedValuesMatch = <T>(): ((
  source: Observable<T>
) => Observable<T>) => {
  let previousValue: T;

  return (source: Observable<T>) => {
    return new Observable((observer: Observer<T>) => {
      return source.subscribe({
        next(currentValue: T) {
          if (!allValuesMatch(previousValue, currentValue)) {
            previousValue = currentValue;
            observer.next(currentValue);
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
