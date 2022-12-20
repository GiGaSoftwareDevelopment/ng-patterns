import {copyFiles} from './copy-files';
import {chartsPkgJson} from '../build/_build.config';
import {copyScssConfig} from './copy-scss-config';

export async function copyChartScss() {
  return await copyFiles({
    source: chartsPkgJson.config.packagePath,
    dest: chartsPkgJson.config.outputs,
    options: copyScssConfig
  });
}
