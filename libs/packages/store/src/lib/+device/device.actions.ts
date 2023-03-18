import {createAction, props} from '@ngrx/store';
import {IResult} from 'ua-parser-js';

export const ngPatLoadDevices = createAction(
  '[Device] Load Devices',
  props<{device: IResult}>()
);

export const ngPatInitDevice = createAction('[Device] Init');
