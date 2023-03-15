#!/usr/bin/env bash

# Clear Published Directory
rm -rf apps/firebase/docs/ngrx-dexie;

# Generate docs from source directory
cd libs/packages/ngrx-dexie
../../../node_modules/.bin/compodoc -p tsconfig.doc.json -d ../../../apps/firebase/docs/ngrx-dexie --theme material --disablePrivate;


cd ../../../apps/firebase;
firebase use ng-patterns;
firebase deploy --only hosting:ngpat-docs-ngrx-dexie;

