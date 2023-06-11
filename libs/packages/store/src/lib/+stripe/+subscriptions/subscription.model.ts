/**
 * incomplete, incomplete_expired, trialing, active, past_due, canceled, or unpaid.
 */
import { NgPatStripePriceInterval } from '../+prices';
import { TimeStamp } from '../../models/time-stamp.model';
import { NgPatStripeCoupon } from '../+invoices';

export enum NgPatStripeSubscriptionStatus {
  incomplete = 'incomplete',
  incomplete_expired = 'incomplete_expired',
  trialing = 'trialing',
  active = 'active',
  past_due = 'past_due',
  canceled = 'canceled',
  unpaid = 'unpaid'
}

export interface Trial {
  days: number;
}

export interface NgPatStripeTrialParams {
  days: number;
  remaining: number;
  hasPromoCode: boolean;
  isInTrial: boolean;
  hasActiveSubscription: boolean;
}

export interface NgPatStripePath {
  segments: string[];
  offset: number;
  len: number;
}

export interface NgPatStripeKey {
  path: NgPatStripePath;
}

export interface NgPatStripeOptions {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  measurementId: string;
}

export interface NgPatStripeConfig {
  name: string;
  automaticDataCollectionEnabled: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface NgPatStripeProviders {}

export interface NgPatStripeContainer {
  name: string;
  providers: NgPatStripeProviders;
}

export interface NgPatStripeApp {
  _isDeleted: boolean;
  _options: NgPatStripeOptions;
  _config: NgPatStripeConfig;
  _name: string;
  _automaticDataCollectionEnabled: boolean;
  _container: NgPatStripeContainer;
}

export interface NgPatStripeDatabaseId {
  projectId: string;
  database: string;
}

export interface NgPatStripeSettings {
  host: string;
  ssl: boolean;
  ignoreUndefinedProperties: boolean;
  cacheSizeBytes: number;
  experimentalForceLongPolling: boolean;
  experimentalAutoDetectLongPolling: boolean;
  useFetchStreams: boolean;
}

export interface Firestore {
  app: NgPatStripeApp;
  databaseId: NgPatStripeDatabaseId;
  settings: NgPatStripeSettings;
}

export interface NgPatStripeSubscriptionPrice {
  converter?: any;
  _key: NgPatStripeKey;
  type: string;
  firestore: Firestore;
}

export interface NgPatStripePath2 {
  segments: string[];
  offset: number;
  len: number;
}

export interface NgPatStripeKey2 {
  path: NgPatStripePath2;
}

export interface NgPatStripeOptions2 {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  measurementId: string;
}

export interface NgPatStripeConfig2 {
  name: string;
  automaticDataCollectionEnabled: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface NgPatStripeProviders2 {}

export interface NgPatStripeContainer2 {
  name: string;
  providers: NgPatStripeProviders2;
}

export interface NgPatStripeApp2 {
  _isDeleted: boolean;
  _options: NgPatStripeOptions2;
  _config: NgPatStripeConfig2;
  _name: string;
  _automaticDataCollectionEnabled: boolean;
  _container: NgPatStripeContainer2;
}

export interface NgPatStripeDatabaseId2 {
  projectId: string;
  database: string;
}

export interface NgPatStripeSettings2 {
  host: string;
  ssl: boolean;
  ignoreUndefinedProperties: boolean;
  cacheSizeBytes: number;
  experimentalForceLongPolling: boolean;
  experimentalAutoDetectLongPolling: boolean;
  useFetchStreams: boolean;
}

export interface NgPatStripeFirestore2 {
  app: NgPatStripeApp2;
  databaseId: NgPatStripeDatabaseId2;
  settings: NgPatStripeSettings2;
}

export interface NgPatStripePrice2 {
  converter?: any;
  _key: NgPatStripeKey2;
  type: string;
  firestore: NgPatStripeFirestore2;
}

export interface NgPatStripeCurrentPeriodEnd {
  seconds: number;
  nanoseconds: number;
}

export interface NgPatStripePath3 {
  segments: string[];
  offset: number;
  len: number;
}

export interface NgPatStripeKey3 {
  path: NgPatStripePath3;
}

export interface NgPatStripeOptions3 {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  measurementId: string;
}

export interface NgPatStripeConfig3 {
  name: string;
  automaticDataCollectionEnabled: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface NgPatStripeProviders3 {}

export interface NgPatStripeContainer3 {
  name: string;
  providers: NgPatStripeProviders3;
}

export interface NgPatStripeApp3 {
  _isDeleted: boolean;
  _options: NgPatStripeOptions3;
  _config: NgPatStripeConfig3;
  _name: string;
  _automaticDataCollectionEnabled: boolean;
  _container: NgPatStripeContainer3;
}

export interface NgPatStripeDatabaseId3 {
  projectId: string;
  database: string;
}

export interface NgPatStripeSettings3 {
  host: string;
  ssl: boolean;
  ignoreUndefinedProperties: boolean;
  cacheSizeBytes: number;
  experimentalForceLongPolling: boolean;
  experimentalAutoDetectLongPolling: boolean;
  useFetchStreams: boolean;
}

export interface NgPatStripeFirestore3 {
  app: NgPatStripeApp3;
  databaseId: NgPatStripeDatabaseId3;
  settings: NgPatStripeSettings3;
}

export interface NgPatStripeSubscriptionProduct {
  converter?: any;
  _key: NgPatStripeKey3;
  type: string;
  firestore: NgPatStripeFirestore3;
}

export interface NgPatStripeCurrentPeriodStart {
  seconds: number;
  nanoseconds: number;
}

export interface Created {
  seconds: number;
  nanoseconds: number;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface NgPatStripeSubscriptionMetadata {}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface NgPatStripeSubscriptionMetadata2 {}

export interface NgPatStripeRecurring {
  interval_count: number;
  aggregate_usage?: any;
  usage_type: string;
  trial_period_days?: any;
  interval: string;
}

export interface NgPatStripeSubscriptionMetadata3 {
  firebaseRole: string;
  firebaseType: string;
}

export interface NgPatStripeSubscriptionProduct2 {
  description?: any;
  object: string;
  active: boolean;
  attributes: any[];
  updated: number;
  created: number;
  id: string;
  statement_descriptor?: any;
  name: string;
  livemode: boolean;
  metadata: NgPatStripeSubscriptionMetadata3;
  type: string;
  tax_code?: any;
  unit_label?: any;
  package_dimensions?: any;
  images: any[];
  shippable?: any;
  url?: any;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface NgPatStripeMetadata4 {}

export interface NgPatStripePrice3 {
  lookup_key?: any;
  type: string;
  tiers_mode?: any;
  unit_amount: number;
  recurring: NgPatStripeRecurring;
  currency: string;
  active: boolean;
  unit_amount_decimal: string;
  created: number;
  nickname?: any;
  billing_scheme: string;
  object: string;
  livemode: boolean;
  product: NgPatStripeSubscriptionProduct2;
  transform_quantity?: any;
  metadata: NgPatStripeMetadata4;
  id: string;
  tax_behavior: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface NgPatStripeMetadata5 {}

export interface NgPatStripePlan {
  transform_usage?: any;
  nickname?: any;
  tiers_mode?: any;
  amount_decimal: string;
  trial_period_days?: any;
  billing_scheme: string;
  id: string;
  created: number;
  amount: number;
  interval: NgPatStripePriceInterval;
  currency: string;
  metadata: NgPatStripeMetadata5;
  object: string;
  livemode: boolean;
  product: string;
  active: boolean;
  usage_type: string;
  aggregate_usage?: any;
  interval_count: number;
}

export interface NgPatStripeItem {
  id: string;
  created: number;
  metadata: NgPatStripeSubscriptionMetadata2;
  billing_thresholds?: any;
  price: NgPatStripePrice3;
  plan: NgPatStripePlan;
  object: string;
  quantity: number;
  subscription: string;
  tax_rates: any[];
}

/**
 * https://stripe.com/docs/api/subscriptions/object
 */
export interface NgPatStripeSubscriptionItem {
  price: NgPatStripeSubscriptionPrice;
  cancel_at?: TimeStamp | null;
  prices: NgPatStripePrice2[];
  role: string;
  ended_at?: TimeStamp | null;
  cancel_at_period_end: boolean;
  trial_start?: TimeStamp | null;
  current_period_end: NgPatStripeCurrentPeriodEnd;
  canceled_at?: TimeStamp | null;
  product: NgPatStripeSubscriptionProduct;
  quantity: number;
  current_period_start: NgPatStripeCurrentPeriodStart;
  stripeLink: string;
  trial_end?: TimeStamp | null;
  created: Created;
  metadata: NgPatStripeSubscriptionMetadata;
  items: NgPatStripeItem[];
  status: NgPatStripeSubscriptionStatus;
  updatedAtSeconds?: number;
  id: string;
}

export type NgPatStripeSubscriptionCancel = Pick<
  NgPatStripeSubscriptionItem,
  'cancel_at' | 'cancel_at_period_end' | 'canceled_at'
>;

export interface NgPatStripeSubscriptionUIItem {
  itemId: string;
  itemPriceProductName: string;
  itemPriceUnit_amount: number;
  itemPriceCurrency: string;
  itemPlanInterval: string;
  itemPriceProductMetadataFirebaseType: string;
  itemPriceProductMetadataFirebaseRole: string;
}

export interface NgPatStripeSubscriptionUIdisplay {
  subscription: NgPatStripeSubscriptionItem;
  subscriptionID: string;
  items: NgPatStripeSubscriptionUIItem[];
  hasCoupon: boolean;
  coupon?: NgPatStripeCoupon;
}
