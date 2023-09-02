import { NgPatFirestoreWebSocketConnectorService } from '../services/ng-pat-firestore-web-socket-connector.service';
import { NgPatFirebaseConnectionService } from './websocket-registry.models';
import { NgPatAccountState } from '../+account/account.model';
import { Store } from '@ngrx/store';
import { selectNgPatAccountState } from '../+account/account.selectors';
import { take } from 'rxjs/operators';
import { Observable } from 'rxjs';

export abstract class NgPatAbstractConnectionService
  implements NgPatFirebaseConnectionService
{
  constructor(
    protected featureKey: string,
    protected connector: NgPatFirestoreWebSocketConnectorService,
    protected store: Store
  ) {

    this.ngPatOnInit();

    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const that = this;

    this.connector.registerWebsocketKey(this.featureKey);

    this.connector.onConnect$.subscribe((user: NgPatAccountState) => {
      this.onConnect.call(that, user);
    });

    this.connector.onDisconnect$.subscribe((user: NgPatAccountState) => {
      this.onDisconnect.call(that, user);
    });

  }


  abstract ngPatOnInit(): void;

  abstract onConnect(user: NgPatAccountState): void;
  abstract onDisconnect(user: NgPatAccountState): void;

  selectUser(): Observable<NgPatAccountState> {
    return this.store.select(selectNgPatAccountState).pipe(take(1));
  }

  destroy() {
    this.selectUser().subscribe((user: NgPatAccountState) => {
      this.onDisconnect(user);
      this.connector.deleteKey(this.featureKey);
    });
  }
}
