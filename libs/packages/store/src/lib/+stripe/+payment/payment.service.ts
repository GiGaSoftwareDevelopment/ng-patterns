import { Injectable } from '@angular/core';
import { NgPatFirestoreCollectionQuery, NgPatFirestoreService } from '@ngpat/firebase';
import { NgPatFirebaseConnectionService } from '../../+websocket-registry/websocket-registry.models';
import { Store } from '@ngrx/store';
import { ReplaySubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NgPatAccountState } from '../../+account/account.model';
import { NgPatServiceConnector } from '../../+websocket-registry/ng-pat-service-connector';
import { aggregateUpdates } from '../../fns/aggregate-updates';
import { NgPatFirestoreWebSocketConnectorService } from '../../services/ng-pat-firestore-web-socket-connector.service';
import { PaymentIntent } from '../entities/payment.model';
import { StripeFirestorePathsService } from '../firestore-paths/stripe-firestore-paths.service';
import { ngPatDeleteStripePayments, ngPatUpdateStripePayments, ngPatUpsertStripePayments } from './payment.actions';
import { paymentsFeatureKey } from './payment.reducer';

@Injectable({
  providedIn: 'root'
})
export class PaymentService implements NgPatFirebaseConnectionService {
  init$: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);
  private _onDestroy$: Subject<boolean> = new Subject();
  private _queryService!: NgPatFirestoreCollectionQuery<PaymentIntent>;

  connection: NgPatServiceConnector = new NgPatServiceConnector(this, paymentsFeatureKey, this.connector, this.store);

  constructor(
      private customFirestoreService: NgPatFirestoreService,
      private connector: NgPatFirestoreWebSocketConnectorService,
      private store: Store,
    private paths: StripeFirestorePathsService
  ) {


  }

  ngPatOnInit() {
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
      this.store,
      this.customFirestoreService
    );
  }

  onConnect(user: NgPatAccountState) {

    if (this._queryService) {
      this.init$.pipe(takeUntil(this._onDestroy$)).subscribe(() => {
        this._queryService.onConnect(this.paths.payments(<string>user.uid));
      });
    }

  }

  onDisconnect(user: NgPatAccountState) {
    // Unsubscribe to query

    if (this._queryService) {
      this._queryService.onDisconnect();
    }
  }
}
