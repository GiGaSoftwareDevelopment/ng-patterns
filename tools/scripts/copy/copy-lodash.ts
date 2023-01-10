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
    const defaultExport = output.match(defaultExportRx);
    // output = output.replace(`export default ${defaultExport}`, '');
    // if (output.includes(`function ${defaultExport}`)) {
    //   output = output.replace(`function ${defaultExport}`, `export function ${defaultExport}`);
    // } else {
    //   output = output.replace(`const ${defaultExport}`, `export const ${defaultExport}`);
    // }

    if (output.includes('&& !module.nodeType')) {
      output = output.replace('&& !module.nodeType', '')
    }

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
    // rename: function (filePath: string) {
    //   return `${filePath}__template__`;
    // }
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

async function readLodashDirectory() {
  const files = await readdir(copyLodashConfig.dest);
  const indexContent = files.filter((file: string) => file !== '.internal')
    .map((file: string) => `export * from './${file.replace('.ts', '')}';`)
    .reduce((final: string, file: string) => {
      return `${final}
               ${file}`;
    }, ``);

  return writeFileSync(`${copyLodashConfig.dest}/index.ts`, indexContent)
}

export async function copyLodashFiles() {
  execSync(`rm -rf ${copyLodashConfig.dest}`);
  await copyFiles(copyLodashInternalConfig);
  return await copyFiles(copyLodashConfig);
}
