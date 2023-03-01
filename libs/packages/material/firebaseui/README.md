# @ngpat/material/firebaseui

Secondary entry point of `@ngpat/material`. It can be used by importing from `@ngpat/material/firebaseui`.

This is a wrapper for [firebaseui](https://firebase.google.com/docs/auth/web/firebaseui).

This components facilitate the auth flow for desktop login using a browser similar to Discord, Slack, and other similar apps. Firebase Authentication does not work ( well ) with Elector or Capacitor showing intermittent failures most of the time. The "issue" is mostly due to using PWA, but failures also exist without PWA architecture. The flow will take these steps:

1. Show a login with browser button in the app.
2. Generate a one time login id.
3. Listen a auth token from a live update from Firestore using the one time login id key.
4. Open a browser upon click login, providing a one time login id in the url.
5. Use Firebase Authentication.
6. Save the user token to FireStore using the one time login id as a key.
7. Prompt user to close browser.
8. App receives token from Firestore.
9. App deletes token in firestore.
10. App manually authenticates using token.
11. App proceeds to authenticated view and state.

## Styles

Add `"firebaseui/dist/firebaseui.css"` to `/targets/build/options/styles` in `project.json`:

```json

{
  "targets": {
    "build": {
      "options": {
        "styles": [
          "apps/[app]/src/styles.scss",
          "firebaseui/dist/firebaseui.css"
        ]
      }
    }
  }
}

```
