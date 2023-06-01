import { Observable, ReplaySubject } from 'rxjs';

/**
 * Optional Generic Wrapper Interface to
 * use as a queue item structure.
 *
 */
export interface NgPatQueueItem<T> {
  type: string;
  config: T;
}

export type NgPatProcessQueueFindFn = (a: any, b: any, id?: string) => boolean;

export function ngPatProcessQueueFindFnByKey<T>(
  a: any,
  b: any,
  id?: string
): boolean {
  if (id) {
    return a[id] === b[id];
  }

  return a === b;
}

export class NgPatProcessQueue<T> {
  private _queue: T[] = [];
  private _queue$: ReplaySubject<T> = new ReplaySubject<T>(1);

  currentItem$: Observable<T> = this._queue$.asObservable();

  constructor(
    private findFn: NgPatProcessQueueFindFn = ngPatProcessQueueFindFnByKey,
    private id?: string
  ) {
    // TODO Do we need this?
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

  addUnique(item: any) {
    const found = this._queue.find((a: any) => {
      return this.findFn(item, a, this.id);
    });

    if (!found) {
      this.addItems(item);
    }
  }

  addUniques(items: any[]) {
    items.forEach((i: any) => {
      this.addUnique(i);
    });
  }

  next() {
    const nextItem = this._queue.shift();
    if (nextItem) {
      this._queue$.next(nextItem);
    }
  }
}
