import { createFeatureSelector, createSelector, select } from '@ngrx/store';
import * as fromDevice from './device.reducer';
import { NgPatDeviceState } from './device.model';
import { distinctUntilKeyChanged, filter, map } from 'rxjs/operators';
import { pipe } from 'rxjs';

export const selectNgPatDeviceState = createFeatureSelector<NgPatDeviceState>(
  fromDevice.ngPatDeviceFeatureKey
);

export const selectNgPatIsMobile = createSelector(
  selectNgPatDeviceState,
  (state: NgPatDeviceState) => {
    return state.isNativePlatform;
  }
);

export const ngPatIsMobile$ = pipe(
  select(selectNgPatDeviceState),
  distinctUntilKeyChanged('isLoaded'),
  filter((state: NgPatDeviceState) => state.isLoaded),
  map((state: NgPatDeviceState) => {
    return state.isNativePlatform;
  })
);
