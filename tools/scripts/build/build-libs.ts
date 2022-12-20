import {execSync} from 'child_process';
import {
  chartsPkgJson,
  componentsPkgJson,
  publishableNxProjects
} from './_build.config';
import {copyFiles} from '../copy/copy-files';
import {copyScssConfig} from '../copy/copy-scss-config';
import {copyDesignLibraryStyles} from '../copy/copy-design-library-scss-config';

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

  console.log(' copyChartScss(chartsPkgJson)');
  await copyFiles({
    source: chartsPkgJson.config.packagePath,
    dest: chartsPkgJson.config.outputs,
    options: copyScssConfig
  });

  console.log(' copyChartScss(componentsPkgJson)');
  await copyFiles({
    source: componentsPkgJson.config.packagePath,
    dest: componentsPkgJson.config.outputs,
    options: copyScssConfig
  });
}

runCommands().then(() => {
  console.log('DONE');
});
