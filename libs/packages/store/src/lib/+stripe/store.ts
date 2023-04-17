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

export const NG_PAT_STRIPE_REDUCERS = {
  [fromProduct.productFeatureKey]: fromProduct.reducer,
  [fromPrice.priceFeatureKey]: fromPrice.reducer,
  [fromSubscription.subscriptionFeatureKey]: fromSubscription.reducer,
  [fromPromoCode.promoCodeFeatureKey]: fromPromoCode.reducer,
  [formCustomer.customerFeatureKey]: formCustomer.reducer,
  [fromInvoice.invoiceFeatureKey]: fromInvoice.reducer
};

export const NG_PAT_STRIPE_INITIALIZERS = {
  [fromProduct.productFeatureKey]: fromProduct.initialProductState,
  [fromPrice.priceFeatureKey]: fromPrice.initialPriceState,
  [fromSubscription.subscriptionFeatureKey]:
    fromSubscription.initialSubscriptionState,
  [fromPromoCode.promoCodeFeatureKey]: fromPromoCode.initialPromoCodeState,
  [formCustomer.customerFeatureKey]: formCustomer.initialCustomerState,
  [fromInvoice.invoiceFeatureKey]: fromInvoice.initialInvoiceState
};

export const NG_PAT_STRIPE_EFFECTS = [
  ProductEffects,
  PriceEffects,
  SubscriptionEffects,
  PromoCodeEffects,
  InvoiceEffects,
  CustomerEffects
];

export const stripeServices = [ProductService];
