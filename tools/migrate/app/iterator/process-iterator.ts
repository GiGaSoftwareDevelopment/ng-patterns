import {join} from 'path';
import {from, Observable, Observer, of, Subject} from 'rxjs';
import {map, mergeMap, switchMap, tap} from 'rxjs/operators';
import {
  CopyContentToOverride,
  CopyMaterialConfig,
  FileData,
  Library,
  ProcessFile,
  ProcessorConfig,
  ProcessorFunctionConfig
} from '../model';
import {readFileContent$} from './read-file';
import {writeFileContent$} from './write-file';

export class FileProcessorIterator {
  private _nextPath$: Subject<string>;

  onComplete$: Subject<string[]>;

  constructor(
    private paths: string[],
    private processorsFns: ProcessorFunctionConfig[],
    private config: CopyMaterialConfig,
    private lib: Library,
    private args: string[],
    private cfg: ProcessorConfig
  ) {
    this._nextPath$ = new Subject();
    this.onComplete$ = new Subject();

    this._nextPath$
      .pipe(
        // Read File from components repo
        //
        mergeMap((path: string) =>
          readFileContent$(path).pipe(
            // filter paths
            //
            map((file: FileData) => {
              if (this.args && this.args.length) {
                return <ProcessFile>{
                  file,
                  doProcess: this.args.reduce((isIncludedInArg: boolean, arg: string) => {
                    if (!isIncludedInArg) {
                      return file.path.includes(arg);
                    }

                    return isIncludedInArg;
                  }, false)
                };
              }

              return <ProcessFile>{
                file,
                doProcess: true
              };
            }),

            // transform file content
            //
            mergeMap((d: ProcessFile) => {
              if (d.doProcess) {
                return this.processFile$(d.file).pipe(
                  map(
                    (file: FileData) =>
                      <ProcessFile>{
                        file,
                        doProcess: d.doProcess
                      }
                  )
                );
              }

              return of(d);
            }),

            // update file path to write new location
            //
            map((d: ProcessFile) => {
              const destPath = this.lib === 'cdk' ? 'cdkDestination' : 'materialDestination';

              const substrMatch = `/${this.lib}`;

              // Replace user path from component repo to discoe repo
              //
              d.file.path = join(
                this.config[destPath],
                d.file.path.substring(d.file.path.lastIndexOf(substrMatch) + substrMatch.length)
              );

              return d;
            }),

            // write file
            //
            mergeMap((d: ProcessFile) => {
              if (d.doProcess && !this.cfg.dryRun) {
                return writeFileContent$(d.file).pipe(
                  map(
                    (file: FileData) =>
                      <ProcessFile>{
                        file,
                        doProcess: d.doProcess
                      }
                  )
                );
              }

              return of(d);
            }),

            mergeMap((d: ProcessFile) => {
              return this.processCopyTo$(d);
            }),

            // user feedback
            //
            tap((d: ProcessFile) => {
              if (d.doProcess) {
                console.log(`Migrated: ${d.file.path}`);
              }
            })
          )
        )
      )
      .subscribe(() => {
        this.nextFile();
      });

    this.nextFile();
  }

  private processFile$(file: FileData): Observable<FileData> {
    return new Observable((observer: Observer<FileData>) => {
      if (this.cfg.verbose) {
        console.log('\n');
        console.log(`Processing ${file.path}`);
      }

      file = this.processorsFns.reduce((d: FileData, p: ProcessorFunctionConfig) => {
        if (this.cfg.verbose) {
          console.log(`Run Processor ${p.name}`);
        }
        return p.func(d);
      }, file);

      observer.next(file);
    });
  }

  private processCopyTo$(d: ProcessFile): Observable<ProcessFile> {
    if (d.file.copyTo) {
      return from(Object.values(d.file.copyTo)).pipe(
        switchMap((copyTo: CopyContentToOverride) => {
          copyTo.path = `${d.file.path.slice(0, d.file.path.lastIndexOf('/'))}/${copyTo.path}`;

          return readFileContent$(copyTo.path).pipe(
            map((tqCustomOverride: FileData) => {
              // Run replacement regex and content
              //
              tqCustomOverride.content = copyTo.replacements.reduce((content: string, replacement) => {
                console.log(`${copyTo.path} ${replacement.description}`);

                return content.replace(replacement.regex, replacement.content);
              }, tqCustomOverride.content);

              return <ProcessFile>{
                file: tqCustomOverride,
                doProcess: d.doProcess
              };
            }),

            mergeMap((tqCustomOverride: ProcessFile) => {
              if (tqCustomOverride.doProcess && !this.cfg.dryRun) {
                return writeFileContent$(tqCustomOverride.file).pipe(
                  // Send Original Material file along the way
                  map(() => d)
                );
              }

              return of(d);
            })
          );
        })
      );
    }

    return of(d);
  }

  private nextFile() {
    if (this.paths.length) {
      this._nextPath$.next(this.paths.shift());
    } else {
      this._nextPath$.complete();

      this.onComplete$.next();
      this.onComplete$.complete();
    }
  }
}
