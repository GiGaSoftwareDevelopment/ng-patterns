import {ensureDir, writeFile} from 'fs-extra';
import {Observable, Observer} from 'rxjs';
import {mergeMap} from 'rxjs/operators';

import {FileData} from '../model';
import ErrnoException = NodeJS.ErrnoException;

const desiredMode = 0o2775;

/**
 * Ensures that the directory exists.
 * If the directory structure does not exist, it is created.
 * see https://github.com/jprichardson/node-fs-extra/blob/HEAD/docs/ensureDir.md
 * @param path
 */
function ensureDir$(path) {
  return new Observable((observer: Observer<void>) => {
    ensureDir(path, desiredMode, err => {
      observer.next();
    });
  });
}

function writeFile$(d: FileData): Observable<FileData> {
  return new Observable((observer: Observer<FileData>) => {
    writeFile(d.path, d.content, (err: ErrnoException | null) => {
      if (!err) {
        observer.next(d);
      } else {
        console.log(err);
        observer.complete();
      }
    });
  });
}

export function writeFileContent$(d: FileData): Observable<FileData> {
  return ensureDir$(d.path.substr(0, d.path.lastIndexOf('/'))).pipe(mergeMap(() => writeFile$(d)));
}
