#!/usr/bin/env bash

# Clear Published Directory
rm -rf apps/firebase/docs/rxjs;

# Generate docs from source directory
cd libs/packages/rxjs
../../../node_modules/.bin/compodoc -p tsconfig.doc.json -d ../../../apps/firebase/docs/rxjs --theme material --disablePrivate;


cd ../../../apps/firebase;
firebase use ng-patterns;
firebase deploy --only hosting:ngpat-docs-rxjs;

