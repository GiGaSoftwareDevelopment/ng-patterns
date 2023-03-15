#!/usr/bin/env bash

# Clear Published Directory
rm -rf apps/firebase/docs/utils;

# Generate docs from source directory
cd libs/packages/utils
../../../node_modules/.bin/compodoc -p tsconfig.doc.json -d ../../../apps/firebase/docs/utils --theme material --disablePrivate;


cd ../../../apps/firebase;
firebase use ng-patterns;
firebase deploy --only hosting:ngpat-docs-utils;

