import { Observable, ReplaySubject } from 'rxjs';
import { DynamicStore, StoreItem } from './dynamic-store.model';
import { zonePipe } from '@ngpat/rxjs';
import { take } from 'rxjs/operators';

export class DynamicStoreItem<T>
  extends ReplaySubject<T>
  implements StoreItem<T>, DynamicStore<T>
{
  private _hasValue = false;
  get hasValue(): boolean {
    return this._hasValue;
  }

  set hasValue(v: boolean) {
    this._hasValue = v;
  }

  constructor(public id: string) {
    super(1); // set ReplaySubject with buffer of 1
  }

  dispatch(value: T): void {
    this.next(value);
    this.hasValue = true;
  }

  runInZone(): Observable<T> {
    return this.pipe(zonePipe());
  }

  subscribeInZone(): Observable<T> {
    return this.pipe(zonePipe());
  }

  dispatchIfChanged(value: T): void {
    if (this.hasValue) {
      this.pipe(take(1)).subscribe((storedValue: T) => {
        if (value !== storedValue) {
          this.dispatch(value);
        }
      });
    }
  }

  destroy() {
    this.complete();
  }
}

export function createDynamicStore<T>(id: string) {
  return new DynamicStoreItem(id);
}
