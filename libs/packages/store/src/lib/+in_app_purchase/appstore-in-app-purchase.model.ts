export interface AppstoreInAppPurchase {
  id: string;
  title: string;
  platform: string;
  owned: boolean;
  price: string;
  billingPeriodUnit?: string;
}
