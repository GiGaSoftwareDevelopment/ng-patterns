import {readFile} from 'fs';
import {Observable, Observer} from 'rxjs';

import {FileData} from '../model';
import ErrnoException = NodeJS.ErrnoException;

export function readFileContent$(path: string): Observable<FileData> {
  return new Observable((observer: Observer<any>) => {
    readFile(path, 'utf8', (err: ErrnoException | null, content: string) => {
      if (!err) {
        observer.next({
          path,
          content
        });
      } else {
        console.log(err);
        observer.complete();
      }
    });
  });
}
