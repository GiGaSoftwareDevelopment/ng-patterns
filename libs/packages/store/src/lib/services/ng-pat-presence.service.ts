import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, InjectionToken, NgZone } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  BehaviorSubject,
  combineLatest,
  fromEvent,
  Subject,
  timer
} from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  distinctUntilKeyChanged,
  filter,
  mergeMap,
  startWith,
  takeUntil,
  tap
} from 'rxjs/operators';

import { ConnectionStatus, Network } from '@capacitor/network';
import {
  ngPatNextDialog,
  ngPatOpenDialog
} from '../+dialog-queue/dialog-queue.actions';
import { NG_PAT_DIALOG_ITEM } from '../+dialog-queue/dialog-queue.model';

import { selectNgPatDeviceState } from '../+device';
import { minToMs } from '@ngpat/date';
import {
  ngPatServiceDoConnectAction,
  ngPatServiceDoDisconnectAction
} from '../+websocket-registry/websocket-registry.actions';
import { NgPatDeviceState } from '../+device/device.model';

function _window(): any {
  // return the global native local window object
  return window;
}

enum ACTIVE_STATUS {
  ACTIVE = 'active',
  OFFLINE = 'offline',
  IDLE = 'idle'
}

export interface NgPatPresenceConfig {
  /**
   * Defaults to 10 minutes
   */
  timerInMinutes: number;
}

export const NG_PAT_PRESENCE_CONFIG: InjectionToken<NgPatPresenceConfig> =
  new InjectionToken<NgPatPresenceConfig>('NG_PAT_PRESENCE_CONFIG', {
    providedIn: 'root',
    factory: () => {
      return {
        timerInMinutes: 10
      };
    }
  });

@Injectable({
  providedIn: 'root'
})
export class NgPatPresenceService {
  private _stopTimer$: Subject<boolean> = new Subject<boolean>();
  private _windowOnline$: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(true);
  private _activeStatus$: BehaviorSubject<string> = new BehaviorSubject<string>(
    ACTIVE_STATUS.ACTIVE
  );

  constructor(
    private store: Store,
    private _zone: NgZone,
    @Inject(DOCUMENT) private document: Document,
    @Inject(NG_PAT_PRESENCE_CONFIG) private config: NgPatPresenceConfig
  ) {}

  /**
   * Called from Dialogue Queue Effects service ngrxOnInitEffects
   */
  init(): void {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const that = this;

    this._activeStatus$
      .pipe(distinctUntilChanged())
      .subscribe((status: string) => {
        if (status === ACTIVE_STATUS.ACTIVE) {
          // console.log('active');
          that._zone.run(() => {
            // that.store.dispatch(
            //   ngPatCloseDialog({ id: NG_PAT_DIALOG_ITEM.PRESENCE_IDLE })
            // );
            that.store.dispatch(ngPatNextDialog());
            that.store.dispatch(ngPatServiceDoConnectAction());
          });
        }

        if (status === ACTIVE_STATUS.OFFLINE) {
          that._stopTimer$.next(true);
          that._zone.run(() => {
            that.store.dispatch(
              ngPatOpenDialog({ id: NG_PAT_DIALOG_ITEM.PRESENCE_OFFLINE })
            );
            that.store.dispatch(ngPatServiceDoDisconnectAction());
          });
        }

        if (status === ACTIVE_STATUS.IDLE) {
          // console.log('idle');
          that._stopTimer$.next(true);
          that._zone.run(() => {
            that.store.dispatch(
              ngPatOpenDialog({ id: NG_PAT_DIALOG_ITEM.PRESENCE_IDLE })
            );
            that.store.dispatch(ngPatServiceDoDisconnectAction());
          });
        }
      });

    /**
     * Mobile can not detect a mouse event, so this
     * is to register activity from the user.
     */
    // const routerEvent$ = this._router.events.pipe(
    //   filter((e: any) => e instanceof NavigationEnd),
    //   debounceTime(500)
    // );

    /**
     * If the user is on the same page for a long time
     * we can see if there are interactive with the app.
     */
    const touchEnd$ = fromEvent(this.document, 'touchend').pipe(
      startWith('fake touchend')
    );
    /**
     * In a local, we can detect mouse events.
     */
    const mouseEvent$ = fromEvent(this.document, 'mousedown').pipe(
      startWith('fake mousedown')
    );

    combineLatest([touchEnd$, mouseEvent$])
      .pipe(
        tap(() => {
          that._stopTimer$.next(true);
        }),
        debounceTime(500),
        mergeMap((e: any) => {
          // console.log(e);
          return this._windowOnline$.pipe(
            tap((windowOnline: boolean) => {
              // console.log('windowOnline', windowOnline);
              if (windowOnline) {
                this._activeStatus$.next(ACTIVE_STATUS.ACTIVE);
              }
            }),
            filter((windowOnline: boolean) => windowOnline),
            mergeMap(() => {
              // console.log('windowOnline');
              return timer(minToMs(this.config.timerInMinutes)).pipe(
                takeUntil(this._stopTimer$)
              );
            })
          );
        })
      )
      .subscribe(() => {
        // console.log('idle');
        this._activeStatus$.next(ACTIVE_STATUS.IDLE);
      });

    this.store
      .select(selectNgPatDeviceState)
      .pipe(
        distinctUntilKeyChanged('isLoaded'),
        filter((state: NgPatDeviceState) => state.isLoaded)
        // map((state: NgPatDeviceState) => {
        //   return (
        //     state.device?.os?.name?.includes('iOS') ||
        //     state.device?.os?.name?.includes('Android')
        //   );
        // })
      )
      .subscribe((state: NgPatDeviceState) => {
        if (state.isNativePlatform) {
          Network.addListener(
            'networkStatusChange',
            (status: ConnectionStatus) => {
              if (status.connected) {
                // console.log('online', e);
                // this._windowOnline$.next(true);
                // this._activeStatus$.next(ACTIVE_STATUS.ACTIVE);
              } else {
                // console.log('offline', e);
                // this._windowOnline$.next(false);
                // this._activeStatus$.next(ACTIVE_STATUS.OFFLINE);
              }
            }
          );
        } else {
          fromEvent(_window(), 'online').subscribe((e: any) => {
            // console.log('online', e);
            // this._windowOnline$.next(true);
            // this._activeStatus$.next(ACTIVE_STATUS.ACTIVE);
          });

          fromEvent(_window(), 'offline').subscribe((e: any) => {
            // console.log('offline', e);
            // this._windowOnline$.next(false);
            // this._activeStatus$.next(ACTIVE_STATUS.OFFLINE);
          });
        }
      });

    this._zone.run(() => {
      // that.store.dispatch(
      //   ngPatCloseDialog({ id: NG_PAT_DIALOG_ITEM.PRESENCE_IDLE })
      // );
      that.store.dispatch(ngPatNextDialog());
      that.store.dispatch(ngPatServiceDoConnectAction());
      // Initialize without mouse event
      this._windowOnline$.next(true);
      this._activeStatus$.next(ACTIVE_STATUS.ACTIVE);

      // document.body.click();
    });
  }

  // TODO
  isProcessing() {
    /* noop */
  }
}
