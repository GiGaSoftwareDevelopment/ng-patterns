// https://www.npmjs.com/package/recursive-copy
import {CopyConfig, copyFiles} from './copy-files';
import {execSync} from 'child_process';

export const copyDesignLibraryScssConfig = {
  overwrite: true,
  expand: true,
  // dot: false,
  // junk: true,
  filter: ['**/*.scss'],
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

export const copyDesignLibraryFilesConfig: CopyConfig = {
  source: 'libs/shared/ui-design-library/src/styles',
  dest: 'libs/packages/schematics/src/generators/design-llibrary-theme/files/src',
  options: copyDesignLibraryScssConfig
};

export async function copyDesignLibraryStyles() {
  execSync(`rm -rf ${copyDesignLibraryFilesConfig.dest}`);
  return await copyFiles(copyDesignLibraryFilesConfig);
}

copyDesignLibraryStyles().then(() => {
  console.log('Finished copying scss files from design library to schematics lib.')
})
