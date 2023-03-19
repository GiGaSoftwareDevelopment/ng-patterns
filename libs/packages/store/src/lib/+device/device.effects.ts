import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { Capacitor } from '@capacitor/core';
import { concatMap, map } from 'rxjs/operators';
import { Observable, EMPTY } from 'rxjs';
import * as DeviceActions from './device.actions';
import { Action } from '@ngrx/store';
import { ngPatInitDevice } from './device.actions';

@Injectable()
export class NgPatDeviceEffects implements OnInitEffects {
  loadDevices$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(DeviceActions.ngPatLoadDevices),
      /** An EMPTY observable only emits completion. Replace with your own observable API request */
      concatMap(() => EMPTY as Observable<{ type: string }>)
    );
  });

  initDevice$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ngPatInitDevice),
      map(() => {
        return DeviceActions.ngPatLoadDevices({
          device: {
            isLoaded: true,
            isNativePlatform: Capacitor.isNativePlatform(),
            web: Capacitor.getPlatform() === 'web',
            ios: Capacitor.getPlatform() === 'ios',
            android: Capacitor.getPlatform() === 'android'
          }
        });
      })
    );
  });

  constructor(private actions$: Actions) {}

  ngrxOnInitEffects(): Action {
    return ngPatInitDevice();
  }
}
