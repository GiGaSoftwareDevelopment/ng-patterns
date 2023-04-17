import {Injectable} from '@angular/core';
import {Actions, OnInitEffects} from '@ngrx/effects';
import {Action, Store} from '@ngrx/store';
import {SubscriptionService} from './subscription.service';
import {PartialSubscriptionState} from './subscription.reducer';
import {subscriptionIsInit} from './subscription.actions';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionEffects implements OnInitEffects {
  constructor(
    private _actions$: Actions,
    private _store: Store<PartialSubscriptionState>,
    private _subscriptionService: SubscriptionService
  ) {}

  ngrxOnInitEffects(): Action {
    return subscriptionIsInit();
  }
}
