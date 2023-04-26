import {
  Comparer,
  createEntityAdapter,
  EntityAdapter,
  EntityMap,
  EntityMapOne,
  EntityState
} from '@ngrx/entity';
import { ComponentStore } from '@ngrx/component-store';
import { Observable } from 'rxjs';
import { Dictionary, Update } from '@ngrx/entity';
import { map } from 'rxjs/operators';
import { ngPatCreateUpdate, ngPatCreateUpdates } from '../fns/ngrx';

/**
 * Generic Entity Store wrapper that integrates
 * into a Component Store.
 */
class _NgPatComponentEntityStore<T> extends ComponentStore<EntityState<T>> {
  constructor(private adapter: EntityAdapter<T>) {
    super(adapter.getInitialState());
  }

  addOne = this.updater((state: EntityState<T>, value: T): EntityState<T> => {
    return this.adapter.addOne(value, state);
  });

  addMany = this.updater(
    (state: EntityState<T>, value: T[]): EntityState<T> => {
      return this.adapter.addMany(value, state);
    }
  );

  setAll = this.updater((state: EntityState<T>, value: T[]): EntityState<T> => {
    return this.adapter.setAll(value, state);
  });

  setOne = this.updater((state: EntityState<T>, value: T): EntityState<T> => {
    return this.adapter.setOne(value, state);
  });

  setMany = this.updater(
    (state: EntityState<T>, value: T[]): EntityState<T> => {
      return this.adapter.setMany(value, state);
    }
  );

  removeOne = this.updater(
    (state: EntityState<T>, id: string): EntityState<T> => {
      return this.adapter.removeOne(id, state);
    }
  );

  removeMany = this.updater(
    (state: EntityState<T>, id: string[]): EntityState<T> => {
      return this.adapter.removeMany(id, state);
    }
  );

  removeAll = this.updater((state): EntityState<T> => {
    return this.adapter.removeAll(state);
  });

  updateOne = this.updater(
    (state: EntityState<T>, value: Update<T>): EntityState<T> => {
      return this.adapter.updateOne(value, state);
    }
  );

  updateMany = this.updater(
    (state: EntityState<T>, value: Update<T>[]): EntityState<T> => {
      return this.adapter.updateMany(value, state);
    }
  );

  upsertOne = this.updater(
    (state: EntityState<T>, value: T): EntityState<T> => {
      return this.adapter.upsertOne(value, state);
    }
  );

  upsertMany = this.updater(
    (state: EntityState<T>, value: T[]): EntityState<T> => {
      return this.adapter.upsertMany(value, state);
    }
  );

  mapOne = this.updater(
    (state: EntityState<T>, entityMap: EntityMapOne<T>): EntityState<T> => {
      return this.adapter.mapOne(entityMap, state);
    }
  );

  map = this.updater(
    (state: EntityState<T>, entityMap: EntityMap<T>): EntityState<T> => {
      return this.adapter.map(entityMap, state);
    }
  );

  selectAll$ = (): Observable<T[]> => {
    const { selectAll } = this.adapter.getSelectors();
    return this.select(selectAll);
  };

  selectEntities$ = (): Observable<Dictionary<T>> => {
    const { selectEntities } = this.adapter.getSelectors();
    return this.select(selectEntities);
  };

  selectIds$ = (): Observable<string[] | number[]> => {
    const { selectIds } = this.adapter.getSelectors();
    return this.select(selectIds);
  };

  selectTotal$ = (): Observable<number> => {
    const { selectTotal } = this.adapter.getSelectors();
    return this.select(selectTotal);
  };

  selectItemById$ = (id: string): Observable<T | undefined> => {
    return this.select((state: EntityState<any>) => {
      return state.entities[id];
    });
  };
}

/**
 * This store offers a caching mechanism with NgRX Entity Adapter
 * collection methods - https://ngrx.io/guide/entity/adapter.
 *
 * While this could be utilized similar to the NgRX Component Store,
 * the intent is to use inside an Angular service were it's instantiated
 * with minimal parameters.
 *
 * @example
 *
 * import { NgPatComponentEntityStore } from '@ngpat/store';
 *
 * interface Vehicle {
 *   make: string;
 *   model: string;
 *   year: number;
 *   id: string; // `${make}-${model}-${year}`
 * }
 *
 * const sortByYear = (a: Vehicle, b: Vehicle): number => {
 *   return a.year - b.year;
 * }
 *
 * const inventory = new NgPatComponentEntityStore<Vehicle>('id', sortByYear);
 *
 * inventory
 *   .selectAll$
 *   .pipe(map((v: Vehicle[]) => {
 *     return v.filter((v: Vehicle) => {
 *       return v.year >= 2020;
 *     });
 *   })
 *   .subscribe((v: Vehicle[]) => {
 *     console.log(v);
 *   })
 *
 */
export class NgPatComponentEntityStore<T> {
  private _store: _NgPatComponentEntityStore<T>;

  get state$() {
    return this._store.state$;
  }

  get selectAll$(): Observable<T[]> {
    return this._store.selectAll$();
  }

  get selectIds$(): Observable<string[] | number[]> {
    return this._store.selectIds$();
  }

  get selectEntities$(): Observable<Dictionary<T>> {
    return this._store.selectEntities$();
  }

  get selectTotal$(): Observable<number> {
    return this._store.selectTotal$();
  }

  constructor(
    private id: string = 'id',
    private sortComparer?: false | Comparer<T>
  ) {
    const adapter = createEntityAdapter<T>({
      selectId: (a: any) => a[id],
      sortComparer: sortComparer
    });

    this._store = new _NgPatComponentEntityStore<T>(adapter);
  }

  /**
   * Replaces component store's patchState method
   * @param entity
   */
  patchOne(entity: Partial<any>): void {
    this._store.updateOne({
      id: entity[this.id],
      changes: entity
    });
  }

  addOne(v: T) {
    this._store.addOne(v);
  }

  addMany(v: T[]) {
    this._store.addMany(v);
  }

  setAll(v: T[]) {
    this._store.setAll(v);
  }

  setOne(v: T) {
    this._store.setOne(v);
  }

  setMany(v: T[]) {
    this._store.setMany(v);
  }

  removeOne(v: string) {
    this._store.removeOne(v);
  }

  removeMany(v: string[]) {
    this._store.removeMany(v);
  }

  removeAll() {
    this._store.removeAll();
  }

  updateOne(value: any) {
    this._store.updateOne(ngPatCreateUpdate(value, this.id));
  }

  updateMany(value: any[]) {
    this._store.updateMany(ngPatCreateUpdates(value, this.id));
  }

  upsertOne(v: T) {
    this._store.upsertOne(v);
  }

  upsertMany(v: T[]) {
    this._store.upsertMany(v);
  }

  mapOne(entityMap: EntityMapOne<T>) {
    this._store.mapOne(entityMap);
  }

  map(entityMap: EntityMap<T>) {
    this._store.map(entityMap);
  }

  /**
   * Compare an entity to an entity in the store
   * with the same id.
   *
   * @param updatedEntity
   * @param compareFn
   */
  compare$(
    updatedEntity: any,
    compareFn: (updatedEntity: T, cachedEntity: T) => boolean
  ) {
    return this._store.selectItemById$(updatedEntity[this.id]).pipe(
      map((found: T | undefined) => {
        if (found) {
          return compareFn(updatedEntity, found);
        }

        return false;
      })
    );
  }
}
