import { createAction, props } from '@ngrx/store';
import { Customer } from './customer.model';

export const ngPatLoadCustomer = createAction(
  '[Customer] Load Customers',
  props<{ customer: Customer }>()
);
