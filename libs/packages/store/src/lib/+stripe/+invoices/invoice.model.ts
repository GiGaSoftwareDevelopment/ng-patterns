/**
 * https://stripe.com/docs/api/invoices/object
 */
export interface NgPatStripeAutomaticTax {
  enabled: boolean;
  status?: any;
}

export interface NgPatStripeCustomerAddress {
  city: string;
  country: string;
  line1: string;
  line2: string;
  postal_code: string;
  state: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Metadata {}

export interface NgPatStripePeriod {
  end: number;
  start: number;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Metadata2 {}

export interface NgPatStripeInvoicePrice {
  id: string;
  object: string;
  active: boolean;
  billing_scheme: string;
  created: number;
  currency: string;
  livemode: boolean;
  lookup_key?: any;
  metadata: Metadata2;
  nickname?: any;
  product: string;
  recurring?: any;
  tax_behavior: string;
  tiers_mode?: any;
  transform_quantity?: any;
  type: string;
  unit_amount: number;
  unit_amount_decimal: string;
}

export interface NgPatStripeDatum {
  id: string;
  object: string;
  amount: number;
  currency: string;
  description: string;
  discount_amounts: any[];
  discountable: boolean;
  discounts: any[];
  invoice_item: string;
  livemode: boolean;
  metadata: Metadata;
  period: NgPatStripePeriod;
  price: NgPatStripeInvoicePrice;
  proration: boolean;
  quantity: number;
  subscription?: any;
  tax_amounts: any[];
  tax_rates: any[];
  type: string;
}

export interface NgPatStripeLines {
  object: string;
  data: NgPatStripeDatum[];
  has_more: boolean;
  url: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Metadata3 {}

export interface NgPatStripePaymentSettings {
  payment_method_options?: any;
  payment_method_types?: any;
}

export interface NgPatStripeStatusTransitions {
  finalized_at?: any;
  marked_uncollectible_at?: any;
  paid_at?: any;
  voided_at?: any;
}

/*
{
    "id": "di_1K5W4cI79B00MVDml2zbMsNa",
    "object": "discount",
    "customer": "cus_KkdXoUNTpcrFhC",
    "coupon": {
      "times_redeemed": 1,
      "created": 1639228427,
      "id": "TQiyIvWa",
      "redeem_by": null,
      "object": "coupon",
      "metadata": {},
      "name": "Student Beta Tester",
      "amount_off": null,
      "currency": null,
      "max_redemptions": null,
      "percent_off": 100,
      "duration": "forever",
      "valid": true,
      "duration_in_months": null,
      "livemode": false
    },
    "start": 1639231034,
    "subscription": "sub_1K5W4cI79B00MVDm9cy5Jhrm",
    "promotion_code": "promo_1K5VOaI79B00MVDm0hpBigEn",
    "invoice": null,
    "end": null,
    "invoice_item": null,
    "checkout_session": null
  }

 */
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface NgPatStripeCouponMetadata {}

export interface NgPatStripeCoupon {
  times_redeemed: number;
  created: number;
  id: string;
  redeem_by?: any;
  object: string;
  metadata: NgPatStripeCouponMetadata;
  name: string;
  amount_off?: any;
  currency?: any;
  max_redemptions?: any;
  percent_off: number;
  duration: string;
  valid: boolean;
  duration_in_months?: any;
  livemode: boolean;
}

export interface NgPatStripeDiscount {
  id: string;
  object: string;
  customer: string;
  coupon: NgPatStripeCoupon;
  start: number;
  subscription: string;
  promotion_code: string;
  invoice?: any;
  end?: any;
  invoice_item?: any;
  checkout_session?: any;
}

export interface NgPatStripeInvoice {
  id: string;
  object: string;
  account_country: string;
  account_name: string;
  account_tax_ids?: any;
  amount_due: number;
  amount_paid: number;
  amount_remaining: number;
  application_fee_amount?: any;
  attempt_count: number;
  attempted: boolean;
  auto_advance: boolean;
  automatic_tax: NgPatStripeAutomaticTax;
  billing_reason: string;
  charge?: any;
  collection_method: string;
  created: number;
  currency: string;
  custom_fields?: any;
  customer: string;
  customer_address: NgPatStripeCustomerAddress;
  customer_email: string;
  customer_name: string;
  customer_phone?: any;
  customer_shipping?: any;
  customer_tax_exempt: string;
  customer_tax_ids: any[];
  default_payment_method?: any;
  default_source?: any;
  default_tax_rates: any[];
  description?: any;
  discount?: NgPatStripeDiscount;
  discounts: NgPatStripeDiscount[];
  due_date?: any;
  ending_balance?: any;
  footer?: any;
  hosted_invoice_url?: any;
  invoice_pdf?: any;
  last_finalization_error?: any;
  lines: NgPatStripeLines;
  livemode: boolean;
  metadata: Metadata3;
  next_payment_attempt: number;
  number?: any;
  on_behalf_of?: any;
  paid: boolean;
  payment_intent?: any;
  payment_settings: NgPatStripePaymentSettings;
  period_end: number;
  period_start: number;
  post_payment_credit_notes_amount: number;
  pre_payment_credit_notes_amount: number;
  quote?: any;
  receipt_number?: any;
  starting_balance: number;
  statement_descriptor?: any;
  status: string;
  status_transitions: NgPatStripeStatusTransitions;
  subscription?: any;
  subtotal: number;
  tax?: any;
  total: number;
  total_discount_amounts: any[];
  total_tax_amounts: any[];
  transfer_data?: any;
  webhooks_delivered_at?: any;
}
