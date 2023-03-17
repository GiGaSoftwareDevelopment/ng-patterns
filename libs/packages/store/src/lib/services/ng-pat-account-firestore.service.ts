import {Inject, Injectable} from '@angular/core';
import {
  NG_PAT_FIREBASE_APP_CONFIG,
  NgPatFirebaseAppConfig,
  NgPatAbstractFirestoreService
} from '@ngpat/firebase';

@Injectable({
  providedIn: 'root'
})
export class NgPatAccountFirestoreService extends NgPatAbstractFirestoreService {
  constructor(
    @Inject(NG_PAT_FIREBASE_APP_CONFIG)
    override appConfig: NgPatFirebaseAppConfig<any>
  ) {
    super(appConfig);
  }
}
