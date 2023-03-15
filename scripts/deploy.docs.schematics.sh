#!/usr/bin/env bash

# Clear Published Directory
rm -rf apps/firebase/docs/schematics;

# Generate docs from source directory
cd libs/packages/schematics
../../../node_modules/.bin/compodoc -p tsconfig.doc.json -d ../../../apps/firebase/docs/schematics --theme material --disablePrivate;


cd ../../../apps/firebase;
firebase use ng-patterns;
firebase deploy --only hosting:ngpat-docs-schematics;

