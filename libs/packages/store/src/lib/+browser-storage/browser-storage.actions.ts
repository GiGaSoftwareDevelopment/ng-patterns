import {createAction, props} from '@ngrx/store';
import {EntityMap, EntityMapOne, Update} from '@ngrx/entity';

import {BrowserStorageItem} from './browser-storage.model';

export const onInitBrowserStorageEffect = createAction(
  '[BrowserStorageItem/API] Initial Query BrowserStorageItems'
);

export const browserStorageError = createAction(
  '[BrowserStorageItem/API] Error',
  props<{message: string}>()
);

export const queryBrowserStorage = createAction(
  '[BrowserStorageItem/API] Query BrowserStorageItems',
  props<{query: string}>()
);

export const loadBrowserStorageItems = createAction(
  '[BrowserStorageItem/API] Load BrowserStorageItems',
  props<{browserStorageItems: BrowserStorageItem[]}>()
);

export const setBrowserStorages = createAction(
  '[BrowserStorageItem/API] Set BrowserStorageItems',
  props<{browserStorageItems: BrowserStorageItem[]}>()
);

export const addBrowserStorageItem = createAction(
  '[BrowserStorageItem/API] Add BrowserStorageItem',
  props<{browserStorageItem: BrowserStorageItem}>()
);

export const setBrowserStorageItem = createAction(
  '[BrowserStorageItem/API] Set BrowserStorageItem',
  props<{browserStorageItem: BrowserStorageItem}>()
);

export const upsertBrowserStorageItem = createAction(
  '[BrowserStorageItem/API] Upsert BrowserStorageItem',
  props<{browserStorageItem: BrowserStorageItem}>()
);

export const addBrowserStorageItems = createAction(
  '[BrowserStorageItem/API] Add BrowserStorageItems',
  props<{browserStorageItems: BrowserStorageItem[]}>()
);

export const upsertBrowserStorages = createAction(
  '[BrowserStorageItem/API] Upsert BrowserStorageItems',
  props<{browserStorageItems: BrowserStorageItem[]}>()
);

export const updateBrowserStorageItem = createAction(
  '[BrowserStorageItem/API] Update BrowserStorageItem',
  props<{browserStorageItem: Update<BrowserStorageItem>}>()
);

export const updateBrowserStorageItems = createAction(
  '[BrowserStorageItem/API] Update BrowserStorageItems',
  props<{browserStorageItems: Update<BrowserStorageItem>[]}>()
);

export const mapBrowserStorageItem = createAction(
  '[BrowserStorageItem/API] Map BrowserStorageItem',
  props<{entityMap: EntityMapOne<BrowserStorageItem>}>()
);
export const mapBrowserStorageItems = createAction(
  '[BrowserStorageItem/API] Map BrowserStorageItems',
  props<{entityMap: EntityMap<BrowserStorageItem>}>()
);

export const deleteBrowserStorageItem = createAction(
  '[BrowserStorageItem/API] Delete BrowserStorageItem',
  props<{id: string}>()
);

export const deleteBrowserStorageItems = createAction(
  '[BrowserStorageItem/API] Delete BrowserStorageItems',
  props<{ids: string[]}>()
);

export const clearBrowserStorageItems = createAction(
  '[BrowserStorageItem/API] Clear BrowserStorageItems'
);
