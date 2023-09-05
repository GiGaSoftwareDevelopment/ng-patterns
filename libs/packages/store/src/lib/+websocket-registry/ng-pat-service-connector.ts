import { Store } from '@ngrx/store';
import { combineLatest, ReplaySubject, Subject } from 'rxjs';
import { distinctUntilChanged, filter, take, takeUntil } from 'rxjs/operators';
import { NgPatAccountState, NgPatAccountStateConnect } from '../+account/account.model';
import { selectNgPatAccountState, selectNgPatIsUserAuthenticated } from '../+account/account.selectors';
import {
  ngPatDeleteWebsocketRegistry,
  ngPatUpsertWebsocketRegistry,
  ngPatWebsocketIsConnectedAction,
  ngPatWebsocketIsDisconnectedAction
} from './websocket-registry.actions';
import { NgPatFirebaseConnectionService } from './websocket-registry.models';
import { connectNgPatToFirestore$ } from './websocket-registry.selectors';

/**
 * This class is used to connect a service to firestore.
 * The service must implement NgPatFirebaseConnectionService.
 */
export class NgPatServiceConnector {

  onConnect$: ReplaySubject<NgPatAccountState> = new ReplaySubject(1);
  onDisconnect$: ReplaySubject<NgPatAccountState> = new ReplaySubject(1);
  isConnected$: ReplaySubject<boolean> = new ReplaySubject(1);
  notConnected$: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);

  private _onDestroy$: Subject<boolean> = new Subject();


  /**
   * Indicates if the service has been initialized.
   * This is not really used yet.
   * @private
   */
  private _isInitialized = false;

  get isInitialized(): boolean {
    return this._isInitialized;
  }
  set isInitialized(value: boolean) {
    this._isInitialized = value;
  }

  /**
   * The unique key for this service.
   * This allows lazy initialization of the service.
   * @private
   */
  private _connectionKey = '';

  get connectionKey(): string {
    return this._connectionKey;
  }
  set connectionKey(connectionKey: string) {

    if (this.isInitialized && this.hasConnectionKey && this._connectionKey !== connectionKey) {
      this.destroy();
    }

    this._connectionKey = connectionKey;

    this.initialize.call(this);
  }

  get hasConnectionKey(): boolean {
    return this.connectionKey !== null && this.connectionKey !== undefined && this.connectionKey.length > 0;
  }

  constructor(
    public service: NgPatFirebaseConnectionService,
    private store: Store
  ) {


    if (this.service.connectionKey !== null && this.service.connectionKey !== undefined && this.service.connectionKey.length > 0) {
      this.connectionKey = this.service.connectionKey;
    }

  }

  private initialize() {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const that = this;




    this.isInitialized = true;

    this.registerWebsocketKey();


    if (this.service.ngPatOnInit) {
      this.service.ngPatOnInit.call(this.service);
    }


    this.onConnect$
      .pipe(takeUntil(this._onDestroy$))
      .subscribe((user: NgPatAccountState) => {

        that.store.dispatch(
          ngPatWebsocketIsConnectedAction({
            id: <string>this.connectionKey
          })
        );
        that.service.onConnect.call(that.service, user);
      });

    this.onDisconnect$
      .pipe(takeUntil(this._onDestroy$))
      .subscribe((user: NgPatAccountState) => {
        that.service.onDisconnect.call(that.service, user);

        // call onDisconnect before keyIsDisconnected
        // that.connector.keyIsDisconnected(that.service.connectionKey);
        that.store.dispatch(
          ngPatWebsocketIsDisconnectedAction({
            id: <string>this.connectionKey
          })
        );
      });

    /**
     * This service receives the user account information.
     *
     * Some services are dependent on information from the user account.
     * Therefore, the user account is needed from firestore first ( even upon creation )
     * before all services can connect to firestore.
     *
     * The rest of the services listen to 'doConnect' rather than 'isAuthenticated' to
     * connect to firestore to ensure the user's complete account profile is used
     * upon connection.
     */
    combineLatest([
      this.store.select(selectNgPatIsUserAuthenticated).pipe(
        distinctUntilChanged<boolean>()
        // filter((isAuthenticated: boolean) => isAuthenticated)
      ),
      this.store.pipe(
        connectNgPatToFirestore$
        // filter((account: AccountStateConnect) => account.doConnect)
      )
    ])
      .pipe(takeUntil(this._onDestroy$))
      .subscribe(
        ([ isAuthenticated, account ]: [ boolean, NgPatAccountStateConnect ]) => {
          if (isAuthenticated && account.doConnect) {
            this.onConnect$.next(account.user);
            this.isConnected$.next(true);
            this.notConnected$.next(false);
          }
        }
      );

    combineLatest([
      this.store.select(selectNgPatIsUserAuthenticated).pipe(
        distinctUntilChanged<boolean>(),
        filter((isAuthenticated: boolean) => isAuthenticated)
      ),
      this.store.pipe(connectNgPatToFirestore$)
    ])
      .pipe(takeUntil(this._onDestroy$))
      .subscribe(
        ([ isAuthenticated, account ]: [ boolean, NgPatAccountStateConnect ]) => {
          if (isAuthenticated && !account.doConnect) {
            this.onDisconnect$.next(account.user);
            this.isConnected$.next(false);
            this.notConnected$.next(true);
          }
        }
      );
  }

  registerWebsocketKey() {
    if (this.hasConnectionKey) {
      this.store.dispatch(
        ngPatUpsertWebsocketRegistry({
          id: <string>this.connectionKey
        })
      );
    }
  }

  keyIsConnected() {
    if (this.hasConnectionKey) {
      this.store.dispatch(
        ngPatWebsocketIsConnectedAction({
          id: <string>this.connectionKey
        })
      );
    }
  }

  keyIsDisconnected() {
    if (this.hasConnectionKey) {
      this.store.dispatch(
        ngPatWebsocketIsDisconnectedAction({
          id: <string>this.connectionKey
        })
      );
    }
  }

  deleteKey() {
    if (this.hasConnectionKey) {
      this.store.dispatch(
        ngPatDeleteWebsocketRegistry({
          id: <string>this.connectionKey
        })
      );
    }
  }

  setConnectionKey(key: string) {
    this.connectionKey = key;
  }



  destroy() {
    this.isInitialized = false;

    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const that = this;
    this._onDestroy$.next(true);
    this.store.select(selectNgPatAccountState).pipe(take(1)).subscribe((user: NgPatAccountState) => {
      that.service.onDisconnect(user);
      // that.connector.deleteKey(that.service.connectionKey);
      if (this.hasConnectionKey) {
        that.store.dispatch(
          ngPatDeleteWebsocketRegistry({
            id: <string>that.connectionKey
          })
        );
      }

    });
  }
}
