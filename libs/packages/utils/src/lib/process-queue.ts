import {Observable, ReplaySubject} from 'rxjs';

/**
 * Optional Generic Wrapper Interface to
 * use as a queue item structure.
 *
 */
export interface NgPatQueueItem<T> {
  type: string;
  config: T;
}

export class NgPatProcessQueue<T> {
  private _queue: T[] = [];
  private _queue$: ReplaySubject<T> = new ReplaySubject<T>(1);

  currentItem$: Observable<T> = this._queue$.asObservable();

  constructor() {
    this._queue$.subscribe(() => {
      this.next();
    });
  }

  addItem(item: T | T[]) {
    this.addItems(item);
  }

  addItems(items: T[] | T) {
    if (Array.isArray(items)) {
      this._queue = [...this._queue, ...items];
    } else {
      this._queue = [...this._queue, items];
    }

    this.next();
  }

  next() {
    const nextItem = this._queue.shift();
    if (nextItem) {
      this._queue$.next(nextItem);
    }
  }
}
