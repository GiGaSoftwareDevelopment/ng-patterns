import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  createStoreConfig,
  DynamicStore,
  StoreConfig
} from './dynamic-store.model';
import { createDynamicStore, DynamicStoreItem } from './dynamic-store';
import {
  createDynamicEventEmitterStore,
  DynamicEventEmitterStore
} from './dynamic-event-emitter-store';

@Injectable({
  providedIn: 'root'
})
export class DynamicStoreService {
  _storeCache: {
    [key: string]: DynamicStore<any>;
  } = {};

  /**
   * @deprecated use getStore(id, config) instead
   * @param id
   * @param config
   */
  store<T>(id: string, config?: StoreConfig<T>): Observable<T> {
    if (config && config.runInZone) {
      return this.getStore(id, config).runInZone();
    }

    return this.getStore(id, config);
  }

  // pipe<T>(id: string, defaultValue?: T): ReplaySubject<T> {
  //   return this.getStore(id, defaultValue).store;
  // }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dispatch(id: string, value: any): void {
    this.getStore(id, { defaultValue: null }).next(value);
    this.getStore(id, { defaultValue: null }).hasValue = true;
  }

  dispatchIfChanged<T>(id: string, value: T): void {
    this._storeCache[id].dispatchIfChanged(value);
  }

  destroyStore(id: string): void {
    this.getStore(id).destroy();
    delete this._storeCache[id];
  }

  /**
   * @param id
   * @param config
   */
  getStore<T>(id: string, config?: StoreConfig<T>): DynamicStore<T> {
    const _config: StoreConfig<T> = createStoreConfig(config);

    if (!this._storeCache[id]) {
      this._storeCache[id] = _config.isEmitterStore
        ? createDynamicEventEmitterStore<T>(id)
        : createDynamicStore<T>(id);

      if (_config.defaultValue && !_config.isEmitterStore) {
        this._storeCache[id].next(_config.defaultValue);

        (<DynamicStoreItem<T>>this._storeCache[id]).hasValue = true;
      }
    }

    return this._storeCache[id];
  }
}
