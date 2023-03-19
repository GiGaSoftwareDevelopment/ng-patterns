import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Inject,
  InjectionToken,
  Output,
  ViewEncapsulation
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { WINDOW } from '@ngpat/utils';
import * as firebaseui from 'firebaseui';
import { NgPatFirestoreService } from '@ngpat/firebase';

/**
 * https://firebase.google.com/docs/auth/web/firebaseui
 */
export interface FirebaseAuthConfig {
  // Default 'redirect'
  signInFlow?: 'popup' | 'redirect';
  signInOptions: any[];
}

export const FIREBASE_AUTH_CONFIG = new InjectionToken('FIREBASE_AUTH_CONFIG');

@Component({
  selector: 'ng-pat-firebase-ui',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './firebase-ui.component.html',
  styleUrls: ['./firebase-ui.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'ng-pat-firebase-ui'
  }
})
export class FirebaseUiComponent implements AfterViewInit {
  /**
   * Event to open privacy policy url.
   */
  @Output() openPrivacyPolicy: EventEmitter<any> = new EventEmitter<any>();

  /**
   * Event to open terms of use url.
   */
  @Output() openTermsOfUse: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private _customFirebase: NgPatFirestoreService,
    @Inject(FIREBASE_AUTH_CONFIG) private _config: FirebaseAuthConfig,
    @Inject(WINDOW) private _win: Window
  ) {}

  ngAfterViewInit() {
    /**
     * https://firebase.google.com/docs/auth/web/firebaseui
     */
    const uiConfig: firebaseui.auth.Config = {
      signInFlow: this._config.signInFlow
        ? this._config.signInFlow
        : 'redirect',
      signInSuccessUrl: `${this._win.location.origin}?isLoggingIn=true`,
      signInOptions: [...this._config.signInOptions],
      // tosUrl and privacyPolicyUrl accept either url string or a callback
      // function.
      // Terms of getService url/callback.
      tosUrl: () => {
        this.openTermsOfUse.emit(true);
      },
      // Privacy policy url/callback.
      privacyPolicyUrl: () => {
        this.openPrivacyPolicy.emit(true);
      }
    };

    // Initialize the FirebaseUI Widget using Firebase.
    const ui = new firebaseui.auth.AuthUI(this._customFirebase.auth);

    // Auto sign-in for returning users is enabled by default except when prompt is
    // not 'none' in the Google provider custom parameters. To manually disable:
    ui.disableAutoSignIn();

    // The start method will wait until the DOM is loaded.
    ui.start('#firebaseui-auth-container', uiConfig);
  }
}
