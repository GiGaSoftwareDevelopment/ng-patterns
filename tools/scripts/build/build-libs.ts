import { execSync } from 'child_process';
import {
  publishableLevel_0,
  publishableLevel_1,
  publishableLevel_2,
  publishableLevel_3,
  publishableLevel_4,
  publishableLevel_5
} from './_build.config';

// "rm -rf dist && npx nx run-many --target=build --projects=nx-ng-mat-prototype && node scripts/copy-charts-scss.js"

// const p: NgPatProcessQueue<string> =
//   new NgPatProcessQueue();
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

  console.log('Cleaning caches');
  execSync(`npm run cache:clean`);

  // console.log('Update package dependency versions.');
  // execSync(`npm run update:package:deps`);

  console.log(
    `npx nx run-many --target=build --configuration=production --projects=${publishableLevel_5.join(
      ','
    )}`
  );
  execSync(
    `npx nx run-many --target=build --configuration=production --projects=${publishableLevel_5.join(
      ','
    )}`
  );

  console.log(
    `npx nx run-many --target=build --configuration=production --projects=${publishableLevel_4.join(
      ','
    )}`
  );
  execSync(
    `npx nx run-many --target=build --configuration=production --projects=${publishableLevel_4.join(
      ','
    )}`
  );

  console.log(
    `npx nx run-many --target=build --configuration=production --projects=${publishableLevel_3.join(
      ','
    )}`
  );
  execSync(
    `npx nx run-many --target=build --configuration=production --projects=${publishableLevel_3.join(
      ','
    )}`
  );

  console.log(
    `npx nx run-many --target=build --configuration=production --projects=${publishableLevel_2.join(
      ','
    )}`
  );
  execSync(
    `npx nx run-many --target=build --configuration=production --projects=${publishableLevel_2.join(
      ','
    )}`
  );

  console.log(
    `npx nx run-many --target=build --configuration=production --projects=${publishableLevel_1.join(
      ','
    )}`
  );
  execSync(
    `npx nx run-many --target=build --configuration=production --projects=${publishableLevel_1.join(
      ','
    )}`
  );

  console.log(
    `npx nx run-many --target=build --configuration=production --projects=${publishableLevel_0.join(
      ','
    )}`
  );
  execSync(
    `npx nx run-many --target=build --configuration=production --projects=${publishableLevel_0.join(
      ','
    )}`
  );
}

runCommands().then(() => {
  console.log('Build Finished.');
});
