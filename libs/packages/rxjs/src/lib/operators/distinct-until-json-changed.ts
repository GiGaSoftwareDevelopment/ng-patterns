import { OperatorFunction, pipe } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';

export function distinctUntilJsonChanged<T>(): OperatorFunction<T, T> {
  return pipe(
    map((d: T) => {
      try {
        return JSON.stringify(d);
      } catch (e: any) {
        console.error('distinctUntilJsonChanged not able to JSON.stringify data');
        return d;
      }
    }),
    distinctUntilChanged(),
    map((d: string | T) => {
      if (typeof d === 'string') {
        return JSON.parse(d);
      }

      // data was never stringified
      return d;
    })
  );
}
