#!/usr/bin/env bash

# Clear Published Directory
rm -rf apps/firebase/docs/feature-flag;

# Generate docs from source directory
cd libs/packages/feature-flag
../../../node_modules/.bin/compodoc -p tsconfig.doc.json -d ../../../apps/firebase/docs/feature-flag --theme material --disablePrivate;


cd ../../../apps/firebase;
firebase use ng-patterns;
firebase deploy --only hosting:ngpat-docs-feature-flag;

