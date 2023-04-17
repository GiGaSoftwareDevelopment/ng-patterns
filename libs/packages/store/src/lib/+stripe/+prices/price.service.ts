import { Injectable, NgZone } from '@angular/core';
import { priceFeatureKey } from './price.reducer';
import { Store } from '@ngrx/store';
import { Price, Product } from './price.model';
import { deletePrices, updatePrices, upsertPrices } from './price.actions';
import { aggregateUpdates } from '../../fns/aggregate-updates';
import { selectAllProducts } from '../+product/product.selectors';
import { where } from 'firebase/firestore';
import {
  ngPatFirestoreCollectionQueryFactory,
  NgPatFirestoreCollectionQueryFactory,
  NgPatFirestoreService,
  QueryEngineCache
} from '@ngpat/firebase';
import { AbstractConnectionService } from '../../services/ng-pat-abstract-connection.service';
import { NgPatFirestoreWebSocketConnectorService } from '../../services/ng-pat-firestore-web-socket-connector.service';
import { firestorePriceCollection } from '../../database-paths';
import { NgPatAccountState } from '../../+account/account.model';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PriceService extends AbstractConnectionService {
  private _priceQueryCache: QueryEngineCache<Price>;

  init$: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);

  constructor(
    private collectionQueryFactory: NgPatFirestoreCollectionQueryFactory,
    private _customFirestoreService: NgPatFirestoreService,
    override _connector: NgPatFirestoreWebSocketConnectorService,
    override store: Store,
    private _zone: NgZone
  ) {
    super(priceFeatureKey, _connector, store);

    const queryPriceConfig = ngPatFirestoreCollectionQueryFactory(
      {
        queryConstrains: [where('active', '==', true)],
        queryMember: false,
        upsertManyAction: (prices: Price[]) => upsertPrices({ prices }),
        updateManyAction: (prices: Price[]) =>
          updatePrices({ prices: aggregateUpdates(prices) }),
        deleteManyAction: (ids: string[]) => deletePrices({ ids }),
        mapFirestoreID: true
      },
      _zone,
      store,
      _customFirestoreService
    );

    const pricePathGenerator = (p: Product) => firestorePriceCollection(p.id);

    this._priceQueryCache = new QueryEngineCache<Price>(
      queryPriceConfig,
      store,
      selectAllProducts,
      pricePathGenerator,
      'id'
    );
  }

  onConnect(user: NgPatAccountState) {
    this._connector.keyIsConnected(priceFeatureKey);

    this.init$.subscribe(() => {
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
  }
}
