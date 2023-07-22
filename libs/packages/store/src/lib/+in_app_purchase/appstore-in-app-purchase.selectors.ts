import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as AppstoreInAppPurchaseReducer from './appstore-in-app-purchase.reducer';
import { AppstoreInAppPurchaseState } from './appstore-in-app-purchase.reducer';
import { Dictionary } from '@ngrx/entity/src/models';
import { AppstoreInAppPurchase } from './appstore-in-app-purchase.model';
import { IAPProduct } from '@awesome-cordova-plugins/in-app-purchase-2';

export const selectAppstoreInAppPurchaseState =
  createFeatureSelector<AppstoreInAppPurchaseReducer.AppstoreInAppPurchaseState>(
    AppstoreInAppPurchaseReducer.appstoreInAppPurchaseFeatureKey
  );

const { selectIds, selectEntities, selectAll, selectTotal } =
  AppstoreInAppPurchaseReducer.appstoreInAppPurchaseAdapter.getSelectors();

export const selectAllAppstoreInAppPurchases = createSelector(
  selectAppstoreInAppPurchaseState,
  (
    state: AppstoreInAppPurchaseReducer.AppstoreInAppPurchaseState
  ): AppstoreInAppPurchase[] => {
    return selectAll(state);
  }
);

export const selectNgPatHasActiveIOSSubscription = createSelector(
  selectAllAppstoreInAppPurchases,
  (subs: AppstoreInAppPurchase[]): boolean => {
    const hasOwned = subs.find((s: AppstoreInAppPurchase) => s.owned);

    return hasOwned !== undefined && hasOwned !== null;
  }
);

export const selectAppstoreInAppPurchaseEntities = createSelector(
  selectAppstoreInAppPurchaseState,
  (state: AppstoreInAppPurchaseReducer.AppstoreInAppPurchaseState) =>
    selectEntities(state)
);
export const selectAppstoreInAppPurchaseIds = createSelector(
  selectAppstoreInAppPurchaseState,
  (state: AppstoreInAppPurchaseReducer.AppstoreInAppPurchaseState) =>
    selectIds(state)
);
export const selectAppstoreInAppPurchaseTotal = createSelector(
  selectAppstoreInAppPurchaseState,
  (state: AppstoreInAppPurchaseReducer.AppstoreInAppPurchaseState) =>
    selectTotal(state)
);

export const selectAppstoreInAppPurchaseID = createSelector(
  selectAppstoreInAppPurchaseState,
  (state: AppstoreInAppPurchaseReducer.AppstoreInAppPurchaseState) =>
    state.selectedAppstoreInAppPurchaseID
);

export const selectGetAppstoreInAppPurchaseByID = (id: string) =>
  createSelector(
    selectAppstoreInAppPurchaseEntities,
    (entities: Dictionary<AppstoreInAppPurchase>) => {
      return entities[id];
    }
  );

export const selectAllIOSProducts = createSelector(
  selectAppstoreInAppPurchaseState,
  (state: AppstoreInAppPurchaseState): IAPProduct[] => {
    return Object.values(state.products);
  }
);

export const selectInAppPurchaseCheckOutProgress = createSelector(
  selectAppstoreInAppPurchaseState,
  (state: AppstoreInAppPurchaseState) => state.checkoutInProgress
);

export const selectInAppPurchasePurchaseError = createSelector(
  selectAppstoreInAppPurchaseState,
  (state: AppstoreInAppPurchaseState) => state.checkoutInProgress
);
