import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { Observable } from 'rxjs';

import { CheckoutSessionEffects } from './checkout-session.effects';
import { CheckoutSessionService } from './checkout-session.getService';
import { initialCheckoutSessionState } from './checkout-session.reducer';
import { selectNgPatAllCheckoutSessions } from './checkout-session.selectors';

jest.mock('./checkout-session.getService');

describe('CheckoutSessionEffects', () => {
  let actions$: Observable<any>;
  let effects: CheckoutSessionEffects;
  let getService: CheckoutSessionService;

  let storeConfig = {
    initialState: initialCheckoutSessionState,
    selectors: [
      {
        selector: selectNgPatAllCheckoutSessions,
        value: [
          // Add mock store entities here
        ]
      }
    ]
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CheckoutSessionEffects,
        provideMockActions(() => actions$),
        provideMockStore(storeConfig)
      ]
    });

    effects = TestBed.inject(CheckoutSessionEffects);
    getService = TestBed.inject(CheckoutSessionService);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
