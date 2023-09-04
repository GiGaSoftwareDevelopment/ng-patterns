
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { NgPatAccountState } from '../+account/account.model';
import { selectNgPatAccountState } from '../+account/account.selectors';
import { NgPatFirestoreWebSocketConnectorService } from '../services/ng-pat-firestore-web-socket-connector.service';
import { NgPatFirebaseConnectionService } from './websocket-registry.models';


export class NgPatServiceConnector {

    private _onDestroy$: Subject<boolean> = new Subject();

    constructor(
        public service: NgPatFirebaseConnectionService,
        public featureKey: string,
        public connector: NgPatFirestoreWebSocketConnectorService,
        private store: Store
    ) {

        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const that = this;

        this.connector.registerWebsocketKey(this.featureKey);

        if (this.service.ngPatOnInit) {
            this.service.ngPatOnInit.call(this.service);
        }


        this.connector.onConnect$
            .pipe(takeUntil(this._onDestroy$))
            .subscribe((user: NgPatAccountState) => {
                that.connector.keyIsConnected(that.featureKey);
                that.service.onConnect.call(this.service, user);
            });

        this.connector.onDisconnect$
            .pipe(takeUntil(this._onDestroy$))
            .subscribe((user: NgPatAccountState) => {
                that.service.onDisconnect.call(this.service, user);

                // call onDisconnect before keyIsDisconnected
                that.connector.keyIsDisconnected(that.featureKey);
            });

    }


    destroy() {
        this._onDestroy$.next(true);
        this.store.select(selectNgPatAccountState).pipe(take(1)).subscribe((user: NgPatAccountState) => {
            this.service.onDisconnect(user);
            this.connector.deleteKey(this.featureKey);
        });
    }
}
