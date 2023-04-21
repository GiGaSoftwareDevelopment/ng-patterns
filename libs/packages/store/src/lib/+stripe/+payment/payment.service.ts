import { Injectable, NgZone } from '@angular/core';
import { PaymentIntent } from '../entities/payment.model';
import {
  ngPatFirestoreCollectionQueryFactory,
  NgPatFirestoreCollectionQueryFactory,
  NgPatFirestoreService,
  QueryEngineCache
} from '@ngpat/firebase';
import { Store } from '@ngrx/store';
import { NgPatFirestoreWebSocketConnectorService } from '../../services/ng-pat-firestore-web-socket-connector.service';
import { StripeFirestorePathsService } from '../firestore-paths/stripe-firestore-paths.service';
import { AbstractConnectionService } from '../../services/ng-pat-abstract-connection.service';
import { aggregateUpdates } from '../../fns/aggregate-updates';
import {
  deletePayments,
  updatePayments,
  upsertPayments
} from './payment.actions';
import { SubscriptionItem } from '../+subscriptions/subscription.model';
import { selectAllPayments } from './payment.selectors';
import { NgPatAccountState } from '../../+account/account.model';
import { paymentsFeatureKey } from './payment.reducer';

@Injectable({
  providedIn: 'root'
})
export class PaymentService extends AbstractConnectionService {
  private _paymentQueryCache: QueryEngineCache<PaymentIntent>;

  constructor(
    private collectionQueryFactory: NgPatFirestoreCollectionQueryFactory,
    private _customFirestoreService: NgPatFirestoreService,
    override _connector: NgPatFirestoreWebSocketConnectorService,
    override store: Store,
    private _zone: NgZone,
    private paths: StripeFirestorePathsService
  ) {
    super(paymentsFeatureKey, _connector, store);

    const queryPriceConfig = ngPatFirestoreCollectionQueryFactory(
      {
        queryMember: false,
        upsertManyAction: (payments: PaymentIntent[]) =>
          upsertPayments({ payments }),
        updateManyAction: (payments: PaymentIntent[]) =>
          updatePayments({ payments: aggregateUpdates(payments) }),
        deleteManyAction: (ids: string[]) => deletePayments({ ids }),
        mapFirestoreID: true,
        logUpsert: false
      },
      _zone,
      store,
      _customFirestoreService
    );

    const pricePathGenerator = (p: SubscriptionItem, uid: string) =>
      this.paths.payments(uid);

    this._paymentQueryCache = new QueryEngineCache<PaymentIntent>(
      queryPriceConfig,
      store,
      selectAllPayments,
      pricePathGenerator,
      'id'
    );
  }

  onConnect(user: NgPatAccountState) {
    this._connector.keyIsConnected(paymentsFeatureKey);
    this._paymentQueryCache.onConnect(user);
  }

  onDisconnect(user: NgPatAccountState) {
    // Unsubscribe to query

    // Unsubscribe to query before calling this
    this._connector.keyIsDisconnected(paymentsFeatureKey);
    this._paymentQueryCache.onDisconnect();
  }
}
