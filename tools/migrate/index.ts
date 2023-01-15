import {upgradeMaterialApp} from './app/app';
import {readJsonSync} from 'fs-extra';
import {join} from 'path';
import {CopyMaterialConfig, defaultProcessorConfig, JsonConfig} from './app/model';

const jsonConfig: JsonConfig = readJsonSync('./tools/migrate/migrate.json');

const config: CopyMaterialConfig = {
  materialSource: '',
  materialDestination: '',
  materialDestinationLibrary: 'src/lib',
  cdkSource: '',
  cdkDestination: '',
  cdkDestinationLibrary: 'src/lib'
};

config.materialSource = join(jsonConfig.source, 'material');
// libs/packages/material
config.materialDestination = join(process.cwd(), jsonConfig.destination, 'material');

config.cdkSource = join(jsonConfig.source, 'cdk');
config.cdkDestination = join(process.cwd(), jsonConfig.destination, 'material', 'cdk');

// Parse args
let args: string[] = ['material/menu'];
const processorConfig = {
  ...defaultProcessorConfig
};

if (process.argv.length > 2) {
  process.argv.slice(2).forEach((arg: string) => {
    if (arg === '--dry-run' || arg === '--dryRun') {
      processorConfig.dryRun = true;
    } else if (arg === '--verbose') {
      processorConfig.verbose = true;
    } else {
      args.push(arg);
    }
  });
  console.log('processing ', ...args, '\n');
}

if (processorConfig.dryRun) {
  console.log('DRY RUN:');
}

upgradeMaterialApp(config, args, processorConfig);
