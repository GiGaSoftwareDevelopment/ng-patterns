import { Injectable, NgZone } from '@angular/core';
import { NgPatFirestoreCollectionQuery, NgPatFirestoreService } from '@ngpat/firebase';
import { Store } from '@ngrx/store';
import { where } from 'firebase/firestore';
import { NgPatAccountState } from '../../+account/account.model';
import { NgPatServiceConnector } from '../../+websocket-registry/ng-pat-service-connector';
import { aggregateUpdates } from '../../fns/aggregate-updates';
import { NgPatFirestoreWebSocketConnectorService } from '../../services/ng-pat-firestore-web-socket-connector.service';
import { StripeFirestorePathsService } from '../firestore-paths/stripe-firestore-paths.service';
import {
    ngPatDeleteStripeSubscriptions,
    ngPatUpdateStripeSubscriptions,
    ngPatUpsertStripeSubscriptions
} from './subscription.actions';
import { NgPatStripeSubscriptionItem } from './subscription.model';
import { subscriptionFeatureKey } from './subscription.reducer';

// import {firestoreSubscriptionCollection} from '../../firebaseConfig/database-paths';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService  {
  private _queryService!: NgPatFirestoreCollectionQuery<NgPatStripeSubscriptionItem>;

    connection: NgPatServiceConnector = new NgPatServiceConnector(this, subscriptionFeatureKey, this.connector, this.store);

  constructor(
    private _firestore: NgPatFirestoreService,
    private customFirestoreService: NgPatFirestoreService,
    private connector: NgPatFirestoreWebSocketConnectorService,
    private store: Store,
    private _zone: NgZone,
    private paths: StripeFirestorePathsService
  ) {


  }

  ngPatOnInit() {
    this._queryService =
      new NgPatFirestoreCollectionQuery<NgPatStripeSubscriptionItem>(
        {
          queryConstrains: [where('status', '==', 'active')],
          queryMember: false,
          upsertManyAction: (subscriptions: NgPatStripeSubscriptionItem[]) =>
            ngPatUpsertStripeSubscriptions({ subscriptions }),
          updateManyAction: (subscriptions: NgPatStripeSubscriptionItem[]) =>
            ngPatUpdateStripeSubscriptions({
              subscriptions: aggregateUpdates(subscriptions)
            }),
          deleteManyAction: (ids: string[]) =>
            ngPatDeleteStripeSubscriptions({ ids }),
          mapFirestoreID: true,
          logUpsert: false
        },
        this.store,
        this._firestore
      );
  }

  onConnect(user: NgPatAccountState) {
    // implement query
    // console.log(user);
    // console.log(firestoreUserSubscriptionsCollection(<string>user.uid));

    if (this._queryService) {
      this._queryService.onConnect(
        this.paths.subscriptions(<string>user.uid),
        null,
        <string>user.uid
      );
    }


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
    if (this._queryService) {
      this._queryService.onDisconnect();
    }

  }
}
