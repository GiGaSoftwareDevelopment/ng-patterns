import {copyFiles} from './copy-files';

export async function copyNodeModulesMaterialScss() {
  await copyFiles({
    source: `node_modules/@angular/material/core`,
    dest: `libs/packages/material/src/lib/styles/core`,
    options: {
      overwrite: true,
      expand: true,
      filter: [
        '**/*.scss',
      ],
    }
  });

  return await copyFiles({
    source: `node_modules/@angular/cdk`,
    dest: `libs/packages/material/src/lib/styles/cdk`,
    options: {
      overwrite: true,
      expand: true,
      filter: [
        '**/*.scss',
      ],
    }
  });
}

copyNodeModulesMaterialScss().then(() => {
  console.log('\nFinished copying material scss from node_modules.\n')
})
