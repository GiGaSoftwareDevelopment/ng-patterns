#!/usr/bin/env bash

# Clear Published Directory
rm -rf apps/firebase/docs/date;

# Generate docs from source directory
cd libs/packages/date
../../../node_modules/.bin/compodoc -p tsconfig.doc.json -d ../../../apps/firebase/docs/date --theme material --disablePrivate;


cd ../../../apps/firebase;
firebase use ng-patterns;
firebase deploy --only hosting:ngpat-docs-date;

