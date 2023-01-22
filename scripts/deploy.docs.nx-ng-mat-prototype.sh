#!/usr/bin/env bash

# Clear Published Directory
rm -rf apps/firebase/docs/nx-ng-mat-prototype;

# Generate docs from source directory
cd libs/packages/nx-ng-mat-prototype
../../../node_modules/.bin/compodoc -p tsconfig.doc.json -d ../../../apps/firebase/docs/nx-ng-mat-prototype --theme material --disablePrivate;


cd ../../../apps/firebase;
firebase use ng-patterns;
firebase deploy --only hosting:uiux-docs-nx-ng-mat-prototype;

