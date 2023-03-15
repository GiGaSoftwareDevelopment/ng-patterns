/**
 * @license
 * Copyright NGPAT Engineering All Rights Reserved.
 */
import {
  defer,
  Observable,
  Observer,
  timer,
  UnaryFunction,
  throwError
} from 'rxjs';
import {mergeMap, take, timeoutWith, filter} from 'rxjs/operators';

export interface IPollForValueConfig {
  delay: number;
  interval: number;
  timeout: number;
  sourceObservable: () => Observable<any>;
  compare?: (value: any) => any;
  errorMsg?: string;
  schedular?: any;
}

export function pollForValueWithConfig(
  config: IPollForValueConfig
): UnaryFunction<Observable<any>, Observable<any>> {
  return pollForValueOperator(
    config.delay,
    config.interval,
    config.timeout,
    config.sourceObservable,
    config.compare,
    config.errorMsg,
    config.schedular
  );
}

export function pollForValueOperator(
  _delay: number,
  _interval: number,
  _timeout: number,
  _sourceObservable: () => any,
  _compare?: (value: any) => any,
  _errorMsg?: string,
  _schedular?: any
): UnaryFunction<Observable<any>, Observable<any>> {
  const errorMsg: string = _errorMsg ? _errorMsg : 'Poll Timeout';

  /**
   * source is the Observable you created passed into this (pollForValueOperator) function.
   *
   * For example:
   * from([1, 2, 3]).pipe( pollForValueOperator( ... ) ).subscribe( ... )
   *
   * The observable emitting [1, 2, 3] is the source observable.
   */
  return <T>(source: Observable<T>) => {
    /**
     * Wrapper Observable that creates and observer ( has next, error, and complete
     * functions ). The observer is used to pass values once the poll is complete
     */
    return new Observable((observer: Observer<T>) => {
      /**
       * Iteration on source observer
       */
      return source
        .pipe(
          /**
           * Look at every value published by source observable
           */
          mergeMap((_initialValue: any) => {
            /**
             * Call the function passed in by the config, if available,
             * to test is the source value ( _initialValue ) is
             * what you are looking for.
             *
             * Test the value with a compare function ( if provided )
             * to see if it matches the criteria for a desired value.
             *
             * If test fails, start polling.
             */
            if (_compare && _compare(_initialValue)) {
              return [_initialValue];
            } else {
              /**
               * Set up and interval timer that starts
               * after a delay time.
               */
              return timer(_delay, _interval).pipe(
                /**
                 * After the delay or interval, call the source
                 * observable again to get an updated value.
                 */
                mergeMap(() => {
                  return _sourceObservable();
                }),

                /**
                 * Test the returned value again for
                 * desired criteria with a compare function
                 * if provided.
                 *
                 * If not compare function is provided,
                 * pass value to next step.
                 */
                filter((_data: any) => {
                  if (_compare) {
                    return _compare(_data);
                  } else {
                    return true;
                  }
                }),

                /**
                 * Only take the first returned value
                 * from the retried source observable.
                 *
                 * We only care if the returned value exists or not.
                 */
                take(1),

                /**
                 * If, after designated timeout time there is not
                 * value, throw and error.
                 */
                timeoutWith(
                  _timeout,
                  defer(() => {
                    return throwError(new Error(errorMsg));
                  }),
                  _schedular
                )
              );
            }
          })

          /**
           * Subscribe to the source observable to start
           * the polling process.
           *
           * Return value using the generated observer.
           */
        )
        .subscribe({
          next(x: any): void {
            observer.next(x);
          },
          error(err: any): void {
            observer.error(err);
          },
          complete(): void {
            observer.complete();
          }
        });
    });
  };
}
