#!/usr/bin/env bash

# Clear Published Directory
rm -rf apps/firebase/docs/fn;

# Generate docs from source directory
cd libs/packages/fn
../../../node_modules/.bin/compodoc -p tsconfig.doc.json -d ../../../apps/firebase/docs/fn --theme material --disablePrivate;


cd ../../../apps/firebase;
firebase use ng-patterns;
firebase deploy --only hosting:ngpat-docs-fn;

