// https://www.npmjs.com/package/recursive-copy
import { CopyConfig, copyFiles } from './copy-files';
import { execSync } from 'child_process';

export const copyCapacitorDocsConfig = {
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

export const copyCapacitorDocsFilesConfig: CopyConfig = {
  source: 'docs/capacitor',
  dest: 'libs/packages/schematics/src/generators/capacitor/files/docs',
  options: copyCapacitorDocsConfig
};

export async function copyCapacitorDocs() {
  execSync(`rm -rf ${copyCapacitorDocsFilesConfig.dest}`);
  return await copyFiles(copyCapacitorDocsFilesConfig);
}

copyCapacitorDocs().then(() => {
  console.log('Finished copying capacitor docs to schematics lib.');
});
