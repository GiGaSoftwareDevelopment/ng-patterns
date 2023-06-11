import { Injectable, NgZone } from '@angular/core';
import { ReplaySubject, Subject } from 'rxjs';
import { CheckoutSession } from './checkout-session.model';
import {
  NgPatFirestoreCollectionQuery,
  NgPatFirestoreService
} from '@ngpat/firebase';
import { Store } from '@ngrx/store';
import { aggregateUpdates } from '../../fns/aggregate-updates';
import {
  ngPatDeleteCheckoutSessions,
  ngPatUpdateCheckoutSessions,
  ngPatUpsertCheckoutSessions
} from './checkout-session.actions';
import { takeUntil } from 'rxjs/operators';
import { NgPatAbstractConnectionService } from '../../+websocket-registry/ng-pat-abstract-connection.service';
import { NgPatFirestoreWebSocketConnectorService } from '../../services/ng-pat-firestore-web-socket-connector.service';
import { StripeFirestorePathsService } from '../firestore-paths/stripe-firestore-paths.service';
import { checkoutSessionsFeatureKey } from './checkout-session.reducer';
import { NgPatAccountState } from '../../+account/account.model';

@Injectable({
  providedIn: 'root'
})
export class CheckoutSessionService extends NgPatAbstractConnectionService {
  init$: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);
  private _onDestroy$: Subject<boolean> = new Subject();
  private _queryService: NgPatFirestoreCollectionQuery<CheckoutSession>;
  constructor(
    private _customFirestoreService: NgPatFirestoreService,
    override _connector: NgPatFirestoreWebSocketConnectorService,
    override store: Store,
    private _zone: NgZone,
    private paths: StripeFirestorePathsService
  ) {
    super(checkoutSessionsFeatureKey, _connector, store);

    this._queryService = new NgPatFirestoreCollectionQuery<CheckoutSession>(
      {
        queryConstrains: [],
        queryMember: false,
        upsertManyAction: (checkoutSessions: CheckoutSession[]) =>
          ngPatUpsertCheckoutSessions({ checkoutSessions }),
        updateManyAction: (checkoutSessions: CheckoutSession[]) =>
          ngPatUpdateCheckoutSessions({
            checkoutSessions: aggregateUpdates(checkoutSessions)
          }),
        deleteManyAction: (ids: string[]) =>
          ngPatDeleteCheckoutSessions({ ids }),
        mapFirestoreID: true
      },
      _zone,
      store,
      _customFirestoreService
    );
  }

  onConnect(user: NgPatAccountState) {
    this._connector.keyIsConnected(checkoutSessionsFeatureKey);

    this.init$.pipe(takeUntil(this._onDestroy$)).subscribe(() => {
      this._queryService.onConnect(
        this.paths.checkoutSessions(<string>user.uid)
      );
    });
  }

  onDisconnect(user: NgPatAccountState) {
    // Unsubscribe to query

    // Unsubscribe to query before calling this
    this._connector.keyIsDisconnected(checkoutSessionsFeatureKey);
    this._queryService.onDisconnect();
  }
}
