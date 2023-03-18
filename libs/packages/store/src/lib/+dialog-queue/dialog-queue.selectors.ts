import {
  DIALOG_COMPONENT,
  NgPatDialogQueue,
  ngPatDialogQueuesFeatureKey,
  NgPatDialogQueueState
} from './dialog-queue.model';
import {createFeatureSelector, createSelector, select} from '@ngrx/store';
import {pipe} from 'rxjs';
import {distinctUntilChanged, filter, map} from 'rxjs/operators';

export const selectNgPatDialogQueueFeatureState =
  createFeatureSelector<NgPatDialogQueueState>(ngPatDialogQueuesFeatureKey);

export const selectNgPatAllDialogs = createSelector(
  selectNgPatDialogQueueFeatureState,
  (state: NgPatDialogQueueState): NgPatDialogQueue[] => {
    if (state && state.entities) {
      return Object.values(state.entities) as NgPatDialogQueue[];
    }

    return [];
  }
);

export const selectNgPatOpenNextDialog = createSelector(
  selectNgPatAllDialogs,
  (dialogs: NgPatDialogQueue[]): NgPatDialogQueue => {
    const dialog = dialogs.find((d: NgPatDialogQueue) => d.isOpen);
    if (!dialog) {
      return {
        id: DIALOG_COMPONENT.NONE,
        isOpen: false
      };
    }

    return dialog;
  }
);

export const ngPatDialogsStoreIsLoaded$ = pipe(
  select(selectNgPatDialogQueueFeatureState),
  map((state: NgPatDialogQueueState) => state.isLoaded),
  filter((isLoaded: boolean) => isLoaded),
  distinctUntilChanged()
);

// export const destroyDialogStream = (dialogId: DIALOG_COMPONENT) => {
//   return createPassThroughSelector(selectAllDialogs_PassThrough, (dialogs: NgPatDialogQueue[]): boolean => {
//     const dialog = dialogs.find((d: NgPatDialogQueue) => d.id === dialogId);
//
//     if (dialog === undefined || dialog === null) {
//       return false;
//     }
//
//     return dialog.destroy;
//   });
// };

export const selectNgPatGetDialogIsOpenById = (dialogId: DIALOG_COMPONENT) => {
  return createSelector(
    selectNgPatAllDialogs,
    (dialogs: NgPatDialogQueue[]): boolean => {
      const dialog = dialogs.find((d: NgPatDialogQueue) => d.id === dialogId);

      return dialog !== undefined && dialog.isOpen;
    }
  );
};
