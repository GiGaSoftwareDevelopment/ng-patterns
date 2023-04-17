import {createFeatureSelector, createSelector} from '@ngrx/store';
import {customerFeatureKey} from './customer.reducer';
import {Customer} from './customer.model';

export const selectCustomerState =
  createFeatureSelector<Customer>(customerFeatureKey);

export const selectCustomerID = createSelector(
  selectCustomerState,
  (state: Customer) => state.customerID
);
