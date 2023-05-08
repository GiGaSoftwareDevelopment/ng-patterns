# In App Purchase
- [Capacitor Ref](https://capacitorjs.com/docs/guides/in-app-purchases)
- [How to use Ionic In App Purchase with Capacitor](https://devdactic.com/ionic-in-app-purchase-capacitor/)
- [Cordova In App Purchase 2](https://ionicframework.com/docs/native/in-app-purchase-2)


## Setup

Note: make sure all imports are from /ngx:
`import {InAppPurchase2} from '@awesome-cordova-plugins/in-app-purchase-2/ngx';`

In the `app.module.ts`:

```
import {InAppPurchase2} from '@awesome-cordova-plugins/in-app-purchase-2/ngx';

@NgModule({
...
providers: [
 InAppPurchase2 // <-- add here
]
...
})
```

## Testing Sandbox In-App Purchase

Set UP XCODE TO TEST
[TEST STORE PURCHASE IN XCODE](https://developer.apple.com/documentation/xcode/setting-up-storekit-testing-in-xcode)


[Testing in-app purchases in Xcode](https://developer.apple.com/documentation/storekit/in-app_purchase/original_api_for_in-app_purchase/testing_in-app_purchases_in_xcode?language=objc)

TEST USERNAME ( Apple ID ): apptest01@[MyApp].us
TEST PASWORD: [MyApp]Tester01!


References:
- [Billing Receipts](https://billing-dashboard.fovea.cc/dashboard)
- [Create a Sandbox User Test](https://help.apple.com/app-store-connect/#/dev8b997bee1)
- [Testing In-App Purchases with Sandbox](https://developer.apple.com/documentation/storekit/original_api_for_in-app_purchase/testing_in-app_purchases_with_sandbox)


## TESTING LOCALLY



1. In the terminal, navigate to `apps/[my-app]-mobile/[MyApp]-app`
2. In the file `apps/[my-app]-mobile/[MyApp]-app/capacitor.config.json` change `server.url` node to `http://localhost:4200`. ( Original setting is `https://app.[MyApp].us`).
3. Run `npx cap sync` to update apps.
4. Create a [store kit configuration ](https://developer.apple.com/documentation/xcode/setting-up-storekit-testing-in-xcode?language=objc)


