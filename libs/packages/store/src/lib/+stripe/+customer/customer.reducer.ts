import { createReducer, on } from '@ngrx/store';
import { ngPatLoadCustomer } from './customer.actions';
import { Customer } from './customer.model';

export const customerFeatureKey = 'stripe_customer';

export const initialCustomerState: Customer = {
  customerID: null
};

export const reducer = createReducer(
  initialCustomerState,
  on(ngPatLoadCustomer, (state, action) => {
    return {
      ...state,
      ...action.customer
    };
  })
);
