import {NgPatStripeCoupon, NgPatStripeInvoice} from './invoice.model';

export function getCouponCouponBySubscriptionID(
  invoices: NgPatStripeInvoice[],
  subscriptionID: string
): NgPatStripeCoupon | null {
  const invoice: NgPatStripeInvoice | undefined = invoices.find((i: NgPatStripeInvoice) => {
    return i.subscription === subscriptionID;
  });

  if (
    invoice !== undefined &&
    invoice !== null &&
    invoice.discount &&
    invoice.discount.coupon
  ) {
    return invoice.discount.coupon;
  }

  return null;
}
