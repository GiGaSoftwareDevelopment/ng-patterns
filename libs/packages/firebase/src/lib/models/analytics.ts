/**
 * https://firebase.google.com/docs/analytics/events?platform=web&authuser=0
 *
 * Recommended for all apps
 * https://support.google.com/firebase/answer/9267735?ref_topic=6317484&authuser=0&visit_id=637676510524744564-2509524093&rd=1
 *
 * Recommended events
 * https://developers.google.com/analytics/devguides/collection/ga4/reference/events#login
 */

import {EventParams} from 'firebase/analytics';
import firebase from 'firebase/compat';
import CustomEventName = firebase.analytics.CustomEventName;

export type SiteEventName =
  | 'app_init'
  | 'view_home'
  | 'app_active'
  | 'app_inactive';

export type CombinedEventName<T> = SiteEventName & CustomEventName<T>;

export type AppEventName<T> = T extends CombinedEventName<T> ? never : T;

export interface FirebaseAnalyticEventParams {
  promo_code?: string | null;
  uid?: string | null;
  email?: string | null;
  stage_name?: string | null;

  payment_type?: EventParams['payment_type'];

  shipping_tier?: EventParams['shipping_tier'];

  description?: EventParams['description'];
  fatal?: EventParams['fatal'];

  page_title?: string;
  page_location?: string;
  page_path?: string;

  value?: EventParams['value'];
  currency?: EventParams['currency'];
  transaction_id?: EventParams['transaction_id'];
  tax?: EventParams['tax'];
  shipping?: EventParams['shipping'];
  items?: EventParams['items'];
  coupon?: EventParams['coupon'];
  affiliation?: EventParams['affiliation'];

  firebase_screen?: EventParams['firebase_screen'];
  firebase_screen_class?: EventParams['firebase_screen_class'];

  search_term?: EventParams['search_term'];

  promotion_id?: EventParams['promotion_id'];
  promotion_name?: EventParams['promotion_name'];

  checkout_step?: EventParams['checkout_step'];
  checkout_option?: EventParams['checkout_option'];

  method?: EventParams['method'];
  content_type?: EventParams['content_type'];
  item_id?: EventParams['item_id'];

  name?: string;
  event_category?: string;
  event_label?: string;

  // 'view_cart' | 'view_item'
  // 'view_cart' | 'view_item'

  item_list_name?: EventParams['item_list_name'];
  item_list_id?: EventParams['item_list_id'];

  [key: string]: any;
}
