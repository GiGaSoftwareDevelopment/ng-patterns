import { Inject, Injectable, InjectionToken } from '@angular/core';

export interface StripeFirestorePathsConfig {
  PROMO_CODES?: string;
  PRODUCTS?: string;
  CUSTOMERS?: string;
}

export interface StripeFirestorePaths {
  PROMO_CODES: string;
  PRODUCTS: string;
  CUSTOMERS: string;
}

export const defaultStripeFirestorePaths: StripeFirestorePaths = {
  PROMO_CODES: 'promoCodes',
  PRODUCTS: 'products',
  CUSTOMERS: 'customers'
};

export const STRIPE_FIRESTORE_PATHS =
  new InjectionToken<StripeFirestorePathsConfig>('STRIPE_FIRESTORE_PATHS', {
    providedIn: 'root',
    factory: () => ({ ...defaultStripeFirestorePaths })
  });

@Injectable({
  providedIn: 'root'
})
export class StripeFirestorePathsService {
  get stripeFirestorePaths(): StripeFirestorePaths {
    return {
      ...defaultStripeFirestorePaths,
      ...this._firestorePaths
    };
  }
  constructor(
    @Inject(STRIPE_FIRESTORE_PATHS)
    private _firestorePaths: StripeFirestorePathsConfig
  ) {}

  products(): string {
    return `${this.stripeFirestorePaths.PRODUCTS}`;
  }

  productDoc(productID: string): string {
    return `${this.stripeFirestorePaths.PRODUCTS}/${productID}`;
  }

  prices(productID: string): string {
    return `${this.stripeFirestorePaths.PRODUCTS}/${productID}/prices`;
  }

  priceDoc(productID: string, priceID: string): string {
    return `${this.stripeFirestorePaths.PRODUCTS}/${productID}/prices/${priceID}`;
  }

  subscriptions(uid: string): string {
    return `${this.stripeFirestorePaths.CUSTOMERS}/${uid}/subscriptions`;
  }

  invoices(subscriptionID: string, uid: string): string {
    return `${this.stripeFirestorePaths.CUSTOMERS}/${uid}/subscriptions/${subscriptionID}/invoices`;
  }

  checkoutSessions(uid: string): string {
    return `${this.stripeFirestorePaths.CUSTOMERS}/${uid}/checkout_sessions`;
  }

  payments(uid: string): string {
    return `${this.stripeFirestorePaths.CUSTOMERS}/${uid}/payments`;
  }

  promoCodes(): string {
    return `${this.stripeFirestorePaths.PROMO_CODES}`;
  }
}
