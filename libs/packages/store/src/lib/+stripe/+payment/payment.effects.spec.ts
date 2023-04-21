import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { Observable } from 'rxjs';

import { PaymentEffects } from './payment.effects';
import { PaymentService } from './payment.getService';
import { initialPaymentState } from './payment.reducer';
import { selectAllPayments } from './payment.selectors';

jest.mock('./payment.getService');

describe('PaymentEffects', () => {
  let actions$: Observable<any>;
  let effects: PaymentEffects;
  let getService: PaymentService;

  let storeConfig = {
    initialState: initialPaymentState,
    selectors: [
      {
        selector: selectAllPayments,
        value: [
          // Add mock store entities here
        ]
      }
    ]
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PaymentEffects,
        provideMockActions(() => actions$),
        provideMockStore(storeConfig)
      ]
    });

    effects = TestBed.inject(PaymentEffects);
    getService = TestBed.inject(PaymentService);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
