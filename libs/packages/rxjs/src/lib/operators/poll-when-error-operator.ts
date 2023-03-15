/**
 * @license
 * Copyright NGPAT Engineering All Rights Reserved.
 */

import {concat, Observable, Observer, throwError, UnaryFunction} from 'rxjs';
import {delay, retry, take} from 'rxjs/operators';

export interface IPollWhenErrorConfig {
  delay: number;
  take: number;
  errorMsg?: string;
}

// tslint:disable-next-line
export function pollWhenErrorWithConfig(
  config: IPollWhenErrorConfig
): UnaryFunction<Observable<any>, Observable<any>> {
  return pollWhenErrorOperator(config.delay, config.take, config.errorMsg);
}

export function pollWhenErrorOperator(
  _delay: number,
  _take: number,
  _errorMsg?: string
): UnaryFunction<Observable<any>, Observable<any>> {
  const errorMsg: string = _errorMsg ? _errorMsg : 'Error poll timed out.';

  /**
   * source observable created passed into this function.
   */
  return <T>(source: Observable<T>) => {
    /**
     * Return a new observable.
     */
    return new Observable((observer: Observer<T>) => {
      source
        .pipe(
          retry({
            delay: (errors: Observable<any>) => {
              return concat(
                errors.pipe(delay(_delay), take(_take)),
                throwError(new Error(errorMsg))
              );
            }
          })
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
