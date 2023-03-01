import { Inject, Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import 'firebase/functions';
import { BehaviorSubject, Observable, Observer, ReplaySubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthError, LOGIN_SCREEN, OTLID } from './login.model';
import { User } from 'firebase/auth';
import { getDoc } from 'firebase/firestore';
import { DocumentSnapshot } from '@firebase/firestore';
import firebase from 'firebase/compat';
import { NgPatAccountFirestoreService } from '@ngpat/store';
import DocumentData = firebase.firestore.DocumentData;
import { firestoreOtlidById, ONE_TIME_LOGIN_ID_CONFIG, OneTimeLoginIDConfig } from '../one-time-login-btn/auth.models';

export interface LoginState {
  user: User | null;
  otlid: string | null;
  isLoggingIn: boolean;

  // TODO remove?
  showTokenSaveProgress: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class LoginService extends ComponentStore<LoginState> {
  private _onDestroy$: Subject<boolean> = new Subject();

  loginScreen$: BehaviorSubject<LOGIN_SCREEN> =
    new BehaviorSubject<LOGIN_SCREEN>(LOGIN_SCREEN.SHOW_LOGIN);
  errorMessage$: ReplaySubject<AuthError> = new ReplaySubject<AuthError>(1);
  showProgress$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private _firestore: NgPatAccountFirestoreService,
    @Inject(ONE_TIME_LOGIN_ID_CONFIG) private config: OneTimeLoginIDConfig
  ) {
    super({
      user: null,
      otlid: null,
      isLoggingIn: false,

      // TODO Remove?
      showTokenSaveProgress: false,
    });

    /**
     * Watch for Login
     */
    this.selectIsReadyToWatchForLogin
      .pipe(takeUntil(this._onDestroy$))
      .subscribe((d: {isReadyToLogin: boolean; otlib: string | null}) => {
        if (d.isReadyToLogin && d.otlib) {
          this.watchForAuth(d.otlib);
        }
      });
  }

  readonly addOtlid = this.updater((state: LoginState, otlid: string): LoginState => {
    localStorage.setItem(OTLID, otlid);

    return {
      ...state,
      showTokenSaveProgress: state.user !== null && state.user !== undefined,
      otlid
    };
  });

  readonly addIsLogginIn = this.updater(
    (state: LoginState, isLoggingIn: boolean): LoginState => {
      return {
        ...state,
        isLoggingIn
      };
    }
  );

  readonly addUser = this.updater((state: LoginState, user: User): LoginState => {
    // localStorage.setItem(OTLID, LOGIN_VALUE.IS_WAITING_FOR_TOKEN_TO_SAVE);

    return {
      ...state,

      // if have otlid then token is saving to firestore
      showTokenSaveProgress: state.otlid !== null && state.otlid !== undefined,
      user
    };
  });

  // SELECTORS

  readonly selectState$ = this.select((state: LoginState) => state);

  readonly selectOtlib$: Observable<string | null> = this.select(
    (state: LoginState) => state.otlid
  );
  readonly selectUser$: Observable<User | null> = this.select(
    (state: LoginState) => state.user
  );

  readonly selectIsLoggingIn$: Observable<boolean> = this.select(
    (state: LoginState) => state.isLoggingIn
  );

  readonly selectIsReadyToSignIn: Observable<boolean> = this.select(
    (state: LoginState) =>
      state.isLoggingIn &&
      state.otlid !== undefined &&
      state.otlid !== null &&
      state.otlid?.length > 0
  );

  readonly selectIsReadyToWatchForLogin: Observable<{
    isReadyToLogin: boolean;
    otlib: string | null;
  }> = this.select(
    this.selectIsReadyToSignIn,
    this.selectOtlib$,
    (isReadyToLogin: boolean, otlib: string | null) => {
      return {
        isReadyToLogin,
        otlib
      };
    }
  );

  signout() {
    return this._firestore.auth.signOut();
  }

  checkOtlidInFirestore(otlid: string): Observable<boolean> {
    return new Observable((observer: Observer<boolean>) => {
      const ref = this._firestore.docRef(firestoreOtlidById(this.config.authSiteURL, otlid));
      getDoc(ref).then((doc: DocumentSnapshot<DocumentData>) => {
        if (doc.exists()) {
          this.addOtlid(otlid);
          observer.next(true);
        } else {
          localStorage.removeItem(OTLID);
          observer.error('No Auth ID');
        }
      });
    });
  }

  private watchForAuth(otlid: string) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const that = this;
    if (otlid && otlid.length > 0) {
      this._firestore.auth.onAuthStateChanged((user: User | null) => {
        if (user) {
          that.showProgress$.next(true);
          that.loginScreen$.next(LOGIN_SCREEN.SHOW_LOGGING_IN);

          user.getIdToken().then((idToken: string) => {
            const createAuthToken =
              that._firestore.httpsCallable('createAuthToken');

            createAuthToken({
              otlid,
              idToken
            })
              .then(done => {
                that.loginScreen$.next(LOGIN_SCREEN.SHOW_CLOSE_BROWSER);
                that.showProgress$.next(false);
                localStorage.removeItem(OTLID);
                that
                  .signout()
                  .then(() => {
                    /* noop */
                  })
                  .catch(() => {
                    /* noop */
                  });
              })
              .catch(error => {
                console.log(error);
              });
          });
        }
      });
    }
  }

  destroy() {
    this._onDestroy$.next(true);
  }
}
