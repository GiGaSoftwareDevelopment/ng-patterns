// import * as firebaseui from 'firebaseui';
import { EmailAuthProvider, GithubAuthProvider, GoogleAuthProvider, PhoneAuthProvider } from 'firebase/auth';

/**
 * https://firebase.google.com/docs/auth/web/firebaseui
 */
export const firebaseAuthConfig: any = {
  signInOptions: [
    // Leave the lines as is for the providers you want to offer your users.
    {
      provider: GoogleAuthProvider.PROVIDER_ID,
      // scopes: ['https://www.googleapis.com/auth/contacts.readonly'],
      customParameters: {
        // Forces account selection even when one account
        // is available.
        prompt: 'select_account'
      }
    },
    // 'apple.com',
    EmailAuthProvider.PROVIDER_ID,
    // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    // firebase.auth.TwitterAuthProvider.PROVIDER_ID,
    GithubAuthProvider.PROVIDER_ID,
    PhoneAuthProvider.PROVIDER_ID
    // firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID,
  ]

}
