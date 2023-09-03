import { Injectable } from '@angular/core';
import {
  ngPatFirestoreCollectionQueryFactory,
  NgPatFirestoreCollectionQueryFactory,
  NgPatFirestoreService,
  QueryEngineCache
} from '@ngpat/firebase';
import { Store } from '@ngrx/store';
import { NgPatStripeSubscriptionItem, selectNgPatStripeAllSubscriptions } from '../+subscriptions';
import { NgPatAccountState } from '../../+account/account.model';
import { NgPatServiceConnector } from '../../+websocket-registry/ng-pat-service-connector';
import { aggregateUpdates } from '../../fns/aggregate-updates';
import { NgPatFirestoreWebSocketConnectorService } from '../../services/ng-pat-firestore-web-socket-connector.service';
import { StripeFirestorePathsService } from '../firestore-paths/stripe-firestore-paths.service';
import { ngPatDeleteStripeInvoices, ngPatUpdateStripeInvoices, ngPatUpsertStripeInvoices } from './invoice.actions';
import { NgPatStripeInvoice } from './invoice.model';
import { invoiceFeatureKey } from './invoice.reducer';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  private _priceQueryCache!: QueryEngineCache<NgPatStripeInvoice>;

  connection: NgPatServiceConnector = new NgPatServiceConnector(this, invoiceFeatureKey, this.connector, this.store);

  constructor(
    private collectionQueryFactory: NgPatFirestoreCollectionQueryFactory,
    private customFirestoreService: NgPatFirestoreService,
    private connector: NgPatFirestoreWebSocketConnectorService,
    private store: Store,
    private paths: StripeFirestorePathsService
  ) {


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
    if (this._priceQueryCache) {
      this._priceQueryCache.onConnect(user);
    }
  }

  onDisconnect(user: NgPatAccountState) {
    // Unsubscribe to query

    if (this._priceQueryCache) {
      this._priceQueryCache.onDisconnect();
    }
  }
}
