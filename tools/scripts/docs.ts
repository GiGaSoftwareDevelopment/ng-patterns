
import { execSync } from 'child_process';
import { baseDependendantPackages, publishablePackageDependencies, publishablePackages } from './build/_build.config';



async function generateDocs() {

  const projects: string = [
    ...baseDependendantPackages,
    ...publishablePackageDependencies,
    ...publishablePackages
  ].join(',');



  console.log(
    `npx nx run-many --target=docs --projects=${projects}`
  );
  execSync(
    `npx nx run-many --target=docs --projects=${projects}`
  );

}

generateDocs().then(() => {
  console.log('\n\nFinished generating docs.\n\n');
});
