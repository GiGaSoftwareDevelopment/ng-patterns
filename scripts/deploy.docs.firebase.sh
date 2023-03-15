#!/usr/bin/env bash

# Clear Published Directory
rm -rf apps/firebase/docs/firebase;

# Generate docs from source directory
cd libs/packages/firebase
../../../node_modules/.bin/compodoc -p tsconfig.doc.json -d ../../../apps/firebase/docs/firebase --theme material --disablePrivate;


cd ../../../apps/firebase;
firebase use ng-patterns;
firebase deploy --only hosting:ngpat-docs-firebase;

