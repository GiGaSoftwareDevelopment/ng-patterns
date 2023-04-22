import { TimeStamp } from '../../models/time-stamp.model';
import { Mode } from '../entities/mode.model';

export interface CheckoutSession {
  allow_promotion_codes: boolean;
  cancel_url: string;
  web: string;
  created: TimeStamp;
  id: string;
  line_items: CheckoutSessionItem[];
  mode: Mode;
  sessionId: string;
  success_url: string;
  url: string;
}

export interface CheckoutSessionItem {
  dynamic_tax_rates: any[];
  price: string;
  quantity: number;
}
