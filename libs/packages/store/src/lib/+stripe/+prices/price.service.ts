import { Injectable, NgZone } from '@angular/core';
import { priceFeatureKey } from './price.reducer';
import { Store } from '@ngrx/store';
import {
  ngPatDeletePrices,
  ngPatUpdatePrices,
  ngPatUpsertPrices
} from './price.actions';
import { aggregateUpdates } from '../../fns/aggregate-updates';
import { selectNgPatAllProducts } from '../+product/product.selectors';
import { where } from 'firebase/firestore';
import {
  ngPatFirestoreCollectionQueryFactory,
  NgPatFirestoreCollectionQueryFactory,
  NgPatFirestoreService,
  QueryEngineCache
} from '@ngpat/firebase';
import { NgPatFirestoreWebSocketConnectorService } from '../../services/ng-pat-firestore-web-socket-connector.service';
import { NgPatAccountState } from '../../+account/account.model';
import { ReplaySubject, Subject } from 'rxjs';
import { StripeFirestorePathsService } from '../firestore-paths/stripe-firestore-paths.service';
import { Product, ProductPrice } from '../+product/product.model';
import { takeUntil } from 'rxjs/operators';
import { NgPatAbstractConnectionService } from '../../+websocket-registry/ng-pat-abstract-connection.service';

@Injectable({
  providedIn: 'root'
})
export class PriceService extends NgPatAbstractConnectionService {
  private _priceQueryCache: QueryEngineCache<ProductPrice>;

  init$: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);
  private _onDestroy$: Subject<boolean> = new Subject();

  constructor(
    private collectionQueryFactory: NgPatFirestoreCollectionQueryFactory,
    private _customFirestoreService: NgPatFirestoreService,
    override _connector: NgPatFirestoreWebSocketConnectorService,
    override store: Store,
    private _zone: NgZone,
    private paths: StripeFirestorePathsService
  ) {
    super(priceFeatureKey, _connector, store);

    const queryPriceConfig = ngPatFirestoreCollectionQueryFactory(
      {
        queryConstrains: [where('active', '==', true)],
        queryMember: false,
        upsertManyAction: (prices: ProductPrice[]) =>
          ngPatUpsertPrices({ prices }),
        updateManyAction: (prices: ProductPrice[]) =>
          ngPatUpdatePrices({ prices: aggregateUpdates(prices) }),
        deleteManyAction: (ids: string[]) => ngPatDeletePrices({ ids }),
        mapFirestoreID: true
      },
      _zone,
      store,
      _customFirestoreService
    );

    const pricePathGenerator = (p: Product) => this.paths.prices(p.id);

    this._priceQueryCache = new QueryEngineCache<ProductPrice>(
      queryPriceConfig,
      store,
      selectNgPatAllProducts,
      pricePathGenerator,
      'id'
    );
  }

  onConnect(user: NgPatAccountState) {
    this._connector.keyIsConnected(priceFeatureKey);

    this.init$.pipe(takeUntil(this._onDestroy$)).subscribe(() => {
      this._priceQueryCache.onConnect();
    });

    // implement query
    // this._queryService.onConnect(firestorePriceCollection(), <string>user.uid);
  }

  onDisconnect(user: NgPatAccountState) {
    // Unsubscribe to query

    // Unsubscribe to query before calling this
    this._connector.keyIsDisconnected(priceFeatureKey);
    this._priceQueryCache.onDisconnect();
    this._onDestroy$.next(true);
  }
}
