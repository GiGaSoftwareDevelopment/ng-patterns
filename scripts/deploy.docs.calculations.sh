#!/usr/bin/env bash

# Clear Published Directory
rm -rf apps/firebase/docs/calculations;

# Generate docs from source directory
cd libs/packages/calculations
../../../node_modules/.bin/compodoc -p tsconfig.doc.json -d ../../../apps/firebase/docs/calculations --theme material --disablePrivate;


cd ../../../apps/firebase;
firebase use ng-patterns;
firebase deploy --only hosting:ngpat-docs-calculations;

