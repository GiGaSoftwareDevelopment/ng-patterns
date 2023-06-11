import { createFeatureSelector, createSelector, select } from '@ngrx/store';
import * as SubscriptionReducer from './subscription.reducer';
import { Dictionary } from '@ngrx/entity/src/models';
import {
  SubscriptionItem,
  SubscriptionStatus,
  SubscriptionUIdisplay,
  Item,
  SubscriptionUIItem
} from './subscription.model';
import { Coupon, Invoice, selectNgPatAllInvoices } from '../+invoices';
import { getCouponCouponBySubscriptionID } from '../+invoices/invoice.fns';
import { calculateUnitPriceFromDiscount } from './subscription.fns';
import { pipe } from 'rxjs';
import { SubscriptionState } from './subscription.reducer';
// import { hasActiveIOSSubscription } from '../../+in-app-purchase';

export const selectNgPatSubscriptionState =
  createFeatureSelector<SubscriptionReducer.SubscriptionState>(
    SubscriptionReducer.subscriptionFeatureKey
  );

export const selectNgPatSubscriptionsIsInit = createSelector(
  selectNgPatSubscriptionState,
  (state: SubscriptionState) => state.isInit
);

const { selectIds, selectEntities, selectAll, selectTotal } =
  SubscriptionReducer.subscriptionAdapter.getSelectors();

export const selectNgPatAllSubscriptions = createSelector(
  selectNgPatSubscriptionState,
  (state: SubscriptionReducer.SubscriptionState) => selectAll(state)
);
export const selectNgPatSubscriptionEntities = createSelector(
  selectNgPatSubscriptionState,
  (state: SubscriptionReducer.SubscriptionState) => selectEntities(state)
);
export const selectNgPatSubscriptionIds = createSelector(
  selectNgPatSubscriptionState,
  (state: SubscriptionReducer.SubscriptionState) => selectIds(state)
);
export const selectNgPatSubscriptionTotal = createSelector(
  selectNgPatSubscriptionState,
  (state: SubscriptionReducer.SubscriptionState) => selectTotal(state)
);

export const selectTrialDays = createSelector(
  selectNgPatSubscriptionState,
  (state: SubscriptionReducer.SubscriptionState) => state.trialDays
);

export const selectHasActiveStripeSubscription = createSelector(
  selectNgPatAllSubscriptions,
  (subs: SubscriptionItem[]): boolean => {
    const activeSubscriptions = subs.filter(
      (s: SubscriptionItem) => s.status === SubscriptionStatus.active
    );

    return activeSubscriptions.length > 0;
  }
);

// export const selectNgPatHasActiveSubscription = createSelector(
//   selectHasActiveStripeSubscription,
//   hasActiveIOSSubscription,
//   (hasStripe: boolean, hasIOS: boolean) => {
//     return hasStripe || hasIOS;
//   }
// );

export const selectNgPatHasActiveSubscription = createSelector(
  selectHasActiveStripeSubscription,
  (hasStripe: boolean) => {
    return hasStripe;
  }
);

export const selectNgPatHasActiveSubscription$ = pipe(
  select(selectNgPatHasActiveSubscription)
);

// export const selectNgPatNotHasActiveSubscription = createSelector(
//   selectHasActiveStripeSubscription,
//   hasActiveIOSSubscription,
//   (hasStripe: boolean, hasIOS: boolean) => {
//     return !(hasStripe || hasIOS);
//   }
// );

export const selectNgPatNotHasActiveSubscription = createSelector(
  selectHasActiveStripeSubscription,
  (hasStripe: boolean) => {
    return !hasStripe;
  }
);

export const selectNgPatSubscriptionByID = (id: string) =>
  createSelector(
    selectNgPatSubscriptionEntities,
    (entities: Dictionary<SubscriptionItem>) => {
      return entities[id];
    }
  );

export const selectNgPatActiveSubscriptions = createSelector(
  selectNgPatAllSubscriptions,
  (s: SubscriptionItem[]) =>
    s.filter((_s: SubscriptionItem) => _s.status === SubscriptionStatus.active)
);

export const selectNgPatActiveSubscription = createSelector(
  selectNgPatAllSubscriptions,
  (s: SubscriptionItem[]): SubscriptionItem | null => {
    if (s && s.length > 0) {
      return s[0];
    }

    return null;
  }
);

export const selectNgPatActiveSubscriptionID = createSelector(
  selectNgPatAllSubscriptions,
  (subs: SubscriptionItem[]): string | null => {
    if (subs && subs.length > 1) {
      return subs[0].id;
    }

    return null;
  }
);

export const selectNgPatActiveSubscriptionsUIDisplay = createSelector(
  selectNgPatActiveSubscriptions,
  selectNgPatAllInvoices,
  (
    subs: SubscriptionItem[],
    invoices: Invoice[]
  ): SubscriptionUIdisplay | null => {
    return subs.reduce(
      (a: SubscriptionUIdisplay | null, s: SubscriptionItem) => {
        if (!a) {
          const coupon: Coupon | null = getCouponCouponBySubscriptionID(
            invoices,
            s.id
          );

          return <SubscriptionUIdisplay>{
            subscription: s,
            subscriptionID: s.id,
            hasCoupon: coupon !== null,
            coupon: coupon,
            items: s.items
              .filter((i: Item) => i.plan.active)
              .map((i: Item) => {
                return <SubscriptionUIItem>{
                  itemId: i.id,
                  itemPriceProductName: i.price.product.name,
                  itemPriceUnit_amount: calculateUnitPriceFromDiscount(
                    coupon,
                    i
                  ),
                  itemPriceCurrency: i.price.currency,
                  itemPlanInterval: i.plan.interval,
                  itemPriceProductMetadataFirebaseType:
                    i.price.product.metadata.firebaseType,
                  itemPriceProductMetadataFirebaseRole:
                    i.price.product.metadata.firebaseRole
                };
              })
          };
        }

        return a;
      },
      null
    );
  }
);

export const selectNgPatSubscriptionId = createSelector(
  selectNgPatActiveSubscriptionsUIDisplay,
  (subs: SubscriptionUIdisplay | null) => {
    if (subs) {
      return subs.subscriptionID;
    }

    return null;
  }
);

export const selectNgPatHasMonthlySubscription = createSelector(
  selectNgPatActiveSubscriptionsUIDisplay,
  (s: SubscriptionUIdisplay | null) => {
    if (s !== null) {
      const item: SubscriptionUIItem | undefined = s.items.find(
        (i: SubscriptionUIItem) => i.itemPlanInterval === 'month'
      );

      return item !== null && item !== undefined;
    }

    return false;
  }
);

export const selectNgPatHasYearlySubscription = createSelector(
  selectNgPatActiveSubscriptionsUIDisplay,
  (s: SubscriptionUIdisplay | null) => {
    if (s !== null) {
      const item: SubscriptionUIItem | undefined = s.items.find(
        (i: SubscriptionUIItem) => i.itemPlanInterval === 'year'
      );

      return item !== null && item !== undefined;
    }

    return false;
  }
);

export const selectNgPatSubscriptionIsCanceled = createSelector(
  selectNgPatActiveSubscriptions,
  (subs: SubscriptionItem[]) => {
    if (subs && subs.length > 0) {
      return subs.reduce((isCanceled: boolean | null, i: SubscriptionItem) => {
        if (isCanceled === null) {
          return i.cancel_at_period_end;
        }

        return isCanceled;
      }, null);
    }

    return false;
  }
);

export const selectNgPatCouponByActiveSubscription = createSelector(
  selectNgPatActiveSubscription,
  selectNgPatAllInvoices,
  (sub: SubscriptionItem | null, invoices: Invoice[]): Coupon | null => {
    if (sub) {
      return getCouponCouponBySubscriptionID(invoices, sub.id);
    }

    return null;
  }
);

// export const stripeUserIsStudent = createSelector(
//   selectNgPatActiveSubscriptionsUIDisplay,
//   (activeSubscriptionDisplay: SubscriptionUIdisplay | null): boolean => {
//     if (activeSubscriptionDisplay) {
//       return (
//         activeSubscriptionDisplay.items.reduce(
//           (isStudent: boolean | null, i: SubscriptionUIItem) => {
//             if (isStudent === null) {
//               return userIsStudent(
//                 parseInt(i.itemPriceProductMetadataFirebaseRole, 10)
//               );
//             }
//
//             return isStudent;
//           },
//           null
//         ) || false
//       );
//     }
//
//     return true;
//   }
// );

// export const stripeIsTeacher = createSelector(
//   selectNgPatActiveSubscriptionsUIDisplay,
//   (activeSubscriptionDisplay: SubscriptionUIdisplay | null): boolean => {
//     if (activeSubscriptionDisplay) {
//       return (
//         activeSubscriptionDisplay.items.reduce(
//           (isStudent: boolean | null, i: SubscriptionUIItem) => {
//             if (isStudent === null) {
//               return userIsTeacher(
//                 parseInt(i.itemPriceProductMetadataFirebaseRole, 10)
//               );
//             }
//
//             return isStudent;
//           },
//           null
//         ) || false
//       );
//     }
//
//     return false;
//   }
// );

// export const stripeIsMentor = createSelector(
//   selectNgPatActiveSubscriptionsUIDisplay,
//   (activeSubscriptionDisplay: SubscriptionUIdisplay | null): boolean => {
//     if (activeSubscriptionDisplay) {
//       return (
//         activeSubscriptionDisplay.items.reduce(
//           (isStudent: boolean | null, i: SubscriptionUIItem) => {
//             if (isStudent === null) {
//               return userIsParent(
//                 parseInt(i.itemPriceProductMetadataFirebaseRole, 10)
//               );
//             }
//
//             return isStudent;
//           },
//           null
//         ) || false
//       );
//     }
//
//     return false;
//   }
// );
