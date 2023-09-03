import { Injectable } from '@angular/core';
import {
    NgPatFirestoreCollectionQuery,
    NgPatFirestoreCollectionQueryFactory,
    NgPatFirestoreService
} from '@ngpat/firebase';
import { Store } from '@ngrx/store';
import { where } from 'firebase/firestore';
import { ReplaySubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NgPatAccountState } from '../../+account/account.model';
import { NgPatServiceConnector } from '../../+websocket-registry/ng-pat-service-connector';
import { aggregateUpdates } from '../../fns/aggregate-updates';
import { NgPatFirestoreWebSocketConnectorService } from '../../services/ng-pat-firestore-web-socket-connector.service';
import { StripeFirestorePathsService } from '../firestore-paths/stripe-firestore-paths.service';
import { ngPatDeleteStripeProducts, ngPatUpdateStripeProducts, ngPatUpsertStripeProducts } from './product.actions';
import { NgPatStripeProduct } from './product.model';
import { productFeatureKey } from './product.reducer';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private _queryService!: NgPatFirestoreCollectionQuery<NgPatStripeProduct>;
  private _onDestroy$: Subject<boolean> = new Subject();

  init$: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);

  connection: NgPatServiceConnector = new NgPatServiceConnector(this, productFeatureKey, this.connector, this.store);

  constructor(
    private collectionQueryFactory: NgPatFirestoreCollectionQueryFactory,
    private customFirestoreService: NgPatFirestoreService,
    private connector: NgPatFirestoreWebSocketConnectorService,
    private store: Store,
    private paths: StripeFirestorePathsService
  ) {



  }

   ngPatOnInit() {
    this._queryService = new NgPatFirestoreCollectionQuery<NgPatStripeProduct>(
      {
        queryConstrains: [where('active', '==', true)],
        queryMember: false,
        upsertManyAction: (products: NgPatStripeProduct[]) =>
          ngPatUpsertStripeProducts({ products }),
        updateManyAction: (products: NgPatStripeProduct[]) =>
          ngPatUpdateStripeProducts({ products: aggregateUpdates(products) }),
        deleteManyAction: (ids: string[]) => ngPatDeleteStripeProducts({ ids }),
        mapFirestoreID: true
      },
      this.store,
      this.customFirestoreService
    );
  }

  onConnect(user: NgPatAccountState) {

    // implement query
    if (this._queryService) {
      this.init$.pipe(takeUntil(this._onDestroy$)).subscribe(() => {
        this._queryService.onConnect(this.paths.products());
      });
    }

  }

  onDisconnect(user: NgPatAccountState) {
    if (this._queryService) {
      // Unsubscribe to query
      this._queryService.onDisconnect();


    }

    this._onDestroy$.next(true);
  }
}
