import { Injectable } from '@angular/core';
import { invoiceFeatureKey } from './invoice.reducer';
import { Store } from '@ngrx/store';
import { NgPatStripeInvoice } from './invoice.model';
import { ngPatDeleteStripeInvoices, ngPatUpdateStripeInvoices, ngPatUpsertStripeInvoices } from './invoice.actions';
import { NgPatStripeSubscriptionItem, selectNgPatStripeAllSubscriptions } from '../+subscriptions';
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
  private _priceQueryCache!: QueryEngineCache<NgPatStripeInvoice>;

  constructor(
    private collectionQueryFactory: NgPatFirestoreCollectionQueryFactory,
    override customFirestoreService: NgPatFirestoreService,
    override connector: NgPatFirestoreWebSocketConnectorService,
    override store: Store,
    private paths: StripeFirestorePathsService
  ) {
    super(invoiceFeatureKey, customFirestoreService, connector, store);


  }

  ngPatOnInit() {
    const queryPriceConfig = ngPatFirestoreCollectionQueryFactory(
      {
        queryMember: false,
        upsertManyAction: (invoices: NgPatStripeInvoice[]) =>
          ngPatUpsertStripeInvoices({ invoices }),
        updateManyAction: (invoices: NgPatStripeInvoice[]) =>
          ngPatUpdateStripeInvoices({ invoices: aggregateUpdates(invoices) }),
        deleteManyAction: (ids: string[]) => ngPatDeleteStripeInvoices({ ids }),
        mapFirestoreID: true,
        logUpsert: false
      },
      this.store,
      this.customFirestoreService
    );

    const pricePathGenerator = (p: NgPatStripeSubscriptionItem, uid: string) =>
      this.paths.invoices(p.id, uid);

    this._priceQueryCache = new QueryEngineCache<NgPatStripeInvoice>(
      queryPriceConfig,
      this.store,
      selectNgPatStripeAllSubscriptions,
      pricePathGenerator,
      'id'
    );
  }

  onConnect(user: NgPatAccountState) {
    this.connector.keyIsConnected(invoiceFeatureKey);
    if (this._priceQueryCache) {
      this._priceQueryCache.onConnect(user);
    }
  }

  onDisconnect(user: NgPatAccountState) {
    // Unsubscribe to query

    // Unsubscribe to query before calling this
    this.connector.keyIsDisconnected(invoiceFeatureKey);
    if (this._priceQueryCache) {
      this._priceQueryCache.onDisconnect();
    }
  }
}
