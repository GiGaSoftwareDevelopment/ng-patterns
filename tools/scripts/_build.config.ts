import {UiUxQueueItem} from '../../libs/packages/utils/src/lib/process-queue';
import {NgPackageUpdate, PackageUpdate} from './_build.models';

export const apiPkgJson: UiUxQueueItem<PackageUpdate> = {
  type: 'package.json',
  config: {
    libName: 'api',
    packagePath: 'libs/packages/api',
    outputs: 'dist/libs/packages/api',
    peerDependencies: [],
    dependencies: [],
    devDependencies: []
  }
};

export const chartsPkgJson: UiUxQueueItem<PackageUpdate> = {
  type: 'package.json',
  config: {
    libName: 'charts',
    packagePath: 'libs/packages/charts',
    outputs: 'dist/libs/packages/charts',
    peerDependencies: ['@angular/material', '@angular/common', '@angular/cdk'],
    dependencies: [
      'd3',
      'fast-deep-equal',
      '@capacitor/browser',
      '@capacitor/core',
      '@types/d3',
      'tslib'
    ],
    devDependencies: []
  }
};

export const chartsNgPackagr: UiUxQueueItem<NgPackageUpdate> = {
  type: 'ng-package.json',
  config: {
    libName: 'charts',
    packagePath: 'libs/packages/charts',
    outputs: 'dist/libs/packages/charts',
    allowedNonPeerDependencies: [...chartsPkgJson.config.dependencies]
  }
};

export const componentsPkgJson: UiUxQueueItem<PackageUpdate> = {
  type: 'package.json',
  config: {
    libName: 'material',
    packagePath: 'libs/packages/material',
    outputs: 'dist/libs/packages/material',
    peerDependencies: ['@angular/material', '@angular/common', '@angular/cdk'],
    dependencies: [],
    devDependencies: []
  }
};

// export const componentsNgPackagr: UiUxQueueItem<NgPackageUpdate> = {
//   type: 'ng-package.json',
//   config: {
//     libName: 'charts',
//     packagePath: 'libs/packages/charts',
//     outputs: 'dist/libs/packages/charts',
//     allowedNonPeerDependencies: [...chartsPkgJson.config.dependencies]
//   }
// };

export const fnConfig: UiUxQueueItem<PackageUpdate> = {
  type: 'package.json',
  config: {
    libName: 'fn',
    packagePath: 'libs/packages/fn',
    outputs: 'dist/libs/packages/fn',
    peerDependencies: [],
    dependencies: ['lodash'],
    devDependencies: []
  }
};

export const ngrxDexieConfig: UiUxQueueItem<PackageUpdate> = {
  type: 'package.json',
  config: {
    libName: 'ngrx-dexie',
    packagePath: 'libs/packages/ngrx-dexie',
    outputs: 'dist/libs/packages/ngrx-dexie',
    peerDependencies: [],
    dependencies: ['dexie'],
    devDependencies: []
  }
};

export const ngrxDexieNgPackagr: UiUxQueueItem<NgPackageUpdate> = {
  type: 'ng-package.json',
  config: {
    libName: 'ngrx-dexie',
    packagePath: 'libs/packages/ngrx-dexie',
    outputs: 'dist/libs/packages/ngrx-dexie',
    allowedNonPeerDependencies: [...ngrxDexieConfig.config.dependencies]
  }
};

export const schematicsConfig: UiUxQueueItem<PackageUpdate> = {
  type: 'package.json',
  config: {
    libName: 'schematics',
    packagePath: 'libs/packages/schematics',
    outputs: 'dist/libs/packages/schematics',
    peerDependencies: [],
    dependencies: ['@nrwl/devkit', '@nrwl/workspace', 'tslib'],
    devDependencies: []
  }
};

export const rxjsConfig: UiUxQueueItem<PackageUpdate> = {
  type: 'package.json',
  config: {
    libName: 'rxjs',
    packagePath: 'libs/packages/rxjs',
    outputs: 'dist/libs/packages/rxjs',
    peerDependencies: [],
    dependencies: ['rxjs'],
    devDependencies: []
  }
};

export const packageList: UiUxQueueItem<PackageUpdate | NgPackageUpdate>[] = [
  apiPkgJson,
  chartsPkgJson,
  chartsNgPackagr,
  fnConfig,
  schematicsConfig,
  componentsPkgJson,
  rxjsConfig

  // Not needed yet - https://dexie.org/docs/Tutorial/Angular
  // ngrxDexieConfig,
  // ngrxDexieNgPackagr
];

export const publishablePackages: string[] = [
  'api',
  'charts',
  'date',
  'fn',
  'nx-ng-mat-prototype',
  'schematics',
  'material',
  'rxjs'
  // 'ngrx-dexie',
];

export const publishableNxProjects = publishablePackages.map(
  (pkg: string) => `packages-${pkg}`
);

export const modulesDir = './libs/';
