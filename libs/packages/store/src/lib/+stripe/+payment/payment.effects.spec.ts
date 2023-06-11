import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { Observable } from 'rxjs';

import { NgPatPaymentEffects } from './payment.effects';
import { PaymentService } from './payment.getService';
import { initialPaymentState } from './payment.reducer';
import { selectNgPatAllStripePayments } from './payment.selectors';

jest.mock('./payment.getService');

describe('PaymentEffects', () => {
  let actions$: Observable<any>;
  let effects: NgPatPaymentEffects;
  let getService: PaymentService;

  let storeConfig = {
    initialState: initialPaymentState,
    selectors: [
      {
        selector: selectNgPatAllStripePayments,
        value: [
          // Add mock store entities here
        ]
      }
    ]
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        NgPatPaymentEffects,
        provideMockActions(() => actions$),
        provideMockStore(storeConfig)
      ]
    });

    effects = TestBed.inject(NgPatPaymentEffects);
    getService = TestBed.inject(PaymentService);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
