#!/usr/bin/env bash

# Clear Published Directory
rm -rf apps/firebase/docs/material;

# Generate docs from source directory
cd libs/packages/material
../../../node_modules/.bin/compodoc -p tsconfig.doc.json -d ../../../apps/firebase/docs/material --theme material --disablePrivate;


cd ../../../apps/firebase;
firebase use ng-patterns;
firebase deploy --only hosting:ngpat-docs-material;

