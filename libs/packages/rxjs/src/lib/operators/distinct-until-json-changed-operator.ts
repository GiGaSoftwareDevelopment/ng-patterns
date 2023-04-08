import { OperatorFunction, pipe } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';

/**
 * RxJS operator that stringifies data before running the distinctUntilChanged
 * operator.
 *
 * The rxjs distinctUntilChanged operator only performs a shallow compare, or it only checks
 * if data references are different. The distinctUntilChanged operator works best
 * by checking scalar values, in this case a string via stringifying
 * data structures.
 *
 * @example
 * store.select(someComplexDataStructure)
 * .pipe(distinctUntilJsonChangedOperator())
 * .subscribe((d: SomeComplexDataStructure) => {
 *   console.log(d);
 * });
 */
export function distinctUntilJsonChangedOperator<T>(): OperatorFunction<T, T> {
  return pipe(
    map((d: T) => {
      try {
        return JSON.stringify(d);
      } catch (e: any) {
        console.error(
          'distinctUntilJsonChangedOperator not able to JSON.stringify data'
        );

        // return original object
        return d;
      }
    }),
    distinctUntilChanged(),
    map((d: string | T) => {
      // parse only if data was stringified.
      if (typeof d === 'string') {
        return JSON.parse(d);
      }

      // data was never stringified
      return d;
    })
  );
}
