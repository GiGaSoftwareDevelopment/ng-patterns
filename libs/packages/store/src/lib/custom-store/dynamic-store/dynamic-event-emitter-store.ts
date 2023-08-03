import { DynamicStore, EmitterItem } from './dynamic-store.model';
import { Observable, Subject } from 'rxjs';
import { zonePipe } from '@ngpat/rxjs';

export class DynamicEventEmitterStore<T>
  extends Subject<T>
  implements EmitterItem<T>, DynamicStore<T>
{
  private _hasValue = false;
  get hasValue(): boolean {
    return this._hasValue;
  }

  /**
   * No value is retained.
   * This property is only to be
   * consistent with DynamicStoreItem class.
   * @param v
   */
  set hasValue(v: boolean) {
    // DO NOT SET _hasValue
    // this is a Subject subclass to
    // replicate an event bus, so
    // this can never retain a value.
    // This only passes values.
  }

  constructor(public id: string) {
    super();
  }

  dispatch(value: T): void {
    this.next(value);
  }

  runInZone(): Observable<T> {
    return this.pipe(zonePipe());
  }

  subscribeInZone(): Observable<T> {
    return this.pipe(zonePipe());
  }

  dispatchIfChanged(value: T): void {
    this.dispatch(value);
  }

  destroy() {
    this.complete();
  }
}

export function createDynamicEventEmitterStore<T>(
  id: string
): DynamicEventEmitterStore<T> {
  return new DynamicEventEmitterStore<T>(id);
}
