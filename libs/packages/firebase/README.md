# @uiux/firebase

Common firebase utilities to facilitate connections with firestore and 
integrations with NgRX.

## Adding Uiux Firebase Ngrx State

In your app root module, add to Root Store amd Effects classes.

```typescript
import {NgModule} from '@angular/core';
import { StoreModule } from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';

import {
    UIUX_FIREBASE_ROOT_REDUCERS,
    UIUX_FIREBASE_ROOT_STATE_INITIALIZERS,
    UIUX_FIREBASE_ROOT_EFFECTS
} from '@uiux/firebase';

@NgModule({
    imports: [
        StoreModule.forRoot(
            {
                ...UIUX_FIREBASE_ROOT_REDUCERS
            },
            {
                initialState: {
                    ...UIUX_FIREBASE_ROOT_STATE_INITIALIZERS
                }
            }
        ),
        EffectsModule.forRoot([
            ...UIUX_FIREBASE_ROOT_EFFECTS
        ])
    ]
})
export class AppMoule {
}

```

## Writing a service to connect to firestore
TODO docs

## Using the CustomFireStoreService
TODO docs

## Add Authentication app
TODO docs

## Using Connect / Disconnect Actions

## Demo Site

See [ng-patterns.web.app](https://ng-patterns.web.app/)

## All UiUx Libraries

- [@uiux/calculations](https://uiux-docs-calculations.web.app/index.html)
- [@uiux/charts](https://uiux-docs-charts.web.app/index.html)
- [@uiux/data](https://uiux-docs-data.web.app/index.html)
- [@uiux/date](https://uiux-docs-date.web.app/index.html)
- [@uiux/feature-flag](https://uiux-docs-feature-flag.web.app/index.html)
- [@uiux/firebase](https://uiux-docs-firebase.web.app/index.html)
- [@uiux/fn](https://uiux-docs-fn.web.app/index.html)
- [@uiux/material](https://uiux-docs-material.web.app/index.html)
- [@uiux/nx-ng-mat-prototype](https://uiux-docs-nx-ng-mat-prototype.web.app/index.html)
- [@uiux/rxjs](https://uiux-docs-rxjs.web.app/index.html)
- [@uiux/schematics](https://uiux-docs-schematics.web.app/index.html)
- [@uiux/store](https://uiux-docs-store.web.app/index.html)
- [@uiux/utils](https://uiux-docs-utils.web.app/index.html)
