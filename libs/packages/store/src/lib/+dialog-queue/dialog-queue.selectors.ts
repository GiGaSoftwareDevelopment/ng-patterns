import {
  NG_PAT_DIALOG_ITEM,
  NgPatDialog,
  ngPatDialogsFeatureKey,
  NgPatDialogState
} from './dialog-queue.model';
import { createFeatureSelector, createSelector, select } from '@ngrx/store';
import { pipe } from 'rxjs';
import { distinctUntilChanged, filter, map } from 'rxjs/operators';

export const selectNgPatDialogFeatureState =
  createFeatureSelector<NgPatDialogState>(ngPatDialogsFeatureKey);

export const selectNgPatAllDialogs = createSelector(
  selectNgPatDialogFeatureState,
  (state: NgPatDialogState): NgPatDialog[] => {
    if (state && state.entities) {
      return Object.values(state.entities) as NgPatDialog[];
    }

    return [];
  }
);

export const selectNgPatOpenNextDialog = createSelector(
  selectNgPatAllDialogs,
  (dialogs: NgPatDialog[]): NgPatDialog => {
    const dialog = dialogs.find((d: NgPatDialog) => d.isOpen);
    if (!dialog) {
      return {
        id: NG_PAT_DIALOG_ITEM.NONE,
        isOpen: false
      };
    }

    return dialog;
  }
);

export const ngPatDialogsStoreIsLoaded$ = pipe(
  select(selectNgPatDialogFeatureState),
  map((state: NgPatDialogState) => state.isLoaded),
  filter((isLoaded: boolean) => isLoaded),
  distinctUntilChanged()
);

// export const destroyDialogStream = (dialogId: NG_PAT_DIALOG_ITEM) => {
//   return createPassThroughSelector(selectAllDialogs_PassThrough, (dialogs: NgPatDialog[]): boolean => {
//     const dialog = dialogs.find((d: NgPatDialog) => d.id === dialogId);
//
//     if (dialog === undefined || dialog === null) {
//       return false;
//     }
//
//     return dialog.destroy;
//   });
// };

export const selectNgPatGetDialogIsOpenById = (
  dialogId: NG_PAT_DIALOG_ITEM
) => {
  return createSelector(
    selectNgPatAllDialogs,
    (dialogs: NgPatDialog[]): boolean => {
      const dialog = dialogs.find((d: NgPatDialog) => d.id === dialogId);

      return dialog !== undefined && dialog.isOpen;
    }
  );
};
