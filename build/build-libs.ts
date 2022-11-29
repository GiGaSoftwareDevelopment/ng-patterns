import { readCachedProjectGraph } from '@nrwl/devkit';
import { execSync } from 'child_process';
import { readFileSync, writeFileSync } from 'fs';
import * as chalk from 'chalk';
import { copyChartScss } from './copy-charts-scss';


// "rm -rf dist && npx nx run-many --target=build --projects=nx-ng-mat-prototype && node scripts/copy-charts-scss.js"

const projects: string[] = [
  'date',
  'nx-ng-mat-prototype',
  'schematics'
]

async function runCommands() {
  execSync(`rm -rf dist`);
  execSync(`npx nx run-many --target=build --projects=${projects.join(',')}`);
  await copyChartScss();
}

runCommands().then(() => {
  console.log('DONE');
});

