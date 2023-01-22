#!/usr/bin/env bash

# Clear Published Directory
rm -rf apps/firebase/docs/store;

# Generate docs from source directory
cd libs/packages/store
../../../node_modules/.bin/compodoc -p tsconfig.doc.json -d ../../../apps/firebase/docs/store --theme material --disablePrivate;


cd ../../../apps/firebase;
firebase use ng-patterns;
firebase deploy --only hosting:uiux-docs-store;

