import {createAction, props} from '@ngrx/store';

import {NgPatBrowserStorageItem} from './browser-storage.model';

export const ngPatOnInitBrowserStorageEffect = createAction(
  '[NgPatBrowserStorageItem/API] Initial Query BrowserStorageItems'
);

export const ngPatBrowserStorageError = createAction(
  '[NgPatBrowserStorageItem/API] Error',
  props<{message: string}>()
);

export const ngPatLoadBrowserStorageItems = createAction(
  '[NgPatBrowserStorageItem/API] Load BrowserStorageItems',
  props<{browserStorageItems: NgPatBrowserStorageItem[]}>()
);

export const ngPatSetBrowserStorageItems = createAction(
  '[NgPatBrowserStorageItem/API] Set BrowserStorageItems',
  props<{browserStorageItems: NgPatBrowserStorageItem[]}>()
);

export const ngPatAddBrowserStorageItem = createAction(
  '[NgPatBrowserStorageItem/API] Add NgPatBrowserStorageItem',
  props<{browserStorageItem: NgPatBrowserStorageItem}>()
);

export const ngPatSetBrowserStorageItem = createAction(
  '[NgPatBrowserStorageItem/API] Set NgPatBrowserStorageItem',
  props<{browserStorageItem: NgPatBrowserStorageItem}>()
);

export const ngPatAddBrowserStorageItems = createAction(
  '[NgPatBrowserStorageItem/API] Add BrowserStorageItems',
  props<{browserStorageItems: NgPatBrowserStorageItem[]}>()
);

export const ngPatDoDisconnectAndRemoveBrowserStorageItem = createAction(
  '[NgPatBrowserStorageItem/API] Delete NgPatBrowserStorageItem',
  props<{id: string}>()
);

export const ngPatRemoveBrowserStorageItems = createAction(
  '[NgPatBrowserStorageItem/API] Delete BrowserStorageItems',
  props<{ids: string[]}>()
);

export const ngPatClearBrowserStorageItems = createAction(
  '[NgPatBrowserStorageItem/API] Clear BrowserStorageItems'
);
