import {Coupon, Invoice} from './invoice.model';

export function getCouponCouponBySubscriptionID(
  invoices: Invoice[],
  subscriptionID: string
): Coupon | null {
  const invoice: Invoice | undefined = invoices.find((i: Invoice) => {
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
