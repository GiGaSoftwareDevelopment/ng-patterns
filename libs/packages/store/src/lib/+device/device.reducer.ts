import { Action, createReducer, on } from '@ngrx/store';
import * as DeviceActions from './device.actions';
import { NgPatDeviceState } from './device.model';

export const ngPatDeviceFeatureKey = 'ngPat_Device';

export const ngPatInitialDeviceState: NgPatDeviceState = {
  isLoaded: false,
  isNativePlatform: false,
  web: true,
  ios: false,
  android: false
};

export const ngPatDeviceReducer = createReducer(
  ngPatInitialDeviceState,

  on(DeviceActions.ngPatLoadDevices, (state, action): NgPatDeviceState => {
    return {
      ...state,
      ...action.device,
      isLoaded: true
    };
  })
);
