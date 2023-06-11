import { createFeatureSelector, createSelector } from '@ngrx/store';
import { customerFeatureKey } from './customer.reducer';
import { NgPatStripeCustomer } from './customer.model';

export const selectNgPatStripeCustomerState =
  createFeatureSelector<NgPatStripeCustomer>(customerFeatureKey);

export const selectNgPatStripeCustomerID = createSelector(
  selectNgPatStripeCustomerState,
  (state: NgPatStripeCustomer) => state.customerID
);
