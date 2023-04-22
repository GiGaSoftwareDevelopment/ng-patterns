import { Injectable, NgZone } from '@angular/core';
import { PaymentIntent } from '../entities/payment.model';
import {
  NgPatFirestoreCollectionQuery,
  NgPatFirestoreCollectionQueryFactory,
  NgPatFirestoreService
} from '@ngpat/firebase';
import { Store } from '@ngrx/store';
import { NgPatFirestoreWebSocketConnectorService } from '../../services/ng-pat-firestore-web-socket-connector.service';
import { StripeFirestorePathsService } from '../firestore-paths/stripe-firestore-paths.service';
import { aggregateUpdates } from '../../fns/aggregate-updates';
import {
  deletePayments,
  updatePayments,
  upsertPayments
} from './payment.actions';
import { NgPatAccountState } from '../../+account/account.model';
import { paymentsFeatureKey } from './payment.reducer';
import { ReplaySubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NgPatAbstractConnectionService } from '../../+websocket-registry/ng-pat-abstract-connection.service';

@Injectable({
  providedIn: 'root'
})
export class PaymentService extends NgPatAbstractConnectionService {
  // private _paymentQueryCache: QueryEngineCache<PaymentIntent>;
  init$: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);
  private _onDestroy$: Subject<boolean> = new Subject();
  private _queryService: NgPatFirestoreCollectionQuery<PaymentIntent>;

  constructor(
    private collectionQueryFactory: NgPatFirestoreCollectionQueryFactory,
    private _customFirestoreService: NgPatFirestoreService,
    override _connector: NgPatFirestoreWebSocketConnectorService,
    override store: Store,
    private _zone: NgZone,
    private paths: StripeFirestorePathsService
  ) {
    super(paymentsFeatureKey, _connector, store);

    this._queryService = new NgPatFirestoreCollectionQuery<PaymentIntent>(
      {
        queryConstrains: [],
        queryMember: false,
        upsertManyAction: (payments: PaymentIntent[]) =>
          upsertPayments({ payments }),
        updateManyAction: (payments: PaymentIntent[]) =>
          updatePayments({ payments: aggregateUpdates(payments) }),
        deleteManyAction: (ids: string[]) => deletePayments({ ids }),
        mapFirestoreID: true
      },
      _zone,
      store,
      _customFirestoreService
    );

    const pricePathGenerator = (uid: string) => this.paths.payments(uid);
  }

  onConnect(user: NgPatAccountState) {
    this._connector.keyIsConnected(paymentsFeatureKey);

    this.init$.pipe(takeUntil(this._onDestroy$)).subscribe(() => {
      this._queryService.onConnect(this.paths.payments(<string>user.uid));
    });
  }

  onDisconnect(user: NgPatAccountState) {
    // Unsubscribe to query

    // Unsubscribe to query before calling this
    this._connector.keyIsDisconnected(paymentsFeatureKey);
    this._queryService.onDisconnect();
  }
}
