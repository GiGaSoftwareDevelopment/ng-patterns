import { createFeatureSelector, createSelector } from '@ngrx/store';
import { customerFeatureKey } from './customer.reducer';
import { Customer } from './customer.model';

export const selectNgPatCustomerState =
  createFeatureSelector<Customer>(customerFeatureKey);

export const selectNgPatCustomerID = createSelector(
  selectNgPatCustomerState,
  (state: Customer) => state.customerID
);
