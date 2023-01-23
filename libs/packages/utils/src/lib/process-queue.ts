import {Observable, ReplaySubject} from 'rxjs';

/**
 * Optional Generic Wrapper Interface to
 * use as a queue item structure.
 *
 */
export interface UiUxQueueItem<T> {
  type: string;
  config: T;
}

export class UiUxProcessQueue<T> {
  private _queue: T[] = [];
  private _queue$: ReplaySubject<T> = new ReplaySubject<T>(1);

  currentItem$: Observable<T> = this._queue$.asObservable();

  constructor() {
    this._queue$.subscribe(() => {
      this.next();
    });
  }

  addItem(item: T) {
    this._queue = [...this._queue, item];
    this.next();
  }

  addItems(items: T[]) {
    this._queue = [...this._queue, ...items];
    this.next();
  }

  next() {
    const nextItem = this._queue.shift();
    if (nextItem) {
      this._queue$.next(nextItem);
    }
  }
}
