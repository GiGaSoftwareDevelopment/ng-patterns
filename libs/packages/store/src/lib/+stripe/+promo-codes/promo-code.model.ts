export interface PromoCode {
  id: string;
  promoCodeType: string;
  description: string;
  firebaseRole: string;
  active: boolean;
  expiresAt: number;
  isQaAccount: boolean;
}
