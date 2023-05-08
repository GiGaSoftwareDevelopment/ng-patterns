# CAPACITOR

- [Environment setup](https://capacitorjs.com/docs/getting-started/environment-setup)
- [Getting Started](https://capacitorjs.com/docs/getting-started)
- [iOS](https://capacitorjs.com/docs/ios)
- [Android](https://capacitorjs.com/docs/android)****



## Prepare

Install Cocoapods on Rosetta:

`arch -arm64 brew install cocoapods`

## Add iOS
- [Capacitor iOS doc](https://capacitorjs.com/docs/ios)

- `npm install @capacitor/ios`
- `npx cap add ios`
- `npx cap run ios`


## icons
- [App Store Icon](https://help.apple.com/app-store-connect/#/dev910472ff2)
- [sizes](https://developer.apple.com/design/human-interface-guidelines/ios/icons-and-images/system-icons/)
- [ref](https://github.com/ionic-team/capacitor-assets)
  - See Capictor Section

1. Prepare: Icon png files are saved in `apps/[my-app]-mobile/[MyApp]-app/resources` from Figma. See links above for sizes.

2. Run `cordova-res ios --skip-config --copy`. Generates all ios icon sizes from Figma pngs, and copies them to the ios app.
2. Run `cordova-res android --skip-config --copy`. Generates all ios icon sizes from Figma pngs, and copies them to the ios app.


## Camera
- [ref](https://capacitorjs.com/docs/apis/camera)


iOS requires the following usage description be added and filled out for your app in Info.plist:
```


NSCameraUsageDescription (Privacy - Camera Usage Description)
  - [MyApp] requires camera access to capture images.
  
NSPhotoLibraryAddUsageDescription (Privacy - Photo Library Additions Usage Description)
  - [MyApp] requires photo library access to uploaded images.

NSPhotoLibraryUsageDescription (Privacy - Photo Library Usage Description)

  - [MyApp] requires photo library access to upload images.

```

## Deployment
- [iOS Deployment](https://www.joshmorony.com/deploying-capacitor-applications-to-ios-development-distribution/)


## App Reviews

email: tester@[MyApp].us
password: AppReviewer2022


## Android

Environment
- [Android](https://capacitorjs.com/docs/android)
- [Install JDK](https://code2care.org/q/install-native-java-jdk-jre-on-apple-silicon-m1-mac)
  note: Note: Java will be installed at /Library/Java/JavaVirtualMachines/ example if you install Java 11 - /Library/Java/JavaVirtualMachines/zulu-11.jdk



- `npm install @capacitor/android`
- `npx cap add android`


## Geolocation

- [Geolocation](https://capacitorjs.com/docs/apis/geolocation)

Install
```bash
npm install --save capacitor-firebaseConfig-auth
npx cap sync
```
