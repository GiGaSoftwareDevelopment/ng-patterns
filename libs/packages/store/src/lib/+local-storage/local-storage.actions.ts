import { createAction, props } from '@ngrx/store';

import { NgPatLocalStorageItem } from './local-storage.model';

export const ngPatOnInitLocalStorageEffect = createAction(
  '[NgPatLocalStorageItem/API] Initial Query LocalStorageItems'
);

export const ngPatLocalStorageError = createAction(
  '[NgPatLocalStorageItem/API] Error',
  props<{ message: string }>()
);

export const ngPatLoadLocalStorageItems = createAction(
  '[NgPatLocalStorageItem/API] Load LocalStorageItems',
  props<{ localStorageItems: NgPatLocalStorageItem[] }>()
);

export const ngPatSetLocalStorageItems = createAction(
  '[NgPatLocalStorageItem/API] Set LocalStorageItems',
  props<{ localStorageItems: NgPatLocalStorageItem[] }>()
);

export const ngPatAddLocalStorageItem = createAction(
  '[NgPatLocalStorageItem/API] Add NgPatLocalStorageItem',
  props<{ localStorageItem: NgPatLocalStorageItem }>()
);

export const ngPatSetLocalStorageItem = createAction(
  '[NgPatLocalStorageItem/API] Set NgPatLocalStorageItem',
  props<{ localStorageItem: NgPatLocalStorageItem }>()
);

export const ngPatAddLocalStorageItems = createAction(
  '[NgPatLocalStorageItem/API] Add LocalStorageItems',
  props<{ localStorageItems: NgPatLocalStorageItem[] }>()
);

export const ngPatDoDisconnectAndRemoveLocalStorageItem = createAction(
  '[NgPatLocalStorageItem/API] Delete NgPatLocalStorageItem',
  props<{ id: string }>()
);

export const ngPatRemoveLocalStorageItems = createAction(
  '[NgPatLocalStorageItem/API] Delete LocalStorageItems',
  props<{ ids: string[] }>()
);

export const ngPatClearLocalStorageItems = createAction(
  '[NgPatLocalStorageItem/API] Clear LocalStorageItems'
);
