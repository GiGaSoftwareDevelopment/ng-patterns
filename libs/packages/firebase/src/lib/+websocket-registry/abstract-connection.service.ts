import {FirestoreWebSocketConnectorService} from './firestore-web-socket-connector.service';
import {FirebaseConnectionService} from './websocket-registry.models';
import {AccountState} from '../+account/account.model';
import {Store} from '@ngrx/store';
import {selectAccountState} from '../+account/account.selectors';
import {take} from 'rxjs/operators';
import {Observable} from 'rxjs';

export abstract class AbstractConnectionService
  implements FirebaseConnectionService
{
  constructor(
    protected _featureKey: string,
    protected _connector: FirestoreWebSocketConnectorService,
    protected store: Store
  ) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const that = this;

    this._connector.registerWebsocketKey(this._featureKey);

    this._connector.onConnect$.subscribe((user: AccountState) => {
      this.onConnect.call(that, user);
    });

    this._connector.onDisconnect$.subscribe((user: AccountState) => {
      this.onDisconnect.call(that, user);
    });
  }

  abstract onConnect(user: AccountState): void;
  abstract onDisconnect(user: AccountState): void;

  selectUser(): Observable<AccountState> {
    return this.store.select(selectAccountState).pipe(take(1));
  }

  destroy() {
    this.selectUser().subscribe((user: AccountState) => {
      this.onDisconnect(user);
    });
  }
}
