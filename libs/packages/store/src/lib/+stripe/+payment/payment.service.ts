import { Injectable, NgZone } from '@angular/core';
import { PaymentIntent } from '../entities/payment.model';
import {
  NgPatFirestoreCollectionQuery,
  NgPatFirestoreService
} from '@ngpat/firebase';
import { Store } from '@ngrx/store';
import { NgPatFirestoreWebSocketConnectorService } from '../../services/ng-pat-firestore-web-socket-connector.service';
import { StripeFirestorePathsService } from '../firestore-paths/stripe-firestore-paths.service';
import { aggregateUpdates } from '../../fns/aggregate-updates';
import {
  ngPatDeleteStripePayments,
  ngPatUpdateStripePayments,
  ngPatUpsertStripePayments
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
  init$: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);
  private _onDestroy$: Subject<boolean> = new Subject();
  private _queryService: NgPatFirestoreCollectionQuery<PaymentIntent>;

  constructor(
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
          ngPatUpsertStripePayments({ payments }),
        updateManyAction: (payments: PaymentIntent[]) =>
          ngPatUpdateStripePayments({ payments: aggregateUpdates(payments) }),
        deleteManyAction: (ids: string[]) => ngPatDeleteStripePayments({ ids }),
        mapFirestoreID: true
      },
      _zone,
      store,
      _customFirestoreService
    );
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
