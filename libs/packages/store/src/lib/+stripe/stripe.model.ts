import {Price, Product} from './+product';

export interface StripeProductWithPrices {
  product: Product;
  prices: Price[];
}
