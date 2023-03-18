import {createAction, props} from '@ngrx/store';
import {Update} from '@ngrx/entity';
import {DIALOG_COMPONENT, NgPatDialogQueue} from './dialog-queue.model';

export const ngPatLoadDialogQueues = createAction(
  '[NgPatDialogQueue/API] Load DialogQueues',
  props<{dialogQueues: NgPatDialogQueue[]}>()
);

export const ngPatAddDialogQueue = createAction(
  '[NgPatDialogQueue/API] Add NgPatDialogQueue',
  props<{dialogQueue: NgPatDialogQueue}>()
);

export const ngPatUpsertDialogQueue = createAction(
  '[NgPatDialogQueue/API] Upsert NgPatDialogQueue',
  props<{dialogQueue: NgPatDialogQueue}>()
);

export const ngPatAddDialogQueues = createAction(
  '[NgPatDialogQueue/API] Add DialogQueues',
  props<{dialogQueues: NgPatDialogQueue[]}>()
);

export const ngPatUpsertDialogQueues = createAction(
  '[NgPatDialogQueue/API] Upsert DialogQueues',
  props<{dialogQueues: NgPatDialogQueue[]}>()
);

export const ngPatUpdateDialogQueue = createAction(
  '[NgPatDialogQueue/API] Update NgPatDialogQueue',
  props<{dialogQueue: Update<NgPatDialogQueue>}>()
);

export const ngPatUpdateDialogQueues = createAction(
  '[NgPatDialogQueue/API] Update DialogQueues',
  props<{dialogQueues: Update<NgPatDialogQueue>[]}>()
);

export const ngPatDeleteDialogQueue = createAction(
  '[NgPatDialogQueue/API] Delete NgPatDialogQueue',
  props<{id: string}>()
);

export const ngPatDeleteDialogQueues = createAction(
  '[NgPatDialogQueue/API] Delete DialogQueues',
  props<{ids: string[]}>()
);

export const ngPatcClearDialogQueues = createAction(
  '[NgPatDialogQueue/API] Clear DialogQueues'
);

export const ngPatOpenDialog = createAction(
  '[NgPatDialogQueue/API] Open Dialog',
  props<{id: DIALOG_COMPONENT}>()
);
export const ngPatCloseDialog = createAction(
  '[NgPatDialogQueue/API] Close Dialog',
  props<{id: DIALOG_COMPONENT; destroy?: boolean}>()
);
