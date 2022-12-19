import copy from 'recursive-copy';
import {Stats} from 'fs';
import {Stream} from 'stream';

export function copyFiles(config: CopyConfig): Promise<any> {
  return new Promise((resolve, reject) => {
    copy(config.source, config.dest, config.options)
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

export interface CopyConfig {
  source: string;
  dest: string;
  options: CopyOptions;
}

/**
 * Copied from node_modules/recursive-copy/index.d.ts
 */
export interface CopyOptions {
  /**
   * Whether to overwrite destination files.
   */
  overwrite?: boolean;
  /**
   * Whether to expand symbolic links.
   */
  expand?: boolean;
  /**
   * Whether to copy files beginning with a `.`
   */
  dot?: boolean;
  /**
   * Whether to copy OS junk files (e.g. `.DS_Store`, `Thumbs.db`).
   */
  junk?: boolean;
  /**
   * Filter function / regular expression / glob that determines which files to copy (uses maximatch).
   */
  filter?: string | string[] | RegExp | ((path: string) => boolean);
  /**
   * Function that maps source paths to destination paths.
   */
  rename?: (path: string) => string;
  /**
   * Function that returns a transform stream used to modify file contents.
   */
  transform?: (
    src: string,
    dest: string,
    stats: Stats
  ) => Stream | null | undefined;
  /**
   * Whether to return an array of copy results.
   *
   * Defaults to true.
   */
  results?: boolean;
  /**
   * Maximum number of simultaneous copy operations.
   *
   * Defaults to 255.
   */
  concurrency?: number;
  /**
   * Whether to log debug information.
   */
  debug?: boolean;
}
