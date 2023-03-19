import { Inject, Injectable } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import {
  DocumentData,
  DocumentSnapshot,
  getDocs,
  onSnapshot,
  query,
  QuerySnapshot,
  where
} from 'firebase/firestore';
import {
  firestoreOtlidById,
  firestoreOtlidCollection,
  ONE_TIME_LOGIN_ID_CONFIG,
  OneTimeLoginIDConfig,
  OTLIDFirestore
} from './auth.models';
import { Observable, Observer } from 'rxjs';
import { browserLocalPersistence } from 'firebase/auth';
import { switchMap, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { WINDOW, WindowService } from '@ngpat/utils';
import { NgPatFirestoreService } from '@ngpat/firebase';

@Injectable({
  providedIn: 'root'
})
export class OtlidAppService {
  private subscriptionsSub: (() => void) | undefined;

  constructor(
    private _firestore: NgPatFirestoreService,
    private store: Store,
    private _winService: WindowService,
    @Inject(WINDOW) private _win: Window,
    @Inject(ONE_TIME_LOGIN_ID_CONFIG) private _env: OneTimeLoginIDConfig
  ) {}

  launchAuthSite(): Observable<boolean> {
    const otlid = uuidv4().replace(/-/gi, '');
    const authUrlWithOtlidQuery = `${this._env.authSiteURL}?otlid=${otlid}`;

    /**
     * Set One Time Login ID in firestore
     */
    return this._firestore
      .set$(firestoreOtlidById(this._env.databasePathAuthCodes, otlid), <
        OTLIDFirestore
      >{
        otlid,
        jwtToken: null,
        uid: null
      })
      .pipe(
        tap(_ => {
          this._winService.open(authUrlWithOtlidQuery);
        }),

        /**
         * Listen for new jwtToken to be returned from Firestore
         */
        switchMap(() => this._watchForLogin(otlid))
      );
  }

  private _watchForLogin(otlid: string): Observable<boolean> {
    return new Observable((observer: Observer<boolean>) => {
      if (this.subscriptionsSub) {
        this.subscriptionsSub();
      }

      this.subscriptionsSub = onSnapshot(
        this._firestore.docRef(
          firestoreOtlidById(this._env.authSiteURL, otlid)
        ),
        (_doc: DocumentSnapshot<DocumentData>) => {
          if (_doc.exists()) {
            const data: OTLIDFirestore = <OTLIDFirestore>_doc.data();

            if (
              data &&
              data.jwtToken !== undefined &&
              data.jwtToken !== null &&
              data.uid !== undefined &&
              data.uid !== null
            ) {
              /**
               * Delete Auth from database
               */
              this.deleteFirestoreOtlibNodes(data.uid).subscribe(() => {
                if (this.subscriptionsSub) {
                  this.subscriptionsSub();
                }

                this._firestore
                  .setPersistence(browserLocalPersistence)
                  .then(() => {
                    this._firestore
                      .signInWithCustomToken(<string>data.jwtToken)
                      .then(() => {
                        observer.next(true);
                        observer.complete();
                      });
                  });
              });
            }
          }
        }
      );
    });
  }

  deleteFirestoreOtlibNodes(uid: string): Observable<void> {
    return new Observable((observer: Observer<void>) => {
      const _pathRef = this._firestore.collectionRef(
        firestoreOtlidCollection()
      );

      const q = query(_pathRef, where('uid', '==', uid));

      getDocs(q).then((querySnapshot: QuerySnapshot<DocumentData>) => {
        const batch = this._firestore.writeBatch();

        for (let q = 0; q < querySnapshot.docs.length; q++) {
          /**
           * QueryDocumentSnapshot id
           */
          const docRef = this._firestore.docRef(
            firestoreOtlidById(this._env.authSiteURL, querySnapshot.docs[q].id)
          );
          /**
           * Delete doc
           */
          batch.delete(docRef);
        }

        batch
          .commit()
          .then(() => {
            observer.next();
            observer.complete();
          })
          .catch(() => {
            observer.next();
            observer.complete();
          });
      });
    });
  }
}
