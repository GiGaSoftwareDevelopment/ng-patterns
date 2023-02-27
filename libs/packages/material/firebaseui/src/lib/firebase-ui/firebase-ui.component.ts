import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Inject,
  Output,
  ViewEncapsulation
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { WINDOW } from '@ngpat/utils';
import { NgPatAccountFirestoreService } from '@ngpat/store';
import * as firebaseui from 'firebaseui';
import firebase from 'firebase/compat/app';

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
  @Output() openPrivacyPolicy: EventEmitter<any> = new EventEmitter<any>();
  @Output() openTermsOfUse: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private _customFirebase: NgPatAccountFirestoreService,
    @Inject(WINDOW) private _win: Window
  ) {}

  ngAfterViewInit() {
    // FirebaseUI config.
    const uiConfig: firebaseui.auth.Config = {
      signInSuccessUrl: `${this._win.location.origin}?isLoggingIn=true`,
      signInOptions: [
        // Leave the lines as is for the providers you want to offer your users.
        {
          provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
          // scopes: ['https://www.googleapis.com/auth/contacts.readonly'],
          customParameters: {
            // Forces account selection even when one account
            // is available.
            prompt: 'select_account'
          }
        },
        'apple.com',
        firebase.auth.EmailAuthProvider.PROVIDER_ID
        // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        // firebase.auth.TwitterAuthProvider.PROVIDER_ID,
        // firebase.auth.GithubAuthProvider.PROVIDER_ID,
        // firebase.auth.PhoneAuthProvider.PROVIDER_ID,
        // firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID
      ],
      // tosUrl and privacyPolicyUrl accept either url string or a callback
      // function.
      // Terms of service url/callback.
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
