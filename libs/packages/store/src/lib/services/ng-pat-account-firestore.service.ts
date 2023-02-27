import { Inject, Injectable, InjectionToken } from '@angular/core';
import { FIREBASE_APP_TOKEN, FirebaseAppConfig, NgPatAbstractFirestoreService } from '@ngpat/firebase';


@Injectable({
  providedIn: 'root'
})
export class NgPatAccountFirestoreService extends NgPatAbstractFirestoreService  {
  constructor(@Inject(FIREBASE_APP_TOKEN) override appConfig: FirebaseAppConfig<any>) {
    super(appConfig);
  }
}
