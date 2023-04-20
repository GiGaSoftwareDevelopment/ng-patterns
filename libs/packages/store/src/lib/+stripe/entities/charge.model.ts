/**
 * https://stripe.com/docs/api/charges/object
 *
 * Adapted from Firestore object
 */
export interface PaymentCharge {
  id: string;
  object: string;
  amount: number;
  amount_captured: number;
  amount_refunded: number;
  application: string;
  application_fee: string;
  application_fee_amount: number;
  balance_transaction: string;
  billing_details: BillingDetails;
  calculated_statement_descriptor: string;
  captured: boolean;
  created: number;
  currency: string;
  customer: string;
  description: string;
  disputed: boolean;
  failure_balance_transaction: string;
  failure_code: string;
  failure_message: string;
  fraud_details: FraudDetails;
  invoice: string;
  livemode: boolean;
  metadata: Metadata;
  on_behalf_of: string;
  outcome: Outcome;
  paid: boolean;
  payment_intent: string;
  payment_method: string;
  payment_method_details: PaymentMethodDetails;
  receipt_email: string;
  receipt_number: string;
  receipt_url: string;
  refunded: boolean;
  refunds: Refunds;
  review: string;
  shipping: Shipping;
  source_transfer: string;
  statement_descriptor: any;
  statement_descriptor_suffix: any;
  status: string;
  transfer_data: {
    amount: string;
  } | null;
  transfer_group: any | null;
  source: string;
}

export interface Outcome {
  network_status: string;
  reason: string;
  risk_level: string;
  risk_score: number;
  rule: string;
  type: string;
}

export interface BillingDetails {
  address: Address;
  email: any;
  name: any;
  phone: any;
}

export interface Address {
  city: any;
  country: any;
  line1: any;
  line2: any;
  postal_code: any;
  state: any;
}

export interface FraudDetails {
  [key: string]: any;
}

export interface Metadata {
  [key: string]: any;
}

export interface PaymentMethodDetails {
  card: Card;
  type: string;
}

export interface Card {
  brand: string;
  checks: Checks;
  country: string;
  exp_month: number;
  exp_year: number;
  fingerprint: string;
  funding: string;
  installments: any;
  last4: string;
  mandate: any;
  network: string;
  three_d_secure: any;
  wallet: any;
}

export interface Checks {
  address_line1_check: any;
  address_postal_code_check: any;
  cvc_check: string;
}

export interface Refunds {
  object: string;
  data: any[];
  has_more: boolean;
  url: string;
}

export interface Shipping {
  address: {
    city: string;
    country: string; // Two-letter country code (ISO 3166-1 alpha-2).
    line1: string;
    line2: string;
    postal_code: string;
    state: string;
  };
  carrier: string;
  name: string;
  phone: string;
  tracking_number: string;
}
