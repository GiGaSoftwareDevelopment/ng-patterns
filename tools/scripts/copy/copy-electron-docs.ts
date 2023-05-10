// https://www.npmjs.com/package/recursive-copy
import { CopyConfig, copyFiles } from './copy-files';
import { execSync } from 'child_process';

export const copyElectronDocsConfig = {
  overwrite: true,
  expand: true,
  // dot: false,
  // junk: true,
  filter: ['**/*.md', '**/*.png', '**/*.jpg', '**/*.gif'],
  rename: function (filePath: string) {
    return `${filePath}__template__`;
  }
  // transform: function(src, dest, stats) {
  //   if (path.extname(src) !== '.txt') { return null; }
  //   return through(function(chunk, enc, done)  {
  //     var output = chunk.toString().toUpperCase();
  //     done(null, output);
  //   });
  // }
};

export const copyElectronDocsFilesConfig: CopyConfig = {
  source: 'docs/electron',
  dest: 'libs/packages/schematics/src/generators/electron/files/docs',
  options: copyElectronDocsConfig
};

export async function copyCapacitorDocs() {
  execSync(`rm -rf ${copyElectronDocsFilesConfig.dest}`);
  return await copyFiles(copyElectronDocsFilesConfig);
}

copyCapacitorDocs().then(() => {
  console.log('Finished copying electron docs to schematics lib.');
});
