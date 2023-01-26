import {createAction, props} from '@ngrx/store';

import {BrowserStorageItem} from './browser-storage.model';

export const onInitBrowserStorageEffect = createAction(
  '[BrowserStorageItem/API] Initial Query BrowserStorageItems'
);

export const browserStorageError = createAction(
  '[BrowserStorageItem/API] Error',
  props<{message: string}>()
);


export const loadBrowserStorageItems = createAction(
  '[BrowserStorageItem/API] Load BrowserStorageItems',
  props<{browserStorageItems: BrowserStorageItem[]}>()
);

export const setBrowserStorageItems = createAction(
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

export const addBrowserStorageItems = createAction(
  '[BrowserStorageItem/API] Add BrowserStorageItems',
  props<{browserStorageItems: BrowserStorageItem[]}>()
);

export const doDisconnectAndRemoveBrowserStorageItem = createAction(
  '[BrowserStorageItem/API] Delete BrowserStorageItem',
  props<{id: string}>()
);

export const removeBrowserStorageItems = createAction(
  '[BrowserStorageItem/API] Delete BrowserStorageItems',
  props<{ids: string[]}>()
);


export const clearBrowserStorageItems = createAction(
  '[BrowserStorageItem/API] Clear BrowserStorageItems'
);
