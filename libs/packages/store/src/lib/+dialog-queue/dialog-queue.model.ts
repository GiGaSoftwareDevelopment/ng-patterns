import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { InjectionToken } from '@angular/core';

export enum NG_PAT_DIALOG_ITEM {
  ONBOARD = 'onboard',
  PRESENCE_IDLE = 'presence',
  PRESENCE_OFFLINE = 'presenceDisconnect',
  TRIAL_EXPIRED = 'trialExpired',
  ABOUT = 'about',
  NONE = 'none'
}

export interface NgPatDialog {
  id: string;
  isOpen: boolean;
  message?: string;
}

export const ngPatDialogsFeatureKey = 'ngPatDialog';

export const NG_PAT_LOAD_DIALOGS: InjectionToken<NgPatDialog[]> =
  new InjectionToken<NgPatDialog[]>('NG_PAT_LOAD_DIALOGS', {
    providedIn: 'root',
    factory: () => {
      return [];
    }
  });

export interface NgPatDialogState extends EntityState<NgPatDialog> {
  // additional entities state properties
  isLoaded: boolean;
}

export const dialogEntityAdapter: EntityAdapter<NgPatDialog> =
  createEntityAdapter<NgPatDialog>();

export const ngPatInitialDialogState: NgPatDialogState =
  dialogEntityAdapter.getInitialState({
    // additional entity state properties
    isLoaded: false
  });

export const ngPatInitialDialog: NgPatDialog[] = [
  {
    id: NG_PAT_DIALOG_ITEM.PRESENCE_IDLE,
    isOpen: false
  },
  {
    id: NG_PAT_DIALOG_ITEM.PRESENCE_OFFLINE,
    isOpen: false
  }
  // {
  //   id: NG_PAT_DIALOG_ITEM.ONBOARD,
  //   isOpen: false
  // },
  // {
  //   id: NG_PAT_DIALOG_ITEM.TRIAL_EXPIRED,
  //   isOpen: false
  // },
  // {
  //   id: NG_PAT_DIALOG_ITEM.ABOUT,
  //   isOpen: false
  // }
];
