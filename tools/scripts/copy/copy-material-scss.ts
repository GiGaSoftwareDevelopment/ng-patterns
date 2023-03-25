import {copyFiles} from './copy-files';
import { chartsPkgJson, materialConfig } from '../build/_build.config';
import {copyScssConfig} from './copy-config';

export async function copyMaterialScss() {
  return await copyFiles({
    source: materialConfig.config.packagePath,
    dest: materialConfig.config.outputs,
    options: copyScssConfig
  });
}

copyMaterialScss().then(() => {
  console.log("\nFinished copying Material scss files from library to dist package.\n")
})
