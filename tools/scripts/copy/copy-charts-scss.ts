import { copyFiles } from './copy-files';
import { chartsPkgJson } from '../build/_build.config';
import { copyScssConfig } from './copy-config';

export async function copyChartScss() {
  console.log('Copying Chart Files');
  return await copyFiles({
    source: chartsPkgJson.config.packagePath,
    dest: chartsPkgJson.config.outputs,
    options: copyScssConfig
  });
}

copyChartScss().then(() => {
  console.log(
    '\n\nFinished copying chart scss files from lib to dist package.\n\n'
  );
});
