import { copyFiles } from './copy-files';
import { materialConfig } from '../build/_build.config';
import { copyCjsConfig } from './copy-config';

export async function copyMaterialCjs() {
  return await copyFiles({
    source: materialConfig.config.packagePath,
    dest: materialConfig.config.outputs,
    options: copyCjsConfig
  });
}

copyMaterialCjs().then(() => {
  console.log(
    '\nFinished copying Material cjs files from library to dist package.\n'
  );
});
