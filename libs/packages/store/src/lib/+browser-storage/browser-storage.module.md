# Browser Storage NgRx Entity Store

Configure LocalStorage or integrate with NgRX Store.

See https://angular.io/guide/dependency-injection-in-action
Encryption: https://blog.jscrambler.com/working-with-angular-local-storage/


## Add to your application


Import the `browser-storage.module` into your app or library module.


## To configure encryption

Provide the BROWSER_STORAGE_CONFIGURATION InjectionToken:

```typescript

  

  ...
  providers: [
    {
      provide: BROWSER_STORAGE_CONFIGURATION,
      useValue: {
                  enableEncryption: true,
                  encryptionKey: 'myEncryptionKey'
                }
    }
  ],
    ...

```
