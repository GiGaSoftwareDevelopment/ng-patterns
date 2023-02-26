import { Inject, Injectable, InjectionToken } from '@angular/core';
import { FIREBASE_APP_TOKEN, FirebaseAppConfig, NgPatFirestoreService } from '@ngpat/firebase';


@Injectable({
  providedIn: 'root'
})
export class GigaAccountFirestoreService extends NgPatFirestoreService  {
  constructor(@Inject(FIREBASE_APP_TOKEN) override appConfig: FirebaseAppConfig<any>) {
    super(appConfig);
  }
}
