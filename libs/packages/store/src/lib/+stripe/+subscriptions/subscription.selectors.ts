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
import { Coupon, Invoice, selectAllInvoices } from '../+invoices';
import { getCouponCouponBySubscriptionID } from '../+invoices/invoice.fns';
import { calculateUnitPriceFromDiscount } from './subscription.fns';
import { pipe } from 'rxjs';
import { SubscriptionState } from './subscription.reducer';
// import { hasActiveIOSSubscription } from '../../+in-app-purchase';

export const selectSubscriptionState =
  createFeatureSelector<SubscriptionReducer.SubscriptionState>(
    SubscriptionReducer.subscriptionFeatureKey
  );

export const selectSubscriptionsIsInit = createSelector(
  selectSubscriptionState,
  (state: SubscriptionState) => state.isInit
);

const { selectIds, selectEntities, selectAll, selectTotal } =
  SubscriptionReducer.subscriptionAdapter.getSelectors();

export const selectAllSubscriptions = createSelector(
  selectSubscriptionState,
  (state: SubscriptionReducer.SubscriptionState) => selectAll(state)
);
export const selectSubscriptionEntities = createSelector(
  selectSubscriptionState,
  (state: SubscriptionReducer.SubscriptionState) => selectEntities(state)
);
export const selectSubscriptionIds = createSelector(
  selectSubscriptionState,
  (state: SubscriptionReducer.SubscriptionState) => selectIds(state)
);
export const selectSubscriptionTotal = createSelector(
  selectSubscriptionState,
  (state: SubscriptionReducer.SubscriptionState) => selectTotal(state)
);

export const selectTrialDays = createSelector(
  selectSubscriptionState,
  (state: SubscriptionReducer.SubscriptionState) => state.trialDays
);

export const selectHasActiveStripeSubscription = createSelector(
  selectAllSubscriptions,
  (subs: SubscriptionItem[]): boolean => {
    const activeSubscriptions = subs.filter(
      (s: SubscriptionItem) => s.status === SubscriptionStatus.active
    );

    return activeSubscriptions.length > 0;
  }
);

// export const selectHasActiveSubscription = createSelector(
//   selectHasActiveStripeSubscription,
//   hasActiveIOSSubscription,
//   (hasStripe: boolean, hasIOS: boolean) => {
//     return hasStripe || hasIOS;
//   }
// );

export const selectHasActiveSubscription = createSelector(
  selectHasActiveStripeSubscription,
  (hasStripe: boolean) => {
    return hasStripe;
  }
);

export const selectHasActiveSubscription$ = pipe(
  select(selectHasActiveSubscription)
);

// export const selectNotHasActiveSubscription = createSelector(
//   selectHasActiveStripeSubscription,
//   hasActiveIOSSubscription,
//   (hasStripe: boolean, hasIOS: boolean) => {
//     return !(hasStripe || hasIOS);
//   }
// );

export const selectNotHasActiveSubscription = createSelector(
  selectHasActiveStripeSubscription,
  (hasStripe: boolean) => {
    return !hasStripe;
  }
);

export const selectSubscriptionByID = (id: string) =>
  createSelector(
    selectSubscriptionEntities,
    (entities: Dictionary<SubscriptionItem>) => {
      return entities[id];
    }
  );

export const selectActiveSubscriptions = createSelector(
  selectAllSubscriptions,
  (s: SubscriptionItem[]) =>
    s.filter((_s: SubscriptionItem) => _s.status === SubscriptionStatus.active)
);

export const selectActiveSubscription = createSelector(
  selectAllSubscriptions,
  (s: SubscriptionItem[]): SubscriptionItem | null => {
    if (s && s.length > 0) {
      return s[0];
    }

    return null;
  }
);

export const selectActiveSubscriptionID = createSelector(
  selectAllSubscriptions,
  (subs: SubscriptionItem[]): string | null => {
    if (subs && subs.length > 1) {
      return subs[0].id;
    }

    return null;
  }
);

export const selectActiveSubscriptionsUIDisplay = createSelector(
  selectActiveSubscriptions,
  selectAllInvoices,
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

export const selectSubscriptionId = createSelector(
  selectActiveSubscriptionsUIDisplay,
  (subs: SubscriptionUIdisplay | null) => {
    if (subs) {
      return subs.subscriptionID;
    }

    return null;
  }
);

export const selectHasMonthlySubscription = createSelector(
  selectActiveSubscriptionsUIDisplay,
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

export const selectHasYearlySubscription = createSelector(
  selectActiveSubscriptionsUIDisplay,
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

export const selectSubscriptionIsCanceled = createSelector(
  selectActiveSubscriptions,
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

export const selectCouponByActiveSubscription = createSelector(
  selectActiveSubscription,
  selectAllInvoices,
  (sub: SubscriptionItem | null, invoices: Invoice[]): Coupon | null => {
    if (sub) {
      return getCouponCouponBySubscriptionID(invoices, sub.id);
    }

    return null;
  }
);

// export const stripeUserIsStudent = createSelector(
//   selectActiveSubscriptionsUIDisplay,
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
//   selectActiveSubscriptionsUIDisplay,
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
//   selectActiveSubscriptionsUIDisplay,
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
