import { Injectable, NgZone } from '@angular/core';
import { invoiceFeatureKey } from './invoice.reducer';
import { Store } from '@ngrx/store';
import { Invoice } from './invoice.model';
import {
  deleteInvoices,
  updateInvoices,
  upsertInvoices
} from './invoice.actions';
import { selectAllSubscriptions, SubscriptionItem } from '../+subscriptions';
import {
  ngPatFirestoreCollectionQueryFactory,
  NgPatFirestoreCollectionQueryFactory,
  NgPatFirestoreService,
  QueryEngineCache
} from '@ngpat/firebase';
import { NgPatFirestoreWebSocketConnectorService } from '../../services/ng-pat-firestore-web-socket-connector.service';
import { NgPatAccountState } from '../../+account/account.model';
import { aggregateUpdates } from '../../fns/aggregate-updates';
import { StripeFirestorePathsService } from '../firestore-paths/stripe-firestore-paths.service';
import { NgPatAbstractConnectionService } from '../../+websocket-registry/ng-pat-abstract-connection.service';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService extends NgPatAbstractConnectionService {
  private _priceQueryCache: QueryEngineCache<Invoice>;

  constructor(
    private collectionQueryFactory: NgPatFirestoreCollectionQueryFactory,
    private _customFirestoreService: NgPatFirestoreService,
    override _connector: NgPatFirestoreWebSocketConnectorService,
    override store: Store,
    private _zone: NgZone,
    private paths: StripeFirestorePathsService
  ) {
    super(invoiceFeatureKey, _connector, store);

    const queryPriceConfig = ngPatFirestoreCollectionQueryFactory(
      {
        queryMember: false,
        upsertManyAction: (invoices: Invoice[]) => upsertInvoices({ invoices }),
        updateManyAction: (invoices: Invoice[]) =>
          updateInvoices({ invoices: aggregateUpdates(invoices) }),
        deleteManyAction: (ids: string[]) => deleteInvoices({ ids }),
        mapFirestoreID: true,
        logUpsert: false
      },
      _zone,
      store,
      _customFirestoreService
    );

    const pricePathGenerator = (p: SubscriptionItem, uid: string) =>
      this.paths.invoices(p.id, uid);

    this._priceQueryCache = new QueryEngineCache<Invoice>(
      queryPriceConfig,
      store,
      selectAllSubscriptions,
      pricePathGenerator,
      'id'
    );
  }

  onConnect(user: NgPatAccountState) {
    this._connector.keyIsConnected(invoiceFeatureKey);
    this._priceQueryCache.onConnect(user);
  }

  onDisconnect(user: NgPatAccountState) {
    // Unsubscribe to query

    // Unsubscribe to query before calling this
    this._connector.keyIsDisconnected(invoiceFeatureKey);
    this._priceQueryCache.onDisconnect();
  }
}
