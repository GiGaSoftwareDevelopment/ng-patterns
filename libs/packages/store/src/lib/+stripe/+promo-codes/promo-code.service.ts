import { Injectable, NgZone } from '@angular/core';
import { promoCodeFeatureKey } from './promo-code.reducer';
import { Store } from '@ngrx/store';
import { PromoCode } from './promo-code.model';
import {
  ngPatDeletePromoCodes,
  ngPatUpdatePromoCodes,
  ngPatUpsertPromoCodes
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
  private _queryService: NgPatFirestoreCollectionQuery<PromoCode>;

  constructor(
    private collectionQueryFactory: NgPatFirestoreCollectionQueryFactory,
    private _customFirestoreService: NgPatFirestoreService,
    override _connector: NgPatFirestoreWebSocketConnectorService,
    override store: Store,
    private _zone: NgZone,
    private paths: StripeFirestorePathsService
  ) {
    super(promoCodeFeatureKey, _connector, store);

    this._queryService = new NgPatFirestoreCollectionQuery<PromoCode>(
      {
        queryMember: false,
        upsertManyAction: (promoCodes: PromoCode[]) =>
          ngPatUpsertPromoCodes({ promoCodes }),
        updateManyAction: (promoCodes: PromoCode[]) =>
          ngPatUpdatePromoCodes({ promoCodes: aggregateUpdates(promoCodes) }),
        deleteManyAction: (ids: string[]) => ngPatDeletePromoCodes({ ids })
      },
      _zone,
      store,
      _customFirestoreService
    );
  }

  onConnect(user: NgPatAccountState) {
    this._connector.keyIsConnected(promoCodeFeatureKey);
    // implement query
    this._queryService.onConnect(
      this.paths.promoCodes(),
      null,
      <string>user.uid
    );
  }

  onDisconnect(user: NgPatAccountState) {
    // Unsubscribe to query
    this._queryService.onDisconnect();

    // Unsubscribe to query before calling this
    this._connector.keyIsDisconnected(promoCodeFeatureKey);
  }
}
