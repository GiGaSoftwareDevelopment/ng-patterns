import { Injectable, NgZone } from '@angular/core';
import { subscriptionFeatureKey } from './subscription.reducer';
import { Store } from '@ngrx/store';
import { SubscriptionItem } from './subscription.model';
import {
  ngPatDeleteStripeSubscriptions,
  ngPatUpdateStripeSubscriptions,
  ngPatUpsertStripeSubscriptions
} from './subscription.actions';
import { aggregateUpdates } from '../../fns/aggregate-updates';
import { where } from 'firebase/firestore';
import {
  NgPatFirestoreCollectionQuery,
  NgPatFirestoreService
} from '@ngpat/firebase';
import { NgPatFirestoreWebSocketConnectorService } from '../../services/ng-pat-firestore-web-socket-connector.service';
import { NgPatAccountState } from '../../+account/account.model';
import { StripeFirestorePathsService } from '../firestore-paths/stripe-firestore-paths.service';
import { NgPatAbstractConnectionService } from '../../+websocket-registry/ng-pat-abstract-connection.service';

// import {firestoreSubscriptionCollection} from '../../firebaseConfig/database-paths';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService extends NgPatAbstractConnectionService {
  private _queryService: NgPatFirestoreCollectionQuery<SubscriptionItem>;

  constructor(
    private _firestore: NgPatFirestoreService,
    override _connector: NgPatFirestoreWebSocketConnectorService,
    override store: Store,
    private _zone: NgZone,
    private paths: StripeFirestorePathsService
  ) {
    super(subscriptionFeatureKey, _connector, store);

    this._queryService = new NgPatFirestoreCollectionQuery<SubscriptionItem>(
      {
        queryConstrains: [where('status', '==', 'active')],
        queryMember: false,
        upsertManyAction: (subscriptions: SubscriptionItem[]) =>
          ngPatUpsertStripeSubscriptions({ subscriptions }),
        updateManyAction: (subscriptions: SubscriptionItem[]) =>
          ngPatUpdateStripeSubscriptions({
            subscriptions: aggregateUpdates(subscriptions)
          }),
        deleteManyAction: (ids: string[]) =>
          ngPatDeleteStripeSubscriptions({ ids }),
        mapFirestoreID: true,
        logUpsert: false
      },
      _zone,
      store,
      _firestore
    );
  }

  onConnect(user: NgPatAccountState) {
    this._connector.keyIsConnected(subscriptionFeatureKey);
    // implement query
    // console.log(user);
    // console.log(firestoreUserSubscriptionsCollection(<string>user.uid));
    this._queryService.onConnect(
      this.paths.subscriptions(<string>user.uid),
      null,
      <string>user.uid
    );

    // this.trailSub = onSnapshot(
    //   this._customFirestoreService.docRef(firestoreTrialPath()),
    //   (_doc: DocumentSnapshot<DocumentData>) => {
    //     that._zone.run(() => {
    //       that.store.dispatch(
    //         /**
    //          * Triggers 'doConnect' for all other services
    //          */
    //         ngPatUpdateStripeTrial({
    //           trial: <Trial>_doc.data()
    //         })
    //       );
    //     });
    //   }
    // );
  }

  onDisconnect(user: NgPatAccountState) {
    // Unsubscribe to query
    this._queryService.onDisconnect();

    // Unsubscribe to query before calling this
    this._connector.keyIsDisconnected(subscriptionFeatureKey);
  }
}
