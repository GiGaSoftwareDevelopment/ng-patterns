import { createAction, props } from '@ngrx/store';
import { NgPatDeviceState } from './device.model';

export const ngPatLoadDevices = createAction(
  '[Device] Load Devices',
  props<{ device: NgPatDeviceState }>()
);

export const ngPatInitDevice = createAction('[Device] Init');
