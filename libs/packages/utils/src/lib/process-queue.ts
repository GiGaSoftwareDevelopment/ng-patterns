import { computed, signal, Signal, WritableSignal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Observable, ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * Optional Generic Wrapper Interface to
 * use as a queue item structure.
 *
 */
export interface NgPatQueueItem<T> {
  type: string;
  config: T;
}

/**
 * A function that compares two items and returns a boolean
 * to determine if an id or item is contained the queue.
 */
export type NgPatProcessQueueFindFn = (a: any, b: any, id?: string) => boolean;

/**
 * A function that compares two items and returns a boolean
 * to determine if an id or item is contained the queue.
 *
 * This is the default find function that assumes the queue
 * is a collection of objects. You can optionally pass in
 * an id to compare the objects by a specific property.
 */
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

/**
 * An Async Iterator that processes a queue of items.
 */
export class NgPatProcessQueue<T> {
  private _queue: T[] = [];
  private _queue$: ReplaySubject<T> = new ReplaySubject<T>(1);

  paused: WritableSignal<string> = signal('false');

  isPaused: Signal<boolean> = computed(() => { return this.paused() === 'true'; });

  currentItem$: Observable<T> = this._queue$.asObservable();

  private _findFn: NgPatProcessQueueFindFn = ngPatProcessQueueFindFnByKey;

  get findFn(): NgPatProcessQueueFindFn {
    return this._findFn;
  }

  set findFn(value: NgPatProcessQueueFindFn) {
    this._findFn = value;
  }

  private _key: string | undefined;

  get key(): string | undefined {
    return this._key;
  }

  set key(value: string | undefined) {
    this._key = value;
  }

  get hasItems(): boolean {
    return this._queue.length > 0;
  }

  isProcessing$: Observable<boolean> = this._queue$.asObservable().pipe(
    map((item: T) => {
      return this.hasItems;
    })
  );

  isProcessing: Signal<boolean> = <Signal<boolean>>toSignal(this.isProcessing$);

  isEmpty$: Observable<boolean> = this._queue$.asObservable().pipe(
    map((item: T) => {
      return !this.hasItems;
    })
  );

  isEmpty: Signal<boolean> = <Signal<boolean>>toSignal(this.isEmpty$);

  constructor(
  ) {
    // TODO Do we need this?
    // this._queue$.subscribe(() => {
    //   this.next();
    // });
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
      return this.findFn(item, a, this.key);
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

  /**
   * Pauses the queue from processing.
   * Does not clear the queue and will
   * not stop the current item from
   * processing.
   */
  pause() {
    this.paused.set('true');
  }

  /**
   * Resumes the queue processing.
   * If the queue is not paused, this
   * will have no effect.
   *
   * If the queue is paused and the
   * current item is processing, this
   * will have no effect.
   *
   * If the queue is paused and the
   * current item is not processing,
   * the next item will be processed.
   */
  resume() {
    this.paused.set('false');

    if (!this.isProcessing()) {
      this.next();
    }
  }
}
