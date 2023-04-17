import { Store } from '@ngrx/store';
import { MemoizedSelector } from '@ngrx/store/src/selector';
import { Subscription } from 'rxjs';
import {
  FirestoreCollectionQueryFactoryConfig,
  NgPatFirestoreCollectionQuery
} from './firestore-collection-query';

interface QueryCacheItem<T> {
  item: T;
  query: NgPatFirestoreCollectionQuery<T>;
}

export class QueryEngineCache<T> {
  private _sub: Subscription = Subscription.EMPTY;
  private _cache: { [key: string]: QueryCacheItem<T> } = {};

  constructor(
    private _config: FirestoreCollectionQueryFactoryConfig<T>,
    private store: Store,
    private selectAll: MemoizedSelector<any, any>,
    private _pathGeneratorFn: (...args: any[]) => string,
    private _id: string = 'id'
  ) {}

  onConnect(user: { uid: string | null } | null = null) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const that = this;
    this._sub.unsubscribe();

    // eslint-disable-next-line @ngrx/no-store-subscription
    this._sub = this.store.select(that.selectAll).subscribe((items: T[]) => {
      for (let i = 0; i < items.length; i++) {
        const item: T = items[i];

        if (!that._cache[(<any>item)[this._id]]) {
          that._cache[(<any>item)[this._id]] = {
            item,
            query: that._config.createFirestoreCollectionQuery()
          };
        }

        let _path = '';
        if (user && user.uid) {
          _path = this._pathGeneratorFn(item, user.uid);
        } else {
          _path = this._pathGeneratorFn(item);
        }

        that._cache[(<any>item)[this._id]].query.onConnect(_path);
      }
    });
  }

  onDisconnect() {
    this._sub.unsubscribe();

    for (const prop in this._cache) {
      if (this._cache[prop]) {
        this._cache[prop].query.onDisconnect();
      }
    }
  }

  deleteMany(ids: string[]) {
    for (let i = 0; i < ids.length; i++) {
      const id = ids[i];
      if (this._cache[id]) {
        this._cache[id].query.onDisconnect();
        delete this._cache[id];
      }
    }
  }
}
