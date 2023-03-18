import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';

export enum DIALOG_COMPONENT {
  ONBOARD = 'onboard',
  PRESENCE_IDLE = 'presence',
  PRESENCE_OFFLINE = 'presenceDisconnect',
  TRIAL_EXPIRED = 'trialExpired',
  ABOUT = 'about',
  NONE = 'none'
}

export interface NgPatDialogQueue {
  id: DIALOG_COMPONENT;
  isOpen: boolean;
  message?: string;
}

export const ngPatDialogQueuesFeatureKey = 'ngPatDialogQueue';

export interface NgPatDialogQueueState extends EntityState<NgPatDialogQueue> {
  // additional entities state properties
  isLoaded: boolean;
}

export interface PartialDialogQueueState {
  readonly [ngPatDialogQueuesFeatureKey]: NgPatDialogQueueState;
}

export const dialogQueueEntityAdapter: EntityAdapter<NgPatDialogQueue> =
  createEntityAdapter<NgPatDialogQueue>();

export const ngPatInitialDialogQueueState: NgPatDialogQueueState =
  dialogQueueEntityAdapter.getInitialState({
    // additional entity state properties
    isLoaded: false
  });

export const ngPatInitialDialogQueue: NgPatDialogQueue[] = [
  {
    id: DIALOG_COMPONENT.PRESENCE_IDLE,
    isOpen: false
  },
  {
    id: DIALOG_COMPONENT.PRESENCE_OFFLINE,
    isOpen: false
  },
  {
    id: DIALOG_COMPONENT.ONBOARD,
    isOpen: false
  },
  {
    id: DIALOG_COMPONENT.TRIAL_EXPIRED,
    isOpen: false
  },
  {
    id: DIALOG_COMPONENT.ABOUT,
    isOpen: false
  }
];
