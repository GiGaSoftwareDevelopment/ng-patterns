import { NgPatStripeProductPrice, NgPatStripeProduct } from './+product';

export interface StripeProductWithPrices {
  product: NgPatStripeProduct;
  prices: NgPatStripeProductPrice[];
}
