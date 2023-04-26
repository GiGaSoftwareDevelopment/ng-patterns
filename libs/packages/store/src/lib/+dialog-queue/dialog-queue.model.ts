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

export interface NgPatDialogID {
  id: NG_PAT_DIALOG_ITEM;
}

export const NG_PAT_LOAD_DIALOGS: InjectionToken<NgPatDialog[]> =
  new InjectionToken<NgPatDialog[]>('NG_PAT_LOAD_DIALOGS', {
    providedIn: 'root',
    factory: () => {
      return [];
    }
  });
