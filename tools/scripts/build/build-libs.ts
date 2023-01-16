import { execSync } from 'child_process';
import { publishableNxProjects } from './_build.config';
import { copyDesignLibraryStyles } from '../copy/copy-design-library-scss-config';
import { copyChartScss } from '../copy/copy-charts-scss';
import { copyMaterialScss } from '../copy/copy-material-scss';

// "rm -rf dist && npx nx run-many --target=build --projects=nx-ng-mat-prototype && node scripts/copy-charts-scss.js"

async function runCommands() {
  console.log(`rm -rf dist`);
  execSync(`rm -rf dist`);

  await copyDesignLibraryStyles();

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

  console.log(' copyChartScss)');
  await copyChartScss();

  console.log(' copyChartScss(componentsPkgJson)');
  await copyMaterialScss();
}

runCommands().then(() => {
  console.log('DONE');
});
