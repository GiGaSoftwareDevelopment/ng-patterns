import { NgPatFirestoreWebSocketConnectorService } from './ng-pat-firestore-web-socket-connector.service';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { NgPatFirebaseConnectionService } from '../+websocket-registry/websocket-registry.models';
import { NgPatAccountState } from '../+account/account.model';
import { selectNgPatAccountState } from '../+account/account.selectors';

export abstract class AbstractConnectionService
  implements NgPatFirebaseConnectionService
{
  constructor(
    protected _featureKey: string,
    protected _connector: NgPatFirestoreWebSocketConnectorService,
    protected store: Store
  ) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const that = this;

    this._connector.registerWebsocketKey(this._featureKey);

    this._connector.onConnect$.subscribe((user: NgPatAccountState) => {
      this.onConnect.call(that, user);
    });

    this._connector.onDisconnect$.subscribe((user: NgPatAccountState) => {
      this.onDisconnect.call(that, user);
    });
  }

  abstract onConnect(user: NgPatAccountState): void;
  abstract onDisconnect(user: NgPatAccountState): void;

  selectUser(): Observable<NgPatAccountState> {
    return this.store.select(selectNgPatAccountState).pipe(take(1));
  }

  destroy() {
    this.selectUser().subscribe((user: NgPatAccountState) => {
      this.onDisconnect(user);
    });
  }
}
