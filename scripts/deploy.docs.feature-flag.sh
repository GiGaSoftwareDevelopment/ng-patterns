#!/usr/bin/env bash

# Clear Published Directory
rm -rf apps/firebase/docs/charts;

# Generate docs from source directory
cd libs/packages/charts
../../../node_modules/.bin/compodoc -p tsconfig.doc.json -d ../../../apps/firebase/docs/charts --theme material --disablePrivate;


cd ../../../apps/firebase;
firebase use ng-patterns;
firebase deploy --only hosting:uiux-docs-charts;

