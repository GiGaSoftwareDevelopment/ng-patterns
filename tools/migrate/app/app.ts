import {switchMap} from 'rxjs/operators';
import {aggregateCDKPaths$} from './aggregators/aggregate-cdk-file-paths';
import {aggregateMaterialPaths$} from './aggregators/aggregate-material-file-paths';
import {FileProcessorIterator} from './iterator/process-iterator';
import {CopyMaterialConfig, ProcessorConfig} from './model';
import {fileProcessors} from './processors';

function processCDK$(config: CopyMaterialConfig, args: string[], cfg: ProcessorConfig) {
  return aggregateCDKPaths$(config.cdkSource).pipe(
    switchMap((paths: string[]) => {
      const iter = new FileProcessorIterator(paths, fileProcessors, config, 'cdk', args, cfg);

      return iter.onComplete$;
    })
  );
}

function processMaterial$(config: CopyMaterialConfig, args: string[], cfg: ProcessorConfig) {
  return aggregateMaterialPaths$(config.materialSource).pipe(
    switchMap((paths: string[]) => {
      const iter = new FileProcessorIterator(paths, fileProcessors, config, 'material', args, cfg);

      return iter.onComplete$;
    })
  );
}

export function upgradeMaterialApp(config: CopyMaterialConfig, args: string[], cfg: ProcessorConfig) {
  processMaterial$(config, args, cfg)
    // .pipe(switchMap(() => processCDK$(config, args, cfg)))
    .subscribe((r: string[]) => {
      console.log('done');
      process.exit();
    });
}
