# @ngpat/store

Custom stores. Some stores augment NgRx, some are standalone for extreme performance. Common firebase utilities to facilitate connections with firestore and
integrations with NgRX.

## Adding Ngpat Firebase Ngrx State

In your app root module, add to Root Store amd Effects classes.

```typescript
import {NgModule} from '@angular/core';
import { StoreModule } from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';

import {
    NG_PAT_FIREBASE_ROOT_REDUCERS,
    NG_PAT_FIREBASE_ROOT_STATE_INITIALIZERS,
    NG_PAT_FIREBASE_ROOT_EFFECTS
} from '@ngpat/store';

@NgModule({
    imports: [
        StoreModule.forRoot(
            {
                ...NG_PAT_FIREBASE_ROOT_REDUCERS
            },
            {
                initialState: {
                    ...NG_PAT_FIREBASE_ROOT_STATE_INITIALIZERS
                }
            }
        ),
        EffectsModule.forRoot([
            ...NG_PAT_FIREBASE_ROOT_EFFECTS
        ])
    ]
})
export class AppMoule {
}

```

## Writing a getService to connect to firestore
TODO docs

## Using the CustomFireStoreService
TODO docs

## Add Authentication app
TODO docs

## Using Connect / Disconnect Actions

## Demo Site

See [ng-patterns.web.app](https://ng-patterns.web.app/)

## All Ngpat Libraries

- [@ngpat/calculations](https://ngpat-docs-calculations.web.app/index.html)
- [@ngpat/charts](https://ngpat-docs-charts.web.app/index.html)
- [@ngpat/data](https://ngpat-docs-data.web.app/index.html)
- [@ngpat/date](https://ngpat-docs-date.web.app/index.html)
- [@ngpat/feature-flag](https://ngpat-docs-feature-flag.web.app/index.html)
- [@ngpat/firebase](https://ngpat-docs-firebase.web.app/index.html)
- [@ngpat/fn](https://ngpat-docs-fn.web.app/index.html)
- [@ngpat/material](https://ngpat-docs-material.web.app/index.html)
- [@ngpat/nx-ng-mat-prototype](https://ngpat-docs-nx-ng-mat-prototype.web.app/index.html)
- [@ngpat/rxjs](https://ngpat-docs-rxjs.web.app/index.html)
- [@ngpat/schematics](https://ngpat-docs-schematics.web.app/index.html)
- [@ngpat/store](https://ngpat-docs-store.web.app/index.html)
- [@ngpat/utils](https://ngpat-docs-utils.web.app/index.html)
