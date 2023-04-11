import { Observable, Observer } from 'rxjs';

/**
 * Usage:
 *
 * this.store.pipe(
 *   select(selectSomeData),
 *   memoize()
 * .subscribe((result: any) => { ...  });
 *
 */
export const memoizeNotPropagate = <T>(): ((
  source: Observable<T>
) => Observable<T>) => {
  let previousValueCompare: string;
  let previousValue: T;

  return (source: Observable<T>) => {
    return new Observable((observer: Observer<T>) => {
      return source.subscribe({
        next(currentValue: T) {
          try {
            // stringify for comparison
            //

            const currentValueCompare = JSON.stringify(currentValue);

            if (currentValue !== previousValueCompare) {
              previousValueCompare = currentValueCompare;
              previousValue = currentValue;

              observer.next(currentValue);
            }
          } catch (e) {
            console.error(e);
            observer.error('rxjs memoize data is not a JSON parsable object.');
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
