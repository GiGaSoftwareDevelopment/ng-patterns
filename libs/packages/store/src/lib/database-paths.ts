import { CreateProjectParams, Project } from './models/project.model';
import { createProjectParamsObject } from './fns/project.fns';

export type PathFunction = () => string;

const USERS = 'users';

const NOTIFICATIONS = 'notifications';
const PROMO_CODES = 'promoCodes';
const APP = 'app';

const PRICES = 'prices';
const PRODUCTS = 'products';
const CUSTOMERS = 'customers';

/**
 * Products
 */
export function firestoreProductCollection() {
  return `${PRODUCTS}`;
}
export function firestoreProductDoc(productID: string) {
  return `${PRODUCTS}/${productID}`;
}

export function firestorePriceCollection(productID: string) {
  return `${PRODUCTS}/${productID}/${PRICES}`;
}

export function firestoreUserSubscriptionsCollection(uid: string) {
  return `${USERS}/${uid}/subscriptions`;
}

export function firestoreUserInvoicesCollection(
  subscriptionID: string,
  uid: string
) {
  return `${USERS}/${uid}/subscriptions/${subscriptionID}/invoices`;
}

export function firestoreUserCheckoutSessionsCollection(uid: string) {
  return `${USERS}/${uid}/checkout_sessions`;
}

export function firestorePromoCodeCollection() {
  return `${PROMO_CODES}`;
}

// Subscriptions

export function getProductsPath() {
  return `${PRODUCTS}`;
}

export function getPricesPath(productId: string) {
  return `${PRODUCTS}/${productId}/prices`;
}

/**
 * User paths
 */
export function firestoreUserCollection() {
  return `${USERS}`;
}

export function firestoreUserAccountDoc(uid: string): string {
  return `${USERS}/${uid}`;
}

/**
 * Promo code paths
 */
export function firestorePromoCodesCollection() {
  return `promoCodes`;
}
export function firestorePromoCodeDoc(codeId: string) {
  return `promoCodes/${codeId}`;
}

/**
 * Permission paths
 */
export function firestorePermissionsCollection() {
  return `permissions`;
}
