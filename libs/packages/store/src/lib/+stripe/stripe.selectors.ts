import { createSelector } from '@ngrx/store';
import { selectNgPatAllStripePrices } from './+prices';
import {
  ProductPrice,
  Product,
  selectNgPatStripeAllProducts
} from './+product';
import { StripeProductWithPrices } from './stripe.model';

export const selectProductWithPrices = createSelector(
  selectNgPatStripeAllProducts,
  selectNgPatAllStripePrices,
  (products: Product[], prices: ProductPrice[]): StripeProductWithPrices[] => {
    return products.map((product: Product) => {
      return <StripeProductWithPrices>{
        product,
        prices: prices.filter(
          (price: ProductPrice) => price.parentID === product.id
        )
      };
    });
  }
);
