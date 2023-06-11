import { createSelector } from '@ngrx/store';
import { selectNgPatAllPrices } from './+prices';
import { ProductPrice, Product, selectNgPatAllProducts } from './+product';
import { StripeProductWithPrices } from './stripe.model';

export const selectProductWithPrices = createSelector(
  selectNgPatAllProducts,
  selectNgPatAllPrices,
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
