import { createFeatureSelector, createSelector, select } from '@ngrx/store';
import * as SubscriptionReducer from './subscription.reducer';
import { Dictionary } from '@ngrx/entity/src/models';
import {
  NgPatStripeSubscriptionItem,
  NgPatStripeSubscriptionStatus,
  NgPatStripeSubscriptionUIdisplay,
  NgPatStripeItem,
  NgPatStripeSubscriptionUIItem
} from './subscription.model';
import {
  NgPatStripeCoupon,
  NgPatStripeInvoice,
  selectNgPatAllStripeInvoices
} from '../+invoices';
import { getCouponCouponBySubscriptionID } from '../+invoices/invoice.fns';
import { calculateUnitPriceFromDiscount } from './subscription.fns';
import { pipe } from 'rxjs';
import { SubscriptionState } from './subscription.reducer';
// import { hasActiveIOSSubscription } from '../../+in-app-purchase';

export const selectNgPatStripeSubscriptionState =
  createFeatureSelector<SubscriptionReducer.SubscriptionState>(
    SubscriptionReducer.subscriptionFeatureKey
  );

export const selectNgPatStripeSubscriptionsIsInit = createSelector(
  selectNgPatStripeSubscriptionState,
  (state: SubscriptionState) => state.isInit
);

const { selectIds, selectEntities, selectAll, selectTotal } =
  SubscriptionReducer.subscriptionAdapter.getSelectors();

export const selectNgPatStripeAllSubscriptions = createSelector(
  selectNgPatStripeSubscriptionState,
  (state: SubscriptionReducer.SubscriptionState) => selectAll(state)
);
export const selectNgPatStripeSubscriptionEntities = createSelector(
  selectNgPatStripeSubscriptionState,
  (state: SubscriptionReducer.SubscriptionState) => selectEntities(state)
);
export const selectNgPatStripeSubscriptionIds = createSelector(
  selectNgPatStripeSubscriptionState,
  (state: SubscriptionReducer.SubscriptionState) => selectIds(state)
);
export const selectNgPatStripeSubscriptionTotal = createSelector(
  selectNgPatStripeSubscriptionState,
  (state: SubscriptionReducer.SubscriptionState) => selectTotal(state)
);

export const selectStripeTrialDays = createSelector(
  selectNgPatStripeSubscriptionState,
  (state: SubscriptionReducer.SubscriptionState) => state.trialDays
);

export const selectHasActiveStripeSubscription = createSelector(
  selectNgPatStripeAllSubscriptions,
  (subs: NgPatStripeSubscriptionItem[]): boolean => {
    const activeSubscriptions = subs.filter(
      (s: NgPatStripeSubscriptionItem) =>
        s.status === NgPatStripeSubscriptionStatus.active
    );

    return activeSubscriptions.length > 0;
  }
);

// export const selectNgPatHasActiveStripeSubscription = createSelector(
//   selectHasActiveStripeSubscription,
//   hasActiveIOSSubscription,
//   (hasStripe: boolean, hasIOS: boolean) => {
//     return hasStripe || hasIOS;
//   }
// );

export const selectNgPatHasActiveStripeSubscription = createSelector(
  selectHasActiveStripeSubscription,
  (hasStripe: boolean) => {
    return hasStripe;
  }
);

export const selectNgPatHasActiveSubscription$ = pipe(
  select(selectNgPatHasActiveStripeSubscription)
);

// export const selectNgPatNotHasActiveStripeSubscription = createSelector(
//   selectHasActiveStripeSubscription,
//   hasActiveIOSSubscription,
//   (hasStripe: boolean, hasIOS: boolean) => {
//     return !(hasStripe || hasIOS);
//   }
// );

export const selectNgPatNotHasActiveStripeSubscription = createSelector(
  selectHasActiveStripeSubscription,
  (hasStripe: boolean) => {
    return !hasStripe;
  }
);

export const selectNgPatStripeSubscriptionByID = (id: string) =>
  createSelector(
    selectNgPatStripeSubscriptionEntities,
    (entities: Dictionary<NgPatStripeSubscriptionItem>) => {
      return entities[id];
    }
  );

export const selectNgPatActiveStripeSubscriptions = createSelector(
  selectNgPatStripeAllSubscriptions,
  (s: NgPatStripeSubscriptionItem[]) =>
    s.filter(
      (_s: NgPatStripeSubscriptionItem) =>
        _s.status === NgPatStripeSubscriptionStatus.active
    )
);

export const selectNgPatActiveStripeSubscription = createSelector(
  selectNgPatStripeAllSubscriptions,
  (s: NgPatStripeSubscriptionItem[]): NgPatStripeSubscriptionItem | null => {
    if (s && s.length > 0) {
      return s[0];
    }

    return null;
  }
);

export const selectNgPatActiveStripeSubscriptionID = createSelector(
  selectNgPatStripeAllSubscriptions,
  (subs: NgPatStripeSubscriptionItem[]): string | null => {
    if (subs && subs.length > 1) {
      return subs[0].id;
    }

    return null;
  }
);

export const selectNgPatActiveStripeSubscriptionsUIDisplay = createSelector(
  selectNgPatActiveStripeSubscriptions,
  selectNgPatAllStripeInvoices,
  (
    subs: NgPatStripeSubscriptionItem[],
    invoices: NgPatStripeInvoice[]
  ): NgPatStripeSubscriptionUIdisplay | null => {
    return subs.reduce(
      (
        a: NgPatStripeSubscriptionUIdisplay | null,
        s: NgPatStripeSubscriptionItem
      ) => {
        if (!a) {
          const coupon: NgPatStripeCoupon | null =
            getCouponCouponBySubscriptionID(invoices, s.id);

          return <NgPatStripeSubscriptionUIdisplay>{
            subscription: s,
            subscriptionID: s.id,
            hasCoupon: coupon !== null,
            coupon: coupon,
            items: s.items
              .filter((i: NgPatStripeItem) => i.plan.active)
              .map((i: NgPatStripeItem) => {
                return <NgPatStripeSubscriptionUIItem>{
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

export const selectNgPatStripeSubscriptionId = createSelector(
  selectNgPatActiveStripeSubscriptionsUIDisplay,
  (subs: NgPatStripeSubscriptionUIdisplay | null) => {
    if (subs) {
      return subs.subscriptionID;
    }

    return null;
  }
);

export const selectNgPatHasMonthlyStripeSubscription = createSelector(
  selectNgPatActiveStripeSubscriptionsUIDisplay,
  (s: NgPatStripeSubscriptionUIdisplay | null) => {
    if (s !== null) {
      const item: NgPatStripeSubscriptionUIItem | undefined = s.items.find(
        (i: NgPatStripeSubscriptionUIItem) => i.itemPlanInterval === 'month'
      );

      return item !== null && item !== undefined;
    }

    return false;
  }
);

export const selectNgPatHasYearlyStripeSubscription = createSelector(
  selectNgPatActiveStripeSubscriptionsUIDisplay,
  (s: NgPatStripeSubscriptionUIdisplay | null) => {
    if (s !== null) {
      const item: NgPatStripeSubscriptionUIItem | undefined = s.items.find(
        (i: NgPatStripeSubscriptionUIItem) => i.itemPlanInterval === 'year'
      );

      return item !== null && item !== undefined;
    }

    return false;
  }
);

export const selectNgPatStripeSubscriptionIsCanceled = createSelector(
  selectNgPatActiveStripeSubscriptions,
  (subs: NgPatStripeSubscriptionItem[]) => {
    if (subs && subs.length > 0) {
      return subs.reduce(
        (isCanceled: boolean | null, i: NgPatStripeSubscriptionItem) => {
          if (isCanceled === null) {
            return i.cancel_at_period_end;
          }

          return isCanceled;
        },
        null
      );
    }

    return false;
  }
);

export const selectNgPatCouponByActiveStripeSubscription = createSelector(
  selectNgPatActiveStripeSubscription,
  selectNgPatAllStripeInvoices,
  (
    sub: NgPatStripeSubscriptionItem | null,
    invoices: NgPatStripeInvoice[]
  ): NgPatStripeCoupon | null => {
    if (sub) {
      return getCouponCouponBySubscriptionID(invoices, sub.id);
    }

    return null;
  }
);

// export const stripeUserIsStudent = createSelector(
//   selectNgPatActiveStripeSubscriptionsUIDisplay,
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
//   selectNgPatActiveStripeSubscriptionsUIDisplay,
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
//   selectNgPatActiveStripeSubscriptionsUIDisplay,
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
