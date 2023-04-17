import { Injectable, NgZone } from '@angular/core';
import { subscriptionFeatureKey } from './subscription.reducer';
import { Store } from '@ngrx/store';
import { SubscriptionItem } from './subscription.model';
import {
  deleteSubscriptions,
  updateSubscriptions,
  upsertSubscriptions
} from './subscription.actions';
import { aggregateUpdates } from '../../fns/aggregate-updates';
import { where } from 'firebase/firestore';
import {
  NgPatFirestoreCollectionQuery,
  NgPatFirestoreService
} from '@ngpat/firebase';
import { NgPatFirestoreWebSocketConnectorService } from '../../services/ng-pat-firestore-web-socket-connector.service';
import { NgPatAccountState } from '../../+account/account.model';
import { firestoreUserSubscriptionsCollection } from '../../database-paths';
import { AbstractConnectionService } from '../../services/ng-pat-abstract-connection.service';

// import {firestoreSubscriptionCollection} from '../../firebaseConfig/database-paths';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService extends AbstractConnectionService {
  private _queryService: NgPatFirestoreCollectionQuery<SubscriptionItem>;

  constructor(
    private _firestore: NgPatFirestoreService,
    override _connector: NgPatFirestoreWebSocketConnectorService,
    override store: Store,
    private _zone: NgZone
  ) {
    super(subscriptionFeatureKey, _connector, store);

    this._queryService = new NgPatFirestoreCollectionQuery<SubscriptionItem>(
      {
        queryConstrains: [where('status', '==', 'active')],
        queryMember: false,
        upsertManyAction: (subscriptions: SubscriptionItem[]) =>
          upsertSubscriptions({ subscriptions }),
        updateManyAction: (subscriptions: SubscriptionItem[]) =>
          updateSubscriptions({
            subscriptions: aggregateUpdates(subscriptions)
          }),
        deleteManyAction: (ids: string[]) => deleteSubscriptions({ ids }),
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
      firestoreUserSubscriptionsCollection(<string>user.uid),
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
    //         updateTrial({
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
