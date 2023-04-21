import { TimeStamp } from '../../models/time-stamp.model';

/**
 * https://github.com/stripe/stripe-firebase-extensions/blob/master/firestore-stripe-payments/functions/src/index.ts
 */
export interface Payment {
  /**
   * Amount intended to be collected by this payment. A positive integer representing how much
   * to charge in the smallest currency unit (e.g., 100 cents to charge $1.00 or 100 to charge
   * ¥100, a zero-decimal currency). The minimum amount is $0.50 US or equivalent in charge
   * currency. The amount value supports up to eight digits (e.g., a value of 99999999 for a
   * USD charge of $999,999.99).
   */
  readonly amount: number;
  /**
   * Amount that can be captured from this payment.
   */
  readonly amount_capturable: number;
  /**
   *
   */
  readonly amount_details: {
    tip: any;
  };
  /**
   * Amount that was collected by this payment.
   */
  readonly amount_received: number;

  /**
   * ID of the Connect application that created the PaymentIntent.
   */
  readonly application: any | null;
  readonly application_fee_amount: number;
  readonly automatic_payment_methods: {
    enabled: boolean;
  };
  readonly canceled_at: TimeStamp;
  readonly cancellation_reason: string;
  readonly capture_method: 'automatic' | 'manual';
  /**
   * The date when the payment was created as a UTC timestamp.
   */
  readonly created: string;
  /**
   * Three-letter ISO currency code, in lowercase. Must be a supported currency.
   */
  readonly currency: string;
  /**
   * ID of the Customer this payment belongs to, if one exists. Payment methods attached
   * to other Customers cannot be used with this payment.
   */
  readonly customer: string | null;
  /**
   * An arbitrary string attached to the object. Often useful for displaying to users.
   */
  readonly description: string | null;
  /**
   * Unique Stripe payment ID.
   */
  readonly id: string;
  /**
   * ID of the invoice that created this payment, if it exists.
   */
  readonly invoice: string | null;
  /**
   * Set of key-value pairs that you can attach to an object. This can be useful for storing
   * additional information about the object in a structured format.
   */
  readonly metadata: {
    [name: string]: string;
  };
  /**
   * The list of payment method types (e.g. card) that this payment is allowed to use.
   */
  readonly payment_method_types: string[];
  /**
   * Array of product ID and price ID pairs.
   */
  readonly prices: Array<{
    product: string;
    price: string;
  }>;
  /**
   * Status of this payment.
   */
  readonly status: PaymentStatus;
  /**
   * Firebase Auth UID of the user that created the payment.
   */
  readonly uid: string;
  readonly [propName: string]: any;
}
/**
 * Possible states a payment can be in.
 */
export declare type PaymentStatus =
  | 'requires_payment_method'
  | 'requires_confirmation'
  | 'requires_action'
  | 'processing'
  | 'requires_capture'
  | 'cancelled'
  | 'succeeded';
/**
 * Optional parameters for the {@link getCurrentUserPayments} function.
 */
export interface GetPaymentsOptions {
  /**
   * Specify one or more payment status values to retrieve. When set only the payments
   * with the given status are returned.
   */
  status?: PaymentStatus | PaymentStatus[];
}
/**
 * Different types of changes that may occur on a payment object.
 */
export declare type PaymentChangeType = 'added' | 'modified' | 'removed';
/**
 * Represents the current state of a set of payments owned by a user.
 */
export interface PaymentSnapshot {
  /**
   * A list of all currently available payments ordered by the payment ID. Empty
   * if no payments are available.
   */
  payments: Payment[];
  /**
   * The list of changes in the payments since the last snapshot.
   */
  changes: Array<{
    type: PaymentChangeType;
    payment: Payment;
  }>;
  /**
   * Number of currently available payments. This is same as the length of the
   * `payments` array in the snapshot.
   */
  size: number;
  /**
   * True if there are no payments available. False whenever at least one payment is
   * present. When True, the `payments` array is empty, and the `size` is 0.
   */
  empty: boolean;
}
