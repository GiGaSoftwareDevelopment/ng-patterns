#!/usr/bin/env bash

# Clear Published Directory
rm -rf apps/firebase/docs/dexie;

# Generate docs from source directory
cd libs/packages/dexie
../../../node_modules/.bin/compodoc -p tsconfig.doc.json -d ../../../apps/firebase/docs/dexie --theme material --disablePrivate;


cd ../../../apps/firebase;
firebase use ng-patterns;
firebase deploy --only hosting:uiux-docs-dexie;

