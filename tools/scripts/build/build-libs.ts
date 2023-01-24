import { execSync } from 'child_process';
import { baseDependendantPackages, publishablePackageDependencies, publishablePackages } from './_build.config';
import { UiUxProcessQueue } from '../../../libs/packages/utils/src/lib/process-queue';

// "rm -rf dist && npx nx run-many --target=build --projects=nx-ng-mat-prototype && node scripts/copy-charts-scss.js"

// const p: UiUxProcessQueue<string> =
//   new UiUxProcessQueue();
//
// p.currentItem$.subscribe((project: string) => {
//
//   console.log(
//     `npx nx run-many --target=build --projects=${baseDependendantPackages.join(
//       ','
//     )}`
//   );
//
//   execSync(
//     `npx nx run-many --target=build --projects=${baseDependendantPackages.join(
//       ','
//     )}`
//   );
//
// });
//
// p.addItems([
//   ...baseDependendantPackages,
//   ...publishablePackageDependencies,
//   ...publishablePackages
// ]);

async function runCommands() {
  console.log(`rm -rf dist`);
  execSync(`rm -rf dist`);

  console.log('Cleaning caches')
  execSync(`npm run cache:clean`);

  console.log('Update package dependency versions.')
  execSync(`npm run update:package:deps`);


  console.log('Building base libraries.')
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

  console.log('Building dependent libraries.')
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


  console.log('Building final libraries.')
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

}

runCommands().then(() => {
  console.log('Build Finished.');
});
