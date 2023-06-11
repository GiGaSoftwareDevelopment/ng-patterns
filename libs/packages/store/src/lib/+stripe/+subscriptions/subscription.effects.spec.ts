import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { Observable } from 'rxjs';

import { SubscriptionEffects } from './subscription.effects';
import { SubscriptionService } from './subscription.service';
import { initialSubscriptionState } from './subscription.reducer';
import { selectNgPatAllSubscriptions } from './subscription.selectors';

jest.mock('./subscription.service');

describe('SubscriptionEffects', () => {
  let actions$: Observable<any>;
  let effects: SubscriptionEffects;
  let service: SubscriptionService;

  let storeConfig = {
    initialState: initialSubscriptionState,
    selectors: [
      {
        selector: selectNgPatAllSubscriptions,
        value: [
          // Add mock store entities here
        ]
      }
    ]
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SubscriptionEffects,
        provideMockActions(() => actions$),
        provideMockStore(storeConfig)
      ]
    });

    effects = TestBed.inject(SubscriptionEffects);
    service = TestBed.inject(SubscriptionService);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
