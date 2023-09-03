import { Injectable } from '@angular/core';
import { promoCodeFeatureKey } from './promo-code.reducer';
import { Store } from '@ngrx/store';
import { NgPatStripePromoCode } from './promo-code.model';
import {
  ngPatDeleteStripePromoCodes,
  ngPatUpdateStripePromoCodes,
  ngPatUpsertStripePromoCodes
} from './promo-code.actions';
import { aggregateUpdates } from '../../fns/aggregate-updates';
import {
  NgPatFirestoreCollectionQuery,
  NgPatFirestoreCollectionQueryFactory,
  NgPatFirestoreService
} from '@ngpat/firebase';
import { NgPatAbstractConnectionService } from '../../+websocket-registry/ng-pat-abstract-connection.service';
import { NgPatFirestoreWebSocketConnectorService } from '../../services/ng-pat-firestore-web-socket-connector.service';
import { NgPatAccountState } from '../../+account/account.model';
import { StripeFirestorePathsService } from '../firestore-paths/stripe-firestore-paths.service';

@Injectable({
  providedIn: 'root'
})
export class PromoCodeService extends NgPatAbstractConnectionService {
  private _queryService!: NgPatFirestoreCollectionQuery<NgPatStripePromoCode>;

  constructor(
    private collectionQueryFactory: NgPatFirestoreCollectionQueryFactory,
    override customFirestoreService: NgPatFirestoreService,
    override connector: NgPatFirestoreWebSocketConnectorService,
    override store: Store,
    private paths: StripeFirestorePathsService
  ) {
    super(promoCodeFeatureKey, customFirestoreService, connector, store);


  }

  override ngPatOnInit() {
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
    this.connector.keyIsConnected(promoCodeFeatureKey);
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
    this.connector.keyIsDisconnected(promoCodeFeatureKey);
  }
}
