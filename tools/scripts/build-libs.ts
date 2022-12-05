import {readCachedProjectGraph} from '@nrwl/devkit';
import {execSync} from 'child_process';
import {readFileSync, writeFileSync} from 'fs';
import * as chalk from 'chalk';
import {copyChartScss} from './copy-charts-scss';
import {
  chartsPkgJson,
  componentsPkgJson,
  publishableNxProjects
} from './_build.config';

// "rm -rf dist && npx nx run-many --target=build --projects=nx-ng-mat-prototype && node scripts/copy-charts-scss.js"

async function runCommands() {
  console.log(`rm -rf dist`);
  execSync(`rm -rf dist`);

  console.log(
    `npx nx run-many --target=build --projects=${publishableNxProjects.join(
      ','
    )}`
  );
  execSync(
    `npx nx run-many --target=build --projects=${publishableNxProjects.join(
      ','
    )}`
  );

  console.log(' copyChartScss(chartsPkgJson)');
  await copyChartScss(chartsPkgJson);

  console.log(' copyChartScss(componentsPkgJson)');
  await copyChartScss(componentsPkgJson);
}

runCommands().then(() => {
  console.log('DONE');
});
