import {Injectable, NgZone} from '@angular/core';
import {combineLatest, ReplaySubject} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {distinctUntilChanged, filter} from 'rxjs/operators';
import {selectNgPatIsUserAuthenticated} from '../+account/account.selectors';
import {
  NgPatAccountState,
  NgPatAccountStateConnect
} from '../+account/account.model';
import {connectNgPatToFirestore$} from '../+websocket-registry/websocket-registry.selectors';
import {
  ngPatDeleteWebsocketRegistry,
  ngPatUpsertWebsocketRegistry,
  ngPatWebsocketIsConnectedAction,
  ngPatWebsocketIsDisconnectedAction
} from '../+websocket-registry/websocket-registry.actions';

/**
 * @deprecated use NgPatServiceConnector instead
 */
@Injectable({
  providedIn: 'root'
})
export class NgPatFirestoreWebSocketConnectorService {
  // private _onConnect$: ReplaySubject<AccountState> = new ReplaySubject<AccountState>(1);
  onConnect$: ReplaySubject<NgPatAccountState> = new ReplaySubject(1);
  onDisconnect$: ReplaySubject<NgPatAccountState> = new ReplaySubject(1);
  isConnected$: ReplaySubject<boolean> = new ReplaySubject(1);
  notConnected$: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);

  constructor(private store: Store) {
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
    ]).subscribe(
      ([isAuthenticated, account]: [boolean, NgPatAccountStateConnect]) => {
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
    ]).subscribe(
      ([isAuthenticated, account]: [boolean, NgPatAccountStateConnect]) => {
        if (isAuthenticated && !account.doConnect) {
          this.onDisconnect$.next(account.user);
          this.isConnected$.next(false);
          this.notConnected$.next(true);
        }
      }
    );
  }

  registerWebsocketKey(key: string) {
    this.store.dispatch(
        ngPatUpsertWebsocketRegistry({
          id: key
        })
    );
  }

  keyIsConnected(key: string) {
    this.store.dispatch(
        ngPatWebsocketIsConnectedAction({
          id: key
        })
    );
  }

  keyIsDisconnected(key: string) {
    this.store.dispatch(
        ngPatWebsocketIsDisconnectedAction({
          id: key
        })
    );
  }

  deleteKey(key: string) {
    this.store.dispatch(
        ngPatDeleteWebsocketRegistry({
          id: key
        })
    );
  }
}
