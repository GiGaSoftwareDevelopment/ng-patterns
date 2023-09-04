import { Injectable } from '@angular/core';
import {
  NgPatFirestoreCollectionQuery,
  NgPatFirestoreCollectionQueryFactory,
  NgPatFirestoreService
} from '@ngpat/firebase';
import { NgPatFirebaseConnectionService } from '../../+websocket-registry/websocket-registry.models';
import { Store } from '@ngrx/store';
import { NgPatAccountState } from '../../+account/account.model';
import { NgPatServiceConnector } from '../../+websocket-registry/ng-pat-service-connector';
import { aggregateUpdates } from '../../fns/aggregate-updates';
import { NgPatFirestoreWebSocketConnectorService } from '../../services/ng-pat-firestore-web-socket-connector.service';
import { StripeFirestorePathsService } from '../firestore-paths/stripe-firestore-paths.service';
import {
  ngPatDeleteStripePromoCodes,
  ngPatUpdateStripePromoCodes,
  ngPatUpsertStripePromoCodes
} from './promo-code.actions';
import { NgPatStripePromoCode } from './promo-code.model';
import { promoCodeFeatureKey } from './promo-code.reducer';

@Injectable({
  providedIn: 'root'
})
export class PromoCodeService implements NgPatFirebaseConnectionService  {
  private _queryService!: NgPatFirestoreCollectionQuery<NgPatStripePromoCode>;

    connection: NgPatServiceConnector = new NgPatServiceConnector(this, promoCodeFeatureKey, this.connector, this.store);

  constructor(
    private collectionQueryFactory: NgPatFirestoreCollectionQueryFactory,
    private customFirestoreService: NgPatFirestoreService,
    private connector: NgPatFirestoreWebSocketConnectorService,
    private store: Store,
    private paths: StripeFirestorePathsService
  ) {


  }

  ngPatOnInit() {
    this._queryService = new NgPatFirestoreCollectionQuery<NgPatStripePromoCode>(
      {
        queryMember: false,
        upsertManyAction: (promoCodes: NgPatStripePromoCode[]) =>
          ngPatUpsertStripePromoCodes({ promoCodes }),
        updateManyAction: (promoCodes: NgPatStripePromoCode[]) =>
          ngPatUpdateStripePromoCodes({
            promoCodes: aggregateUpdates(promoCodes)
          }),
        deleteManyAction: (ids: string[]) =>
          ngPatDeleteStripePromoCodes({ ids })
      },
      this.store,
      this.customFirestoreService
    );
  }

  onConnect(user: NgPatAccountState) {
    // implement query
    if (this._queryService) {
      this._queryService.onConnect(
        this.paths.promoCodes(),
        null,
        <string>user.uid
      );
    }

  }

  onDisconnect(user: NgPatAccountState) {
    // Unsubscribe to query
    if (this._queryService) {
      this._queryService.onDisconnect();
    }
    // Unsubscribe to query before calling this
  }
}
