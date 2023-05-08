import { Tree } from '@nx/devkit';
import { MaterialGeneratorSchema } from './schema';
import { runBashCommand } from '../utils/run-bash-command';
// import { spawn } from 'child_process';

export default async function (tree: Tree, options: MaterialGeneratorSchema) {
  // await new Promise((resolve, reject) => {
  //   const addMaterial = spawn(
  //     `npx nx g @angular/material:ng-add --project=${options.domain}-${options.appName} --theme=custom --typography=true --animations=enabled`,
  //     {
  //       stdio: 'inherit',
  //       cwd: process.cwd(),
  //       shell: '/bin/bash'
  //     }
  //   );
  //
  //   addMaterial.on('exit', () => {
  //     resolve(true);
  //   });
  // });

  return await runBashCommand(
    `npx nx g @angular/material:ng-add --project=${options.domain}-${options.appName} --theme=custom --typography=true --animations=enabled`,
    ''
  );
}
