import { UiUxQueueItem } from '../../../libs/packages/utils/src/lib/process-queue';
import { PackageJsonConfig } from './_build.models';


export const chartsPkgJson: UiUxQueueItem<PackageJsonConfig> = {
  type: 'package.json',
  config: {
    libName: 'charts',
    packagePath: 'libs/packages/charts',
    outputs: 'dist/libs/packages/charts',
  }
};

export const chartsNgPackagr: UiUxQueueItem<PackageJsonConfig> = {
  type: 'ng-package.json',
  config: {
    libName: 'charts',
    packagePath: 'libs/packages/charts',
    outputs: 'dist/libs/packages/charts',
  }
};

export const dataPkgJson: UiUxQueueItem<PackageJsonConfig> = {
  type: 'package.json',
  config: {
    libName: 'data',
    packagePath: 'libs/packages/data',
    outputs: 'dist/libs/packages/data',
  }
};

export const datePkgJson: UiUxQueueItem<PackageJsonConfig> = {
  type: 'package.json',
  config: {
    libName: 'date',
    packagePath: 'libs/packages/date',
    outputs: 'dist/libs/packages/date',
  }
};

export const fnConfig: UiUxQueueItem<PackageJsonConfig> = {
  type: 'package.json',
  config: {
    libName: 'fn',
    packagePath: 'libs/packages/fn',
    outputs: 'dist/libs/packages/fn',
  }
};

export const materialConfig: UiUxQueueItem<PackageJsonConfig> = {
  type: 'package.json',
  config: {
    libName: 'material',
    packagePath: 'libs/packages/material',
    outputs: 'dist/libs/packages/material',
  }
};

export const ngrxDexieConfig: UiUxQueueItem<PackageJsonConfig> = {
  type: 'package.json',
  config: {
    libName: 'ngrx-dexie',
    packagePath: 'libs/packages/ngrx-dexie',
    outputs: 'dist/libs/packages/ngrx-dexie',
  }
};

export const ngrxDexieNgPackagr: UiUxQueueItem<PackageJsonConfig> = {
  type: 'ng-package.json',
  config: {
    libName: 'ngrx-dexie',
    packagePath: 'libs/packages/ngrx-dexie',
    outputs: 'dist/libs/packages/ngrx-dexie',
  }
};

export const ngrxNgMatPrototypeConfig: UiUxQueueItem<PackageJsonConfig> = {
  type: 'package.json',
  config: {
    libName: 'nx-ng-mat-prototype',
    packagePath: 'libs/packages/nx-ng-mat-prototype',
    outputs: 'dist/libs/packages/nx-ng-mat-prototype',
  }
};

export const rxjsConfig: UiUxQueueItem<PackageJsonConfig> = {
  type: 'package.json',
  config: {
    libName: 'rxjs',
    packagePath: 'libs/packages/rxjs',
    outputs: 'dist/libs/packages/rxjs',
  }
};
export const schematicsConfig: UiUxQueueItem<PackageJsonConfig> = {
  type: 'package.json',
  config: {
    libName: 'schematics',
    packagePath: 'libs/packages/schematics',
    outputs: 'dist/libs/packages/schematics',
  }
};



export const utilsConfig: UiUxQueueItem<PackageJsonConfig> = {
  type: 'package.json',
  config: {
    libName: 'utils',
    packagePath: 'libs/packages/utils',
    outputs: 'dist/libs/packages/utils',
  }
};

const publishablePackagesDict: { [key: string]: boolean } = {
  'charts': true,
  'data': true,
  'date': true,
  'fn': true,
  'material': true,
  'ngrx-dexie': false,
  'nx-ng-mat-prototype': true,
  'rxjs': true,
  'schematics': true,
  'utils': true,
}

export const publishablePackages: string[] = Object.entries(publishablePackagesDict)
  .filter(([key, value]) => value)
  .map(([key, value]) => key);

export const packageListConfigs: UiUxQueueItem<PackageJsonConfig>[] = [
  chartsPkgJson,
  chartsNgPackagr,
  dataPkgJson,
  datePkgJson,
  fnConfig,
  materialConfig,
  ngrxDexieConfig,
  ngrxDexieNgPackagr,
  ngrxNgMatPrototypeConfig,
  rxjsConfig,
  schematicsConfig,
  utilsConfig
];

export const packageList: UiUxQueueItem<PackageJsonConfig>[] = packageListConfigs.filter((queueItem: UiUxQueueItem<PackageJsonConfig>) => {
  return publishablePackagesDict[queueItem.config.libName]
})



export const publishableNxProjects = publishablePackages.map(
  (pkg: string) => `packages-${pkg}`
);

export const modulesDir = './libs/';
