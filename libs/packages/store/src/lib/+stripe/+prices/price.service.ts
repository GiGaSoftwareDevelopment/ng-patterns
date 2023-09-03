import { Injectable } from '@angular/core';
import {
    ngPatFirestoreCollectionQueryFactory,
    NgPatFirestoreCollectionQueryFactory,
    NgPatFirestoreService,
    QueryEngineCache
} from '@ngpat/firebase';
import { Store } from '@ngrx/store';
import { where } from 'firebase/firestore';
import { ReplaySubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NgPatStripeProduct, NgPatStripeProductPrice } from '../+product/product.model';
import { selectNgPatStripeAllProducts } from '../+product/product.selectors';
import { NgPatAccountState } from '../../+account/account.model';
import { NgPatServiceConnector } from '../../+websocket-registry/ng-pat-service-connector';
import { aggregateUpdates } from '../../fns/aggregate-updates';
import { NgPatFirestoreWebSocketConnectorService } from '../../services/ng-pat-firestore-web-socket-connector.service';
import { StripeFirestorePathsService } from '../firestore-paths/stripe-firestore-paths.service';
import { ngPatDeleteStripePrices, ngPatUpdateStripePrices, ngPatUpsertStripePrices } from './price.actions';
import { priceFeatureKey } from './price.reducer';

@Injectable({
  providedIn: 'root'
})
export class PriceService {
  private _priceQueryCache!: QueryEngineCache<NgPatStripeProductPrice>;

  init$: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);
  private _onDestroy$: Subject<boolean> = new Subject();

  connection: NgPatServiceConnector = new NgPatServiceConnector(this, priceFeatureKey, this.connector, this.store);

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
        queryConstrains: [where('active', '==', true)],
        queryMember: false,
        upsertManyAction: (prices: NgPatStripeProductPrice[]) =>
          ngPatUpsertStripePrices({ prices }),
        updateManyAction: (prices: NgPatStripeProductPrice[]) =>
          ngPatUpdateStripePrices({ prices: aggregateUpdates(prices) }),
        deleteManyAction: (ids: string[]) => ngPatDeleteStripePrices({ ids }),
        mapFirestoreID: true
      },
      this.store,
      this.customFirestoreService
    );

    const pricePathGenerator = (p: NgPatStripeProduct) => this.paths.prices(p.id);

    this._priceQueryCache = new QueryEngineCache<NgPatStripeProductPrice>(
      queryPriceConfig,
      this.store,
      selectNgPatStripeAllProducts,
      pricePathGenerator,
      'id'
    );
  }

  onConnect(user: NgPatAccountState) {

    if (this._priceQueryCache) {
      this.init$.pipe(takeUntil(this._onDestroy$)).subscribe(() => {
        this._priceQueryCache.onConnect();
      });
    }


    // implement query
    // this._queryService.onConnect(firestorePriceCollection(), <string>user.uid);
  }

  onDisconnect(user: NgPatAccountState) {
    // Unsubscribe to query


    if (this._priceQueryCache) {
      this._priceQueryCache.onDisconnect();
    }

    this._onDestroy$.next(true);
  }
}
