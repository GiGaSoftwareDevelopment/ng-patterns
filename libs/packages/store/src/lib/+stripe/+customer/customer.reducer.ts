import { createReducer, on } from '@ngrx/store';
import { ngPatLoadStripeCustomer } from './customer.actions';
import { NgPatStripeCustomer } from './customer.model';

export const customerFeatureKey = 'ngPat_stripe_customer';

export const initialCustomerState: NgPatStripeCustomer = {
  customerID: null
};

export const reducer = createReducer(
  initialCustomerState,
  on(ngPatLoadStripeCustomer, (state, action) => {
    return {
      ...state,
      ...action.customer
    };
  })
);
