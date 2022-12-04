import {Observable, ReplaySubject} from 'rxjs';

export interface UiUxQueueItem<T> {
  filename: string;
  config: T;
}

export class UiUxProcessQueue<T> {
  private _queue: UiUxQueueItem<T>[] = [];
  private _queue$: ReplaySubject<UiUxQueueItem<T>> = new ReplaySubject<
    UiUxQueueItem<T>
  >(1);

  currentItem$: Observable<UiUxQueueItem<T>> = this._queue$.asObservable();

  constructor() {
    this._queue$.subscribe(() => {
      this.next();
    });
  }

  addItem(item: UiUxQueueItem<T>) {
    this._queue = [...this._queue, item];
    this.next();
  }

  addItems(items: UiUxQueueItem<T>[]) {
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
