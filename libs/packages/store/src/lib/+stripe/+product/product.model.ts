import { DocumentData, DocumentReference } from 'firebase/firestore';
import { SubscriptionItem } from '../+subscriptions';
import { PriceInterval } from '../+prices';

// https://stripe.com/docs/api/prices/object
export interface ProductPrice {
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
  interval: PriceInterval; // 'month'
  billing_scheme: string; // 'per_unit'
  active: boolean; // boolean
  parentID: string;
  metadata: { [key: string]: string };
}

export interface PriceEntities {
  [id: string]: ProductPrice;
}

export interface CurrentSubscriptionEntities {
  [id: string]: SubscriptionItem;
}

export interface Product {
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

export interface PriceOptions {
  product: Product;
  prices: ProductPrice[];
}

export interface PriceOptionsFlat {
  product: Product;
  price: ProductPrice;
}

export interface SubscriptionItemDict {
  subscriptionItemEntities: { [id: string]: SubscriptionItem };
  subscriptionId: string | null;
}

// firestore object created by subscriptions-stripe payments
export interface ProductFirestoreSubscription {
  product: DocumentReference<DocumentData>;
  prices: DocumentReference<DocumentData>[];
  items: SubscriptionItem[];
  price: DocumentReference<DocumentData>;
}

export interface ProductWithPrices {
  product: Product;
  prices: ProductPrice[];
}

/**
 * To Purchase a subscription
 */
export interface SubscribePayload {
  dynamic_tax_rates: string[];
  price: string | undefined; // price id
  quantity: number;
  customer?: string;
  trial_end?: number;
}

export interface StripePaymentPayload {
  dynamic_tax_rates: string[];
  price: string | undefined; // price id
  quantity: number;
  customer?: string;
  trial_end?: number;
}

// export interface Customer {
//   stripeId: string;
//   stripeLink: string;
// }
