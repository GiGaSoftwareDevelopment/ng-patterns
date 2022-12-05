import {copyScssConfig} from './copy-scss-config';
import copy from 'recursive-copy';
import {UiUxQueueItem} from '../../libs/packages/utils/src/lib/process-queue';
import {PackageUpdate} from './_build.models';

export function copyChartScss(
  pkgConfig: UiUxQueueItem<PackageUpdate>
): Promise<any> {
  return new Promise((resolve, reject) => {
    copy(
      `${pkgConfig.config.packagePath}`,
      `${pkgConfig.config.outputs}`,
      copyScssConfig
    )
      .on(copy.events.COPY_FILE_START, function (copyOperation) {
        console.info('Copying filename ' + copyOperation.src + '...');
      })
      .on(copy.events.COPY_FILE_COMPLETE, function (copyOperation) {
        console.info('Copied to ' + copyOperation.dest);
      })
      .on(copy.events.ERROR, function (error, copyOperation) {
        console.error('Unable to copy ' + copyOperation.dest);
      })
      .then(function (results) {
        console.info(results.length + ' filename(s) copied');
        resolve(true);
      })
      .catch(function (error) {
        reject(true);
        return console.error('Copy failed: ' + error);
      });
  });
}
