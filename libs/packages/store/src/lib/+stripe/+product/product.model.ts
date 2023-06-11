import { DocumentData, DocumentReference } from 'firebase/firestore';
import { NgPatStripeSubscriptionItem } from '../+subscriptions';
import { NgPatStripePriceInterval } from '../+prices';

// https://stripe.com/docs/api/prices/object
export interface NgPatStripeProductPrice {
  // local only
  id: string;
  name: string;
  product: string;
  role: string | null;

  // the product this price belongs to has a trial options
  productHasTrial: boolean;
  isTrial: boolean;

  // in database
  trial_period_days: number;
  interval_count: number; // 1
  recurring: {
    interval: string; // 'month'
    usage_type: string; // 'licensed'
    trial_period_days: number;
    interval_count: number; // 1
    aggregate_usage: number;
  };
  transform_quantity: number;
  unit_amount: number; // 3numbernumber
  currency: string; // 'usd'
  tiers_mode: number;
  tiers: number;
  description: number;
  type: string; // 'recurring'
  interval: NgPatStripePriceInterval; // 'month'
  billing_scheme: string; // 'per_unit'
  active: boolean; // boolean
  parentID: string;
  metadata: { [key: string]: string };
}

export interface NgPatStripePriceEntities {
  [id: string]: NgPatStripeProductPrice;
}

export interface CurrentSubscriptionEntities {
  [id: string]: NgPatStripeSubscriptionItem;
}

export interface NgPatStripeProduct {
  // local only
  id: string;

  // database
  active: boolean;
  description: string;
  images: string[];
  name: string;
  role: string | null;
  metadata: {
    firebaseType: string;
    firebaseRole: string;
  };
}

export interface NgPatStripePriceOptions {
  product: NgPatStripeProduct;
  prices: NgPatStripeProductPrice[];
}

export interface NgPatStripePriceOptionsFlat {
  product: NgPatStripeProduct;
  price: NgPatStripeProductPrice;
}

export interface NgPatStripeSubscriptionItemDict {
  subscriptionItemEntities: { [id: string]: NgPatStripeSubscriptionItem };
  subscriptionId: string | null;
}

// firestore object created by subscriptions-stripe payments
export interface NgPatStripeProductFirestoreSubscription {
  product: DocumentReference<DocumentData>;
  prices: DocumentReference<DocumentData>[];
  items: NgPatStripeSubscriptionItem[];
  price: DocumentReference<DocumentData>;
}

export interface NgPatStripeProductWithPrices {
  product: NgPatStripeProduct;
  prices: NgPatStripeProductPrice[];
}

/**
 * To Purchase a subscription
 */
export interface NgPatStripeSubscribePayload {
  dynamic_tax_rates: string[];
  price: string | undefined; // price id
  quantity: number;
  customer?: string;
  trial_end?: number;
}

export interface NgPatStripeStripePaymentPayload {
  dynamic_tax_rates: string[];
  price: string | undefined; // price id
  quantity: number;
  customer?: string;
  trial_end?: number;
}

// export interface NgPatStripeCustomer {
//   stripeId: string;
//   stripeLink: string;
// }
