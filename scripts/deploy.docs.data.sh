#!/usr/bin/env bash

# Clear Published Directory
rm -rf apps/firebase/docs/data;

# Generate docs from source directory
cd libs/packages/data
../../../node_modules/.bin/compodoc -p tsconfig.doc.json -d ../../../apps/firebase/docs/data --theme material --disablePrivate;


cd ../../../apps/firebase;
firebase use ng-patterns;
firebase deploy --only hosting:uiux-docs-data;

