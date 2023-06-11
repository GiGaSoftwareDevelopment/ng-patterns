import { createSelector } from '@ngrx/store';
import { selectNgPatAllStripePrices } from './+prices';
import {
  NgPatStripeProductPrice,
  NgPatStripeProduct,
  selectNgPatStripeAllProducts
} from './+product';
import { StripeProductWithPrices } from './stripe.model';

export const selectProductWithPrices = createSelector(
  selectNgPatStripeAllProducts,
  selectNgPatAllStripePrices,
  (products: NgPatStripeProduct[], prices: NgPatStripeProductPrice[]): StripeProductWithPrices[] => {
    return products.map((product: NgPatStripeProduct) => {
      return <StripeProductWithPrices>{
        product,
        prices: prices.filter(
          (price: NgPatStripeProductPrice) => price.parentID === product.id
        )
      };
    });
  }
);
