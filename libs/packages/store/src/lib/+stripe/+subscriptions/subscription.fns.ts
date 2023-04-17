import {Coupon} from '../+invoices';
import {Item} from './subscription.model';

export function calculateUnitPriceFromDiscount(
  c: Coupon | null,
  i: Item
): number {
  let unitAmount = 0;

  if (c) {
    if (c.amount_off) {
      unitAmount = i.price.unit_amount - c.amount_off;
    }

    if (c.percent_off) {
      unitAmount =
        i.price.unit_amount - (c.percent_off / 100) * i.price.unit_amount;
    }

    return unitAmount;
  }

  return i.price.unit_amount;
}
