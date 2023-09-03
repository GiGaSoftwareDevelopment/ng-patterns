import { NgPatFirestoreService } from '@ngpat/firebase';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { NgPatAccountState } from '../+account/account.model';
import { selectNgPatAccountState } from '../+account/account.selectors';
import { NgPatFirestoreWebSocketConnectorService } from '../services/ng-pat-firestore-web-socket-connector.service';
import { NgPatFirebaseConnectionService } from './websocket-registry.models';

export abstract class NgPatAbstractConnectionService
    implements NgPatFirebaseConnectionService {
    private _config: { [key: string]: any } = {};

    get config(): { [key: string]: any } {
        return this._config;
    }

    constructor(
        protected featureKey: string,
        protected customFirestoreService: NgPatFirestoreService,
        protected connector: NgPatFirestoreWebSocketConnectorService,
        protected store: Store,
        config?: { [key: string]: any }
    ) {

        this._config = config || {};

        if (this.ngPatOnInit) {
            this.ngPatOnInit.call(this);
        }

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
