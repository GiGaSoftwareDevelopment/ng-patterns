#!/usr/bin/env bash

npx nx build ng-patterns --configuration=production;

cd apps/firebase;
firebase use ng-patterns;

firebase deploy --only hosting;
