import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as ProductReducer from './product.reducer';
import { ProductState } from './product.reducer';
import { Dictionary } from '@ngrx/entity/src/models';
import { ProductPrice, Product, ProductWithPrices } from './product.model';
import { selectAllPrices } from '../+prices';

export const selectProductState =
  createFeatureSelector<ProductReducer.ProductState>(
    ProductReducer.productFeatureKey
  );

const { selectIds, selectEntities, selectAll, selectTotal } =
  ProductReducer.productAdapter.getSelectors();

export const selectAllProducts = createSelector(
  selectProductState,
  (state: ProductState) => selectAll(state)
);
export const selectProductEntities = createSelector(
  selectProductState,
  (state: ProductState) => selectEntities(state)
);
export const selectProductIds = createSelector(
  selectProductState,
  (state: ProductState) => selectIds(state)
);
export const selectProductTotal = createSelector(
  selectProductState,
  (state: ProductState) => selectTotal(state)
);

/**
 * selectedProductID
 */
export const selectCurrentProductID = createSelector(
  selectProductState,
  (state: ProductReducer.ProductState) => state.selectedProductID
);

export const selectGetProductByID = (id: string) =>
  createSelector(selectProductEntities, (entities: Dictionary<Product>) => {
    return entities[id];
  });

export const selectProductsWiPrices = createSelector(
  selectAllProducts,
  selectAllPrices,
  (products: Product[], prices: ProductPrice[]): ProductWithPrices[] => {
    const _productWithPrices: ProductWithPrices[] = products.map(
      (product: Product) => {
        return {
          product,
          prices: prices.filter(
            (price: ProductPrice) => price.product === product.id
          )
        };
      }
    );

    const _productWithPricesSorted = [];

    for (let i = 0; i < _productWithPrices.length; i++) {
      if (_productWithPrices[i].product.name.includes('Student')) {
        _productWithPricesSorted[0] = _productWithPrices[i];
      } else if (_productWithPrices[i].product.name.includes('Mentor')) {
        _productWithPricesSorted[1] = _productWithPrices[i];
      } else {
        _productWithPricesSorted[2] = _productWithPrices[i];
      }
    }

    return _productWithPricesSorted;
  }
);

// export const selectTrialParams = createSelector(
//   selectNgPatAccountState,
//   selectHasActiveSubscription,
//   selectPromoCodeEntities,
//   selectTrialDays,
//   (
//     a: NgPatAccountState,
//     hasActiveSubscription: boolean,
//     promoCodeEntities: Dictionary<PromoCode>,
//     trialDays: number
//   ): TrialParams => {
//     if (a && a.createdAt !== null && a.createdAt.seconds !== null) {
//       const now: number = Date.now().valueOf();
//       const start = new Date(a.createdAt.seconds * 1000);
//       const remainingDays = trialDays - (now - start.valueOf()) / oneDay;
//
//       return {
//         days: trialDays,
//         remaining: remainingDays,
//         hasActiveSubscription,
//         hasPromoCode:
//           a.promoCode !== undefined &&
//           a.promoCode !== null &&
//           promoCodeEntities[a.promoCode] !== undefined,
//         isInTrial: remainingDays > 0 && !hasActiveSubscription
//       };
//     }
//
//     return {
//       days: 0,
//       remaining: 0,
//       hasPromoCode: false,
//       isInTrial: false,
//       hasActiveSubscription
//     };
//   }
// );

// export const selectIsInTrial$ = pipe(
//   select(selectTrialParams),
//   map(({isInTrial}: TrialParams) => isInTrial),
//   distinctUntilChanged()
// );
