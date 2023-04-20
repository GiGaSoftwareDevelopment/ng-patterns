import { PaymentCharge } from './charge.model';

/**
 * https://stripe.com/docs/api/payment_intents/object
 */
export interface PaymentIntent {
  id: string;
  object: string;
  amount: number;
  amount_capturable: number;
  amount_details: AmountDetails;
  amount_received: number;
  application: any;
  application_fee_amount: any;
  automatic_payment_methods: any;
  canceled_at: any;
  cancellation_reason: any;
  capture_method: string;
  charges: {
    data: PaymentCharge[];
    has_more: boolean;
    object: string;
    total_count: number;
    url: string;
  };
  client_secret: string;
  confirmation_method: string;
  created: number;
  currency: string;
  customer: any;
  description: string;
  invoice: any;
  items: PaymentItem[];
  last_payment_error: any;
  latest_charge: any;
  livemode: boolean;
  metadata: Metadata;
  next_action: any;
  on_behalf_of: any;
  payment_method: any;
  payment_method_options: PaymentMethodOptions;
  payment_method_types: string[];
  processing: any;
  receipt_email: any;
  review: any;
  setup_future_usage: any;
  shipping: any;
  statement_descriptor: any;
  statement_descriptor_suffix: any;
  status: string;
  transfer_data: any;
  transfer_group: any;
}

export interface AmountDetails {
  tip: Tip;
}

export interface Tip {
  [key: string]: any;
}

export interface Metadata {
  order_id: string;
}

export interface PaymentMethodOptions {
  card: Card;
}

export interface Card {
  installments: any;
  mandate_options: any;
  network: any;
  request_three_d_secure: string;
}

export interface PaymentItem {
  amount_discount: number;
  amount_subtotal: number;
  amount_tax: number;
  amount_total: number;
  currency: string;
  description: string;
  id: string;
  object: string;
  price: PaymentPrice;
  quantity: number;
}

export interface PaymentPrice {
  active: boolean;
  billing_scheme: string;
  created: number;
  currency: string;
  custom_unit_amount: number | null;
  id: string;
  livemode: boolean;
  lookup_key: any | null;
  metadata: {
    [key: string]: string | number | null;
    nickname: string;
    object: string;
    product: string;
    recurring: string | null;
    tax_behavior: string;
    tiers_mode: string;
    transform_quantity: string | null;
    type: string;
    unit_amount: number;
    unit_amount_decimal: string;
  };
}
