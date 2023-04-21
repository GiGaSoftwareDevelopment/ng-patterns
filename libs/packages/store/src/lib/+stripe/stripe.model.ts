import { ProductPrice, Product } from './+product';

export interface StripeProductWithPrices {
  product: Product;
  prices: ProductPrice[];
}
