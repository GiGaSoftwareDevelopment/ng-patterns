export interface NgPatStripePromoCode {
  id: string;
  promoCodeType: string;
  description: string;
  firebaseRole: string;
  active: boolean;
  expiresAt: number;
  isQaAccount: boolean;
}
