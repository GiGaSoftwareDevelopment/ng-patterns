import { Injectable, NgZone } from '@angular/core';
import { productFeatureKey } from './product.reducer';
import { Store } from '@ngrx/store';
import {
  deleteProducts,
  updateProducts,
  upsertProducts
} from './product.actions';
import { aggregateUpdates } from '../../fns/aggregate-updates';
import { Product } from './product.model';
import { where } from 'firebase/firestore';
import {
  NgPatFirestoreCollectionQuery,
  NgPatFirestoreCollectionQueryFactory,
  NgPatFirestoreService
} from '@ngpat/firebase';
import { AbstractConnectionService } from '../../services/ng-pat-abstract-connection.service';
import { NgPatFirestoreWebSocketConnectorService } from '../../services/ng-pat-firestore-web-socket-connector.service';
import { NgPatAccountState } from '../../+account/account.model';
import { ReplaySubject } from 'rxjs';
import { StripeFirestorePathsService } from '../firestore-paths/stripe-firestore-paths.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends AbstractConnectionService {
  private _queryService: NgPatFirestoreCollectionQuery<Product>;

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
        upsertManyAction: (products: Product[]) => upsertProducts({ products }),
        updateManyAction: (products: Product[]) =>
          updateProducts({ products: aggregateUpdates(products) }),
        deleteManyAction: (ids: string[]) => deleteProducts({ ids }),
        mapFirestoreID: true
      },
      _zone,
      store,
      _customFirestoreService
    );
  }

  onConnect(user: NgPatAccountState) {
    this._connector.keyIsConnected(productFeatureKey);

    this.init$.subscribe(() => {
      this._queryService.onConnect(this.paths.products());
    });

    // implement query
  }

  onDisconnect(user: NgPatAccountState) {
    // Unsubscribe to query
    this._queryService.onDisconnect();

    // Unsubscribe to query before calling this
    this._connector.keyIsDisconnected(productFeatureKey);
  }
}
