import { createSelector } from '@ngrx/store';
import { selectAllPrices } from './+prices';
import { Price, Product, selectAllProducts } from './+product';
import { StripeProductWithPrices } from './stripe.model';

export const selectProductWithPrices = createSelector(
  selectAllProducts,
  selectAllPrices,
  (products: Product[], prices: Price[]): StripeProductWithPrices[] => {
    return products.map((product: Product) => {
      return <StripeProductWithPrices>{
        product,
        prices: prices.filter((price: Price) => price.parentID === product.id)
      };
    });
  }
);
