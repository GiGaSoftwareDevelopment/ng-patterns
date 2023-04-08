import { inject, NgZone } from '@angular/core';
import { Observable } from 'rxjs';

export function zonePipe<T>(zone?: NgZone) {
  const _zone: NgZone = zone ? zone : inject(NgZone);

  return (observable: Observable<T>) =>
    new Observable<T>(subscriber => {
      // this function will be called each time this
      // Observable is subscribed to.
      const subscription = observable.subscribe({
        next(value) {
          // trigger change detection
          _zone.run(() => {
            subscriber.next(value);
          });
        },
        error(err) {
          // We need to make sure we're propagating our errors through.
          // trigger change detection
          _zone.run(() => {
            subscriber.error(err);
          });
        },
        complete() {
          subscriber.complete();
        }
      });

      // Return the finalization logic. This will be invoked when
      // the result errors, completes, or is unsubscribed.
      return () => {
        subscription.unsubscribe();
        // clean up
      };
    });
}
