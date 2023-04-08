import { Observable, Subject } from 'rxjs';

export interface DynamicStore<T> extends Subject<T> {
  dispatch(value: T): void;
  dispatchIfChanged(value: T): void;
  runInZone(): Observable<T>;
  subscribeInZone(): Observable<T>;
  destroy(): void;
  hasValue: boolean;
}

export interface StoreItem<T> {
  id: string;
  hasValue: boolean;
}

export interface EmitterItem<T> {
  id: string;
}

export interface StoreConfig<T> {
  /**
   * default undefined, user must define
   */
  defaultValue?: T;

  /**
   * default false
   */
  runInZone?: boolean;

  /**
   * default false
   */
  distinctUntilChanged?: boolean;

  /**
   * default false
   */
  isEmitterStore?: boolean;
}

export function createStoreConfig<T>(
  c: Partial<StoreConfig<T>> = {}
): StoreConfig<T> {
  return {
    defaultValue: c.defaultValue ? c.defaultValue : undefined,
    runInZone:
      c.runInZone !== null && c.runInZone !== undefined ? c.runInZone : false,
    distinctUntilChanged:
      c.distinctUntilChanged !== null && c.distinctUntilChanged !== undefined
        ? c.distinctUntilChanged
        : false,
    isEmitterStore:
      c.isEmitterStore !== null && c.isEmitterStore !== undefined
        ? c.isEmitterStore
        : false
  };
}
