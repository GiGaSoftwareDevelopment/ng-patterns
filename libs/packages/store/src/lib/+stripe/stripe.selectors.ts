import { createSelector } from '@ngrx/store';
import { selectAllPrices } from './+prices';
import { ProductPrice, Product, selectAllProducts } from './+product';
import { StripeProductWithPrices } from './stripe.model';

export const selectProductWithPrices = createSelector(
  selectAllProducts,
  selectAllPrices,
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
