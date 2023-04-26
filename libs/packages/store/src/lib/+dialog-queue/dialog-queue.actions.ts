import { createAction, props } from '@ngrx/store';

export const ngPatLoadDialogs = createAction('[NgPatDialog/API] Load Dialogs');

export const ngPatOpenDialog = createAction(
  '[NgPatDialog/API] Open Dialog',
  props<{ id: string }>()
);
