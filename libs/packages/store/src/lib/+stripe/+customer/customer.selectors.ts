import { createFeatureSelector, createSelector } from '@ngrx/store';
import { customerFeatureKey } from './customer.reducer';
import { Customer } from './customer.model';

export const selectNgPatStripeCustomerState =
  createFeatureSelector<Customer>(customerFeatureKey);

export const selectNgPatStripeCustomerID = createSelector(
  selectNgPatStripeCustomerState,
  (state: Customer) => state.customerID
);
