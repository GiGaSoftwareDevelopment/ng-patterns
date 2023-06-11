import { createFeatureSelector, createSelector, select } from '@ngrx/store';
import * as ProductReducer from './product.reducer';
import { ProductState } from './product.reducer';
import { Dictionary } from '@ngrx/entity/src/models';
import {
  NgPatStripeProductPrice,
  NgPatStripeProduct,
  NgPatStripeProductWithPrices
} from './product.model';
import { selectNgPatAllStripePrices } from '../+prices';
import { selectNgPatAccountState } from '../../+account/account.selectors';
import {
  selectNgPatHasActiveStripeSubscription,
  selectStripeTrialDays,
  NgPatStripeTrialParams
} from '../+subscriptions';
import {
  NgPatStripePromoCode,
  selectNgPatStripePromoCodeEntities
} from '../+promo-codes';
import { pipe } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { oneDay } from '@ngpat/date';
import { NgPatAccountState } from '../../+account/account.model';

export const selectNgPatStripeProductState =
  createFeatureSelector<ProductReducer.ProductState>(
    ProductReducer.productFeatureKey
  );

const { selectIds, selectEntities, selectAll, selectTotal } =
  ProductReducer.productAdapter.getSelectors();

export const selectNgPatStripeAllProducts = createSelector(
  selectNgPatStripeProductState,
  (state: ProductState) => selectAll(state)
);
export const selectNgPatStripeProductEntities = createSelector(
  selectNgPatStripeProductState,
  (state: ProductState) => selectEntities(state)
);
export const selectNgPatStripeProductIds = createSelector(
  selectNgPatStripeProductState,
  (state: ProductState) => selectIds(state)
);
export const selectNgPatStripeProductTotal = createSelector(
  selectNgPatStripeProductState,
  (state: ProductState) => selectTotal(state)
);

/**
 * selectedProductID
 */
export const selectNgPatCurrentStripeProductID = createSelector(
  selectNgPatStripeProductState,
  (state: ProductReducer.ProductState) => state.selectedProductID
);

export const selectNgPatGetStripeProductByID = (id: string) =>
  createSelector(
    selectNgPatStripeProductEntities,
    (entities: Dictionary<NgPatStripeProduct>) => {
      return entities[id];
    }
  );

export const selectNgPatStripeProductsWiPrices = createSelector(
  selectNgPatStripeAllProducts,
  selectNgPatAllStripePrices,
  (
    products: NgPatStripeProduct[],
    prices: NgPatStripeProductPrice[]
  ): NgPatStripeProductWithPrices[] => {
    const _productWithPrices: NgPatStripeProductWithPrices[] = products.map(
      (product: NgPatStripeProduct) => {
        return {
          product,
          prices: prices.filter(
            (price: NgPatStripeProductPrice) => price.product === product.id
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

export const selectNgPatStripeTrialParams = createSelector(
  selectNgPatAccountState,
  selectNgPatHasActiveStripeSubscription,
  selectNgPatStripePromoCodeEntities,
  selectStripeTrialDays,
  (
    a: NgPatAccountState,
    hasActiveSubscription: boolean,
    promoCodeEntities: Dictionary<NgPatStripePromoCode>,
    trialDays: number
  ): NgPatStripeTrialParams => {
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

export const selectNgPatStripeIsInTrial$ = pipe(
  select(selectNgPatStripeTrialParams),
  map(({ isInTrial }: NgPatStripeTrialParams) => isInTrial),
  distinctUntilChanged()
);
