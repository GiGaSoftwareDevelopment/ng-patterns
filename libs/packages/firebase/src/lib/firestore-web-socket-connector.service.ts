import { Injectable, NgZone } from '@angular/core';
import { combineLatest, ReplaySubject } from 'rxjs';
import { AccountState, AccountStateConnect } from './+account/account.model';
import { Store } from '@ngrx/store';
import { distinctUntilChanged, filter } from 'rxjs/operators';
import { selectIsUserAuthenticated } from './+account/account.selectors';
import { connectToFirestore$ } from './+websocket-registry/websocket-registry.selectors';
import {
  deleteWebsocketRegistry,
  upsertWebsocketRegistry,
  websocketIsConnectedAction,
  websocketIsDisconnectedAction
} from './+websocket-registry/websocket-registry.actions';

@Injectable({
  providedIn: 'root'
})
export class FirestoreWebSocketConnectorService {
  // private _onConnect$: ReplaySubject<AccountState> = new ReplaySubject<AccountState>(1);
  onConnect$: ReplaySubject<AccountState> = new ReplaySubject(1);
  onDisconnect$: ReplaySubject<AccountState> = new ReplaySubject(1);
  isConnected$: ReplaySubject<boolean> = new ReplaySubject(1);
  notConnected$: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);

  constructor(private store: Store, private zone: NgZone) {
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
      this.store.select(selectIsUserAuthenticated).pipe(
        distinctUntilChanged<boolean>()
        // filter((isAuthenticated: boolean) => isAuthenticated)
      ),
      this.store.pipe(
        connectToFirestore$
        // filter((account: AccountStateConnect) => account.doConnect)
      )
    ]).subscribe(
      ([ isAuthenticated, account ]: [ boolean, AccountStateConnect ]) => {
        if (isAuthenticated && account.doConnect) {
          this.onConnect$.next(account.user);
          this.isConnected$.next(true);
          this.notConnected$.next(false);
        }
      }
    );

    combineLatest([
      this.store.select(selectIsUserAuthenticated).pipe(
        distinctUntilChanged<boolean>(),
        filter((isAuthenticated: boolean) => isAuthenticated)
      ),
      this.store.pipe(connectToFirestore$)
    ]).subscribe(
      ([ isAuthenticated, account ]: [ boolean, AccountStateConnect ]) => {
        if (isAuthenticated && !account.doConnect) {
          this.onDisconnect$.next(account.user);
          this.isConnected$.next(false);
          this.notConnected$.next(true);
        }
      }
    );
  }

  registerWebsocketKey(key: string) {
    this.zone.run(() => {
      this.store.dispatch(
        upsertWebsocketRegistry({
          id: key
        })
      );
    });
  }

  keyIsConnected(key: string) {
    this.zone.run(() => {
      this.store.dispatch(
        websocketIsConnectedAction({
          id: key
        })
      );
    });
  }

  keyIsDisconnected(key: string) {
    this.zone.run(() => {
      this.store.dispatch(
        websocketIsDisconnectedAction({
          id: key
        })
      );
    });
  }

  deleteKey(key: string) {
    this.zone.run(() => {
      this.store.dispatch(
        deleteWebsocketRegistry({
          id: key
        })
      );
    });
  }
}
