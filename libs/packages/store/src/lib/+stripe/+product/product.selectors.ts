import { createFeatureSelector, createSelector, select } from '@ngrx/store';
import * as ProductReducer from './product.reducer';
import { ProductState } from './product.reducer';
import { Dictionary } from '@ngrx/entity/src/models';
import { ProductPrice, Product, ProductWithPrices } from './product.model';
import { selectNgPatAllPrices } from '../+prices';
import { selectNgPatAccountState } from '../../+account/account.selectors';
import {
  selectNgPatHasActiveSubscription,
  selectTrialDays,
  TrialParams
} from '../+subscriptions';
import { PromoCode, selectNgPatPromoCodeEntities } from '../+promo-codes';
import { pipe } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { oneDay } from '@ngpat/date';
import { NgPatAccountState } from '../../+account/account.model';

export const selectNgPatProductState =
  createFeatureSelector<ProductReducer.ProductState>(
    ProductReducer.productFeatureKey
  );

const { selectIds, selectEntities, selectAll, selectTotal } =
  ProductReducer.productAdapter.getSelectors();

export const selectNgPatAllProducts = createSelector(
  selectNgPatProductState,
  (state: ProductState) => selectAll(state)
);
export const selectNgPatProductEntities = createSelector(
  selectNgPatProductState,
  (state: ProductState) => selectEntities(state)
);
export const selectNgPatProductIds = createSelector(
  selectNgPatProductState,
  (state: ProductState) => selectIds(state)
);
export const selectNgPatProductTotal = createSelector(
  selectNgPatProductState,
  (state: ProductState) => selectTotal(state)
);

/**
 * selectedProductID
 */
export const selectNgPatCurrentProductID = createSelector(
  selectNgPatProductState,
  (state: ProductReducer.ProductState) => state.selectedProductID
);

export const selectNgPatGetProductByID = (id: string) =>
  createSelector(
    selectNgPatProductEntities,
    (entities: Dictionary<Product>) => {
      return entities[id];
    }
  );

export const selectNgPatProductsWiPrices = createSelector(
  selectNgPatAllProducts,
  selectNgPatAllPrices,
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

export const selectNgPatTrialParams = createSelector(
  selectNgPatAccountState,
  selectNgPatHasActiveSubscription,
  selectNgPatPromoCodeEntities,
  selectTrialDays,
  (
    a: NgPatAccountState,
    hasActiveSubscription: boolean,
    promoCodeEntities: Dictionary<PromoCode>,
    trialDays: number
  ): TrialParams => {
    if (a && a.createdAt !== null && a.createdAt.seconds !== null) {
      const now: number = Date.now().valueOf();
      const start = new Date(a.createdAt.seconds * 1000);
      const remainingDays = trialDays - (now - start.valueOf()) / oneDay;

      return {
        days: trialDays,
        remaining: remainingDays,
        hasActiveSubscription,
        hasPromoCode:
          a.promoCode !== undefined &&
          a.promoCode !== null &&
          promoCodeEntities[a.promoCode] !== undefined,
        isInTrial: remainingDays > 0 && !hasActiveSubscription
      };
    }

    return {
      days: 0,
      remaining: 0,
      hasPromoCode: false,
      isInTrial: false,
      hasActiveSubscription
    };
  }
);

export const selectNgPatIsInTrial$ = pipe(
  select(selectNgPatTrialParams),
  map(({ isInTrial }: TrialParams) => isInTrial),
  distinctUntilChanged()
);
