import * as fromProduct from './+product/product.reducer';
import { ProductEffects } from './+product/product.effects';
import { ProductService } from './+product/product.service';
import * as fromPrice from './+prices/price.reducer';
import { PriceEffects } from './+prices/price.effects';
import * as fromSubscription from './+subscriptions/subscription.reducer';
import { SubscriptionEffects } from './+subscriptions/subscription.effects';
import * as fromPromoCode from './+promo-codes/promo-code.reducer';
import { PromoCodeEffects } from './+promo-codes/promo-code.effects';
import * as fromInvoice from './+invoices/invoice.reducer';
import { InvoiceEffects } from './+invoices/invoice.effects';
import * as formCustomer from './+customer/customer.reducer';
import { CustomerEffects } from './+customer/customer.effects';
import {
  initialPaymentState,
  paymentReducer,
  paymentsFeatureKey
} from './+payment';
import { NgPatPaymentEffects } from './+payment/payment.effects';

export const NG_PAT_STRIPE_REDUCERS = {
  // customer
  [formCustomer.customerFeatureKey]: formCustomer.reducer,
  // invoices
  [fromInvoice.invoiceFeatureKey]: fromInvoice.reducer,
  // paymeht
  [paymentsFeatureKey]: paymentReducer,
  // prices
  [fromPrice.priceFeatureKey]: fromPrice.reducer,
  // product
  [fromProduct.productFeatureKey]: fromProduct.reducer,
  // promo-codes
  [fromPromoCode.promoCodeFeatureKey]: fromPromoCode.reducer,
  // subscriptions
  [fromSubscription.subscriptionFeatureKey]: fromSubscription.reducer
};

export const NG_PAT_STRIPE_INITIALIZERS = {
  [formCustomer.customerFeatureKey]: formCustomer.initialCustomerState,
  [fromInvoice.invoiceFeatureKey]: fromInvoice.initialInvoiceState,
  [paymentsFeatureKey]: initialPaymentState,
  [fromPrice.priceFeatureKey]: fromPrice.initialPriceState,
  [fromProduct.productFeatureKey]: fromProduct.initialProductState,
  [fromPromoCode.promoCodeFeatureKey]: fromPromoCode.initialPromoCodeState,

  [fromSubscription.subscriptionFeatureKey]:
    fromSubscription.initialSubscriptionState
};

export const NG_PAT_STRIPE_EFFECTS = [
  CustomerEffects,
  InvoiceEffects,
  NgPatPaymentEffects,
  PriceEffects,
  ProductEffects,
  PromoCodeEffects,
  SubscriptionEffects
];

export const stripeServices = [ProductService];
