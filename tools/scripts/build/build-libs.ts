import { execSync } from 'child_process';
import { baseDependendantPackages, publishablePackageDependencies, publishablePackages } from './_build.config';
import { copyMaterialScss } from '../copy/copy-material-scss';

// "rm -rf dist && npx nx run-many --target=build --projects=nx-ng-mat-prototype && node scripts/copy-charts-scss.js"

async function runCommands() {
  // console.log(`rm -rf dist`);
  // execSync(`rm -rf dist`);

  // await copyDesignLibraryStyles();

  console.log('Clean Cache');

  execSync(`npm run cache:clean`);

  console.log(
    `npx nx run-many --target=build --projects=${baseDependendantPackages.join(
      ','
    )}`
  );
  execSync(
    `npx nx run-many --target=build --projects=${baseDependendantPackages.join(
      ','
    )}`
  );

  console.log(
    `npx nx run-many --target=build --projects=${publishablePackageDependencies.join(
      ','
    )}`
  );
  execSync(
    `npx nx run-many --target=build --projects=${publishablePackageDependencies.join(
      ','
    )}`
  );


  console.log(
    `npx nx run --target=build --projects=${publishablePackages.join(
      ','
    )}`
  );
  execSync(
    `npx nx run-many --target=build --projects=${publishablePackages.join(
      ','
    )}`
  );



  // console.log(' copyChartScss)');
  // await copyChartScss();
  //
  // console.log(' copyMaterialScss(componentsPkgJson)');
  await copyMaterialScss();
}

runCommands().then(() => {
  console.log('Build Finished.');
});
