
## Android

Environment
- [Android](https://capacitorjs.com/docs/android)
- [Install JDK](https://code2care.org/q/install-native-java-jdk-jre-on-apple-silicon-m1-mac)
  note: Note: Java will be installed at /Library/Java/JavaVirtualMachines/ example if you install Java 11 - /Library/Java/JavaVirtualMachines/zulu-11.jdk

- [Trouble Shooting Android in Capacitor](https://capacitorjs.com/docs/android/troubleshooting)

- `npm install @capacitor/android`
- `npx cap add android`


## Rebbuild Android app ( troubleshooting )

Clear AVD Device
1. open Tools > AVD Manager
2. On the device dropdown, Wipe Data


run bash:
`bash androidUpdate.sh`

## Angular Service Worker on Android
- [Github issue](https://github.com/ionic-team/capacitor/issues/5278)
Does not work. In the app.module, disable service worker for android:

`apps/[my-app]-kit/src/app/app.module.ts`

```typescript

const userAgent = window.navigator.userAgent || window.navigator.vendor;

@NgModule({
  declarations: [AppComponent],
  imports: [
    ...
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production && !/android/i.test(userAgent), // <-- DISABLE FOR ANDRIOD
      // enabled: false,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  
  bootstrap: [AppComponent]
})
export class AppModule {
  
}


```


### Setup Firebase in Android
- [https://firebase.google.com/docs/android/setup](https://firebase.google.com/docs/android/setup)

Using the Firebase Android BoM, declare the dependencies for the Firebase products that you want to use in your app. Declare them in your module (app-level) Gradle file (usually app/build.gradle).
```

  // Import the Firebase BoM
  implementation platform('com.google.firebaseConfig:firebaseConfig-bom:29.0.3')

  // When using the BoM, you don't specify versions in Firebase library dependencies

  // Declare the dependency for the Firebase SDK for Google Analytics
  implementation 'com.google.firebaseConfig:firebaseConfig-analytics'

  // Declare the dependencies for any other desired Firebase products
  // For example, declare the dependencies for Firebase Authentication and Cloud Firestore
  implementation 'com.google.firebaseConfig:firebaseConfig-auth'

```


## Auth

In the step - https://github.com/baumblatt/capacitor-firebase-auth#readme
2. In file android/app/src/main/java/.../MainActivity.java add the reference to the Capacitor Firebase Auth plugin inside the Bridge initialization.
   Add this file

```java

package us.[MyApp].app;

import android.os.Bundle;

import com.getcapacitor.BridgeActivity;
import com.baumblatt.capacitor.firebaseConfig.auth.CapacitorFirebaseAuth;
import com.getcapacitor.Plugin;

import java.util.ArrayList;

public class MainActivity extends BridgeActivity {

  @Override
  public void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);

    this.init(savedInstanceState, new ArrayList<Class<? extends Plugin>>() {{
      // Additional plugins you've installed go here
      // Ex: add(TotallyAwesomePlugin.class);
      add(CapacitorFirebaseAuth.class);
    }});
  }
}



```
