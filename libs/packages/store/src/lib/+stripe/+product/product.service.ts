import { Injectable, NgZone } from '@angular/core';
import { productFeatureKey } from './product.reducer';
import { Store } from '@ngrx/store';
import {
  ngPatDeleteProducts,
  ngPatUpdateProducts,
  ngPatUpsertProducts
} from './product.actions';
import { aggregateUpdates } from '../../fns/aggregate-updates';
import { Product } from './product.model';
import { where } from 'firebase/firestore';
import {
  NgPatFirestoreCollectionQuery,
  NgPatFirestoreCollectionQueryFactory,
  NgPatFirestoreService
} from '@ngpat/firebase';
import { NgPatFirestoreWebSocketConnectorService } from '../../services/ng-pat-firestore-web-socket-connector.service';
import { NgPatAccountState } from '../../+account/account.model';
import { ReplaySubject, Subject } from 'rxjs';
import { StripeFirestorePathsService } from '../firestore-paths/stripe-firestore-paths.service';
import { takeUntil } from 'rxjs/operators';
import { NgPatAbstractConnectionService } from '../../+websocket-registry/ng-pat-abstract-connection.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends NgPatAbstractConnectionService {
  private _queryService: NgPatFirestoreCollectionQuery<Product>;
  private _onDestroy$: Subject<boolean> = new Subject();

  init$: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);

  constructor(
    private collectionQueryFactory: NgPatFirestoreCollectionQueryFactory,
    private _customFirestoreService: NgPatFirestoreService,
    override _connector: NgPatFirestoreWebSocketConnectorService,
    override store: Store,
    private _zone: NgZone,
    private paths: StripeFirestorePathsService
  ) {
    super(productFeatureKey, _connector, store);

    this._queryService = new NgPatFirestoreCollectionQuery<Product>(
      {
        queryConstrains: [where('active', '==', true)],
        queryMember: false,
        upsertManyAction: (products: Product[]) =>
          ngPatUpsertProducts({ products }),
        updateManyAction: (products: Product[]) =>
          ngPatUpdateProducts({ products: aggregateUpdates(products) }),
        deleteManyAction: (ids: string[]) => ngPatDeleteProducts({ ids }),
        mapFirestoreID: true
      },
      _zone,
      store,
      _customFirestoreService
    );
  }

  onConnect(user: NgPatAccountState) {
    this._connector.keyIsConnected(productFeatureKey);

    this.init$.pipe(takeUntil(this._onDestroy$)).subscribe(() => {
      this._queryService.onConnect(this.paths.products());
    });

    // implement query
  }

  onDisconnect(user: NgPatAccountState) {
    // Unsubscribe to query
    this._queryService.onDisconnect();

    // Unsubscribe to query before calling this
    this._connector.keyIsDisconnected(productFeatureKey);
    this._onDestroy$.next(true);
  }
}
