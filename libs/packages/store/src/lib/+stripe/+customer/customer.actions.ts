import { createAction, props } from '@ngrx/store';
import { NgPatStripeCustomer } from './customer.model';

export const ngPatLoadStripeCustomer = createAction(
  '[NgPatStripeCustomer] Load Customers',
  props<{ customer: NgPatStripeCustomer }>()
);
