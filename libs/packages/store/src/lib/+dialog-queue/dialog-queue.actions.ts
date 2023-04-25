import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { NG_PAT_DIALOG_ITEM, NgPatDialog } from './dialog-queue.model';

export const ngPatLoadDialogs = createAction(
  '[NgPatDialog/API] Load Dialogs',
  props<{ dialogs: NgPatDialog[] }>()
);

export const ngPatAddDialog = createAction(
  '[NgPatDialog/API] Add NgPatDialog',
  props<{ dialog: NgPatDialog }>()
);

export const ngPatUpsertDialog = createAction(
  '[NgPatDialog/API] Upsert NgPatDialog',
  props<{ dialog: NgPatDialog }>()
);

export const ngPatAddDialogs = createAction(
  '[NgPatDialog/API] Add Dialogs',
  props<{ dialogs: NgPatDialog[] }>()
);

export const ngPatUpsertDialogs = createAction(
  '[NgPatDialog/API] Upsert Dialogs',
  props<{ dialogs: NgPatDialog[] }>()
);

export const ngPatUpdateDialog = createAction(
  '[NgPatDialog/API] Update NgPatDialog',
  props<{ dialog: Update<NgPatDialog> }>()
);

export const ngPatUpdateDialogs = createAction(
  '[NgPatDialog/API] Update Dialogs',
  props<{ dialogs: Update<NgPatDialog>[] }>()
);

export const ngPatDeleteDialog = createAction(
  '[NgPatDialog/API] Delete NgPatDialog',
  props<{ id: string }>()
);

export const ngPatDeleteDialogs = createAction(
  '[NgPatDialog/API] Delete Dialogs',
  props<{ ids: string[] }>()
);

export const ngPatcClearDialogs = createAction(
  '[NgPatDialog/API] Clear Dialogs'
);

export const ngPatOpenDialog = createAction(
  '[NgPatDialog/API] Open Dialog',
  props<{ id: NG_PAT_DIALOG_ITEM }>()
);
export const ngPatCloseDialog = createAction(
  '[NgPatDialog/API] Close Dialog',
  props<{ id: NG_PAT_DIALOG_ITEM; destroy?: boolean }>()
);
