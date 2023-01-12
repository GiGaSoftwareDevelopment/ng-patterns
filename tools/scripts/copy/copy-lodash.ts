// https://www.npmjs.com/package/recursive-copy
import { CopyConfig, copyFiles } from './copy-files';
import { execSync } from 'child_process';
import { Stats, writeFileSync } from 'fs';
import { readdir } from 'fs/promises';
import { TransformCallback } from 'through2';
const through = require('through2');
const defaultExportRx = /(?<=export\sdefault\s).*/gm;

function transform(src: string,
                   dest: string,
                   stats: Stats) {
  return through(function(chunk: string, enc: BufferEncoding, done: TransformCallback)  {
    let output = chunk.toString();
    // const defaultExport = output.match(defaultExportRx);
    // output = output.replace(`export default ${defaultExport}`, '');
    // if (output.includes(`function ${defaultExport}`)) {
    //   output = output.replace(`function ${defaultExport}`, `export function ${defaultExport}`);
    // } else {
    //   output = output.replace(`const ${defaultExport}`, `export const ${defaultExport}`);
    // }

    if (output.includes('basefor')) {
      output = output.replace(/basefor/gm, 'baseFor');
    }

    if (output.includes('&& !module.nodeType')) {
      output = output.replace('&& !module.nodeType', '')
    }

    output = output.replace(/\.js'/gm, '\'');

    output = `
    // @ts-nocheck
    ${output}`;

    done(null, output);
  });
}
export const copyLodashConfig: CopyConfig = {
  source: '../lodash',
  dest: 'libs/packages/fn/src/lib/lodash',
  options: {
    overwrite: true,
    expand: true,
    // dot: false,
    // junk: true,
    filter: [ '**/*.ts', '!node_modules/**/*', '!test/**/*' ],
    rename: function (filePath: string) {
      if (filePath === 'lodash.ts') {
        return `index.ts`;
      }

        return filePath;
    },
    transform: transform
  }
};

export const copyLodashInternalConfig: CopyConfig = {
  source: '../lodash/.internal',
  dest: 'libs/packages/fn/src/lib/lodash/.internal',
  options: {
    overwrite: true,
    expand: true,
    // dot: false,
    // junk: true,
    filter: [ '**/*.ts', '!node_modules/**/*', '!test/**/*' ],
    // rename: function (filePath: string) {
    //   return `${filePath}__template__`;
    // }
    transform: transform
  }
};

async function createIndexFile() {
  const files = await readdir(copyLodashConfig.dest);
  const indexContent = files.filter((file: string) =>
    file !== '.internal' && file !== 'index.ts')
    .map((file: string) => `export { default as ${file.replace('.ts', '')} } from './${file.replace('.ts', '')}';`)
    .reduce((final: string, file: string) => {
      return `${final}
               ${file}`;
    }, ``);

  return writeFileSync(`${copyLodashConfig.dest}/index.ts`, indexContent)
}

/**
 * NOTE run
 * git clone git@github.com:lodash/lodash.git ../lodash
 * npx js-to-ts-converter ../lodash/.internal
 * npx js-to-ts-converter ../lodash
 */

export async function copyLodashFiles() {
  // execSync(`rm -rf ${copyLodashConfig.dest}`);
  // execSync(`git clone git@github.com:lodash/lodash.git ../lodash`);
  // execSync(`npx js-to-ts-converter ../lodash/.internal`);
  // execSync(`npx js-to-ts-converter ../lodash`);
  // await copyFiles(copyLodashInternalConfig);
  await copyFiles(copyLodashConfig);
  // await createIndexFile();
  return execSync(`prettier --write \"${copyLodashConfig.dest}\"`);
}
