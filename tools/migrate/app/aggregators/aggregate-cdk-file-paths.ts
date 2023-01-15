import klaw = require('klaw');
import {Observable, Observer} from 'rxjs';
import {obj} from 'through2';
import {notIncludeFileIf} from './file-filter';

const excludeFilesFilter = obj(function (item, enc, next) {
  if (!item.stats.isDirectory()) {
    if (notIncludeFileIf(item)) {
      this.push(item);
    }
  }
  next();
});

/**
 * NOTE: klaw can not be re-used.
 * @param source
 */
export function aggregateCDKPaths$(source: string): Observable<string[]> {
  return new Observable((observer: Observer<any>) => {
    const items: any[] = []; // files, directories, symlinks, etc

    const k = klaw(source)
      .pipe(excludeFilesFilter)
      .on('data', (item: any) => items.push(item.path))
      .on('end', () => {
        k.destroy();
      })
      .on('close', () => {
        observer.next(items);
        observer.complete();
        // k.destroy();
      }); //
  });
}
