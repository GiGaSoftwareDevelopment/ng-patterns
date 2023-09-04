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
import { StripeFirestorePathsService } from '../firestore-paths/stripe-firestore-paths.service';
import {
  ngPatDeleteStripeCheckoutSessions,
  ngPatUpdateStripeCheckoutSessions,
  ngPatUpsertStripeCheckoutSessions
} from './checkout-session.actions';
import { NgPatStripeCheckoutSession } from './checkout-session.model';
import { checkoutSessionsFeatureKey } from './checkout-session.reducer';

@Injectable({
  providedIn: 'root'
})
export class CheckoutSessionService implements NgPatFirebaseConnectionService  {
  init$: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);
  private _onDestroy$: Subject<boolean> = new Subject();
  private _queryService!: NgPatFirestoreCollectionQuery<NgPatStripeCheckoutSession>;

  connection: NgPatServiceConnector = new NgPatServiceConnector(this, checkoutSessionsFeatureKey, this.connector, this.store);

  constructor(
      private customFirestoreService: NgPatFirestoreService,
      private connector: NgPatFirestoreWebSocketConnectorService,
      private store: Store,
      private paths: StripeFirestorePathsService
  ) {


  }

  ngPatOnInit() {
    this._queryService = new NgPatFirestoreCollectionQuery<NgPatStripeCheckoutSession>(
      {
        queryConstrains: [],
        queryMember: false,
        upsertManyAction: (checkoutSessions: NgPatStripeCheckoutSession[]) =>
          ngPatUpsertStripeCheckoutSessions({ checkoutSessions }),
        updateManyAction: (checkoutSessions: NgPatStripeCheckoutSession[]) =>
          ngPatUpdateStripeCheckoutSessions({
            checkoutSessions: aggregateUpdates(checkoutSessions)
          }),
        deleteManyAction: (ids: string[]) =>
          ngPatDeleteStripeCheckoutSessions({ ids }),
        mapFirestoreID: true
      },
      this.store,
      this.customFirestoreService
    );
  }

  onConnect(user: NgPatAccountState) {
    if (this._queryService) {
      this.init$.pipe(takeUntil(this._onDestroy$)).subscribe(() => {
        this._queryService.onConnect(
          this.paths.checkoutSessions(<string>user.uid)
        );
      });
    }

  }

  onDisconnect(user: NgPatAccountState) {
    if (this._queryService) {
      this._queryService.onDisconnect();
    }
  }
}
