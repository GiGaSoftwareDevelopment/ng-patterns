/**
 * incomplete, incomplete_expired, trialing, active, past_due, canceled, or unpaid.
 */
import {PriceInterval} from '../+prices';
import {TimeStamp} from '../../models/time-stamp.model';
import {Coupon} from '../+invoices';

export enum SubscriptionStatus {
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

export interface TrialParams {
  days: number;
  remaining: number;
  hasPromoCode: boolean;
  isInTrial: boolean;
  hasActiveSubscription: boolean;
}

export interface Path {
  segments: string[];
  offset: number;
  len: number;
}

export interface Key {
  path: Path;
}

export interface Options {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  measurementId: string;
}

export interface Config {
  name: string;
  automaticDataCollectionEnabled: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Providers {}

export interface Container {
  name: string;
  providers: Providers;
}

export interface App {
  _isDeleted: boolean;
  _options: Options;
  _config: Config;
  _name: string;
  _automaticDataCollectionEnabled: boolean;
  _container: Container;
}

export interface DatabaseId {
  projectId: string;
  database: string;
}

export interface Settings {
  host: string;
  ssl: boolean;
  ignoreUndefinedProperties: boolean;
  cacheSizeBytes: number;
  experimentalForceLongPolling: boolean;
  experimentalAutoDetectLongPolling: boolean;
  useFetchStreams: boolean;
}

export interface Firestore {
  app: App;
  databaseId: DatabaseId;
  settings: Settings;
}

export interface SubscriptionPrice {
  converter?: any;
  _key: Key;
  type: string;
  firestore: Firestore;
}

export interface Path2 {
  segments: string[];
  offset: number;
  len: number;
}

export interface Key2 {
  path: Path2;
}

export interface Options2 {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  measurementId: string;
}

export interface Config2 {
  name: string;
  automaticDataCollectionEnabled: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Providers2 {}

export interface Container2 {
  name: string;
  providers: Providers2;
}

export interface App2 {
  _isDeleted: boolean;
  _options: Options2;
  _config: Config2;
  _name: string;
  _automaticDataCollectionEnabled: boolean;
  _container: Container2;
}

export interface DatabaseId2 {
  projectId: string;
  database: string;
}

export interface Settings2 {
  host: string;
  ssl: boolean;
  ignoreUndefinedProperties: boolean;
  cacheSizeBytes: number;
  experimentalForceLongPolling: boolean;
  experimentalAutoDetectLongPolling: boolean;
  useFetchStreams: boolean;
}

export interface Firestore2 {
  app: App2;
  databaseId: DatabaseId2;
  settings: Settings2;
}

export interface Price2 {
  converter?: any;
  _key: Key2;
  type: string;
  firestore: Firestore2;
}

export interface CurrentPeriodEnd {
  seconds: number;
  nanoseconds: number;
}

export interface Path3 {
  segments: string[];
  offset: number;
  len: number;
}

export interface Key3 {
  path: Path3;
}

export interface Options3 {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  measurementId: string;
}

export interface Config3 {
  name: string;
  automaticDataCollectionEnabled: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Providers3 {}

export interface Container3 {
  name: string;
  providers: Providers3;
}

export interface App3 {
  _isDeleted: boolean;
  _options: Options3;
  _config: Config3;
  _name: string;
  _automaticDataCollectionEnabled: boolean;
  _container: Container3;
}

export interface DatabaseId3 {
  projectId: string;
  database: string;
}

export interface Settings3 {
  host: string;
  ssl: boolean;
  ignoreUndefinedProperties: boolean;
  cacheSizeBytes: number;
  experimentalForceLongPolling: boolean;
  experimentalAutoDetectLongPolling: boolean;
  useFetchStreams: boolean;
}

export interface Firestore3 {
  app: App3;
  databaseId: DatabaseId3;
  settings: Settings3;
}

export interface SubscriptionProduct {
  converter?: any;
  _key: Key3;
  type: string;
  firestore: Firestore3;
}

export interface CurrentPeriodStart {
  seconds: number;
  nanoseconds: number;
}

export interface Created {
  seconds: number;
  nanoseconds: number;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Metadata {}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Metadata2 {}

export interface Recurring {
  interval_count: number;
  aggregate_usage?: any;
  usage_type: string;
  trial_period_days?: any;
  interval: string;
}

export interface Metadata3 {
  firebaseRole: string;
  firebaseType: string;
}

export interface Product2 {
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
  metadata: Metadata3;
  type: string;
  tax_code?: any;
  unit_label?: any;
  package_dimensions?: any;
  images: any[];
  shippable?: any;
  url?: any;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Metadata4 {}

export interface Price3 {
  lookup_key?: any;
  type: string;
  tiers_mode?: any;
  unit_amount: number;
  recurring: Recurring;
  currency: string;
  active: boolean;
  unit_amount_decimal: string;
  created: number;
  nickname?: any;
  billing_scheme: string;
  object: string;
  livemode: boolean;
  product: Product2;
  transform_quantity?: any;
  metadata: Metadata4;
  id: string;
  tax_behavior: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Metadata5 {}

export interface Plan {
  transform_usage?: any;
  nickname?: any;
  tiers_mode?: any;
  amount_decimal: string;
  trial_period_days?: any;
  billing_scheme: string;
  id: string;
  created: number;
  amount: number;
  interval: PriceInterval;
  currency: string;
  metadata: Metadata5;
  object: string;
  livemode: boolean;
  product: string;
  active: boolean;
  usage_type: string;
  aggregate_usage?: any;
  interval_count: number;
}

export interface Item {
  id: string;
  created: number;
  metadata: Metadata2;
  billing_thresholds?: any;
  price: Price3;
  plan: Plan;
  object: string;
  quantity: number;
  subscription: string;
  tax_rates: any[];
}

/**
 * https://stripe.com/docs/api/subscriptions/object
 */
export interface SubscriptionItem {
  price: SubscriptionPrice;
  cancel_at?: TimeStamp | null;
  prices: Price2[];
  role: string;
  ended_at?: TimeStamp | null;
  cancel_at_period_end: boolean;
  trial_start?: TimeStamp | null;
  current_period_end: CurrentPeriodEnd;
  canceled_at?: TimeStamp | null;
  product: SubscriptionProduct;
  quantity: number;
  current_period_start: CurrentPeriodStart;
  stripeLink: string;
  trial_end?: TimeStamp | null;
  created: Created;
  metadata: Metadata;
  items: Item[];
  status: SubscriptionStatus;
  updatedAtSeconds?: number;
  id: string;
}

export type SubscriptionCancel = Pick<
  SubscriptionItem,
  'cancel_at' | 'cancel_at_period_end' | 'canceled_at'
>;

export interface SubscriptionUIItem {
  itemId: string;
  itemPriceProductName: string;
  itemPriceUnit_amount: number;
  itemPriceCurrency: string;
  itemPlanInterval: string;
  itemPriceProductMetadataFirebaseType: string;
  itemPriceProductMetadataFirebaseRole: string;
}

export interface SubscriptionUIdisplay {
  subscription: SubscriptionItem;
  subscriptionID: string;
  items: SubscriptionUIItem[];
  hasCoupon: boolean;
  coupon?: Coupon;
}
