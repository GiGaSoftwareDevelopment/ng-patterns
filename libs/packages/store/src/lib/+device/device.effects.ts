import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType, OnInitEffects} from '@ngrx/effects';

import {concatMap, map} from 'rxjs/operators';
import {Observable, EMPTY} from 'rxjs';

import * as DeviceActions from './device.actions';
import {Action} from '@ngrx/store';
import {ngPatInitDevice} from './device.actions';
import * as UAParser from 'ua-parser-js';

@Injectable()
export class NgPatDeviceEffects implements OnInitEffects {
  loadDevices$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(DeviceActions.ngPatLoadDevices),
      /** An EMPTY observable only emits completion. Replace with your own observable API request */
      concatMap(() => EMPTY as Observable<{type: string}>)
    );
  });

  initDevice$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ngPatInitDevice),
      map(() => {
        const parser = new UAParser();
        const result = parser.getResult();

        return DeviceActions.ngPatLoadDevices({
          device: result
        });
      })
    );
  });

  constructor(private actions$: Actions) {}

  ngrxOnInitEffects(): Action {
    return ngPatInitDevice();
  }
}
