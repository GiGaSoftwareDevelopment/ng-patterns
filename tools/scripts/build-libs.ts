import {readCachedProjectGraph} from '@nrwl/devkit';
import {execSync} from 'child_process';
import {readFileSync, writeFileSync} from 'fs';
import * as chalk from 'chalk';
import {copyChartScss} from './copy-charts-scss';
import {publishablePackages} from './_build.config';

// "rm -rf dist && npx nx run-many --target=build --projects=nx-ng-mat-prototype && node scripts/copy-charts-scss.js"

async function runCommands() {
  execSync(`rm -rf dist`);
  execSync(
    `npx nx run-many --target=build --projects=${publishablePackages.join(',')}`
  );
  await copyChartScss();
}

runCommands().then(() => {
  console.log('DONE');
});
