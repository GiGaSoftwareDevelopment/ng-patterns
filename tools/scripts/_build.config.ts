import {UiUxQueueItem} from '../../libs/packages/utils/src/lib/process-queue';
import {NgPackageUpdate, PackageUpdate} from './_build.models';

export const chartsPkgJson: UiUxQueueItem<PackageUpdate> = {
  filename: 'package.json',
  config: {
    libName: 'charts',
    packagePath: 'libs/packages/charts',
    outputs: 'dist/libs/packages/charts',
    peerDependencies: [],
    dependencies: [
      '@angular/material',
      '@angular/common',
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
  filename: 'ng-package.json',
  config: {
    libName: 'charts',
    packagePath: 'libs/packages/charts',
    outputs: 'dist/libs/packages/charts',
    allowedNonPeerDependencies: [...chartsPkgJson.config.dependencies]
  }
};

export const fnConfig: UiUxQueueItem<PackageUpdate> = {
  filename: 'package.json',
  config: {
    libName: 'fn',
    packagePath: 'libs/packages/fn',
    outputs: 'dist/libs/packages/fn',
    peerDependencies: [],
    dependencies: ['lodash'],
    devDependencies: []
  }
};

export const schematicsConfig: UiUxQueueItem<PackageUpdate> = {
  filename: 'package.json',
  config: {
    libName: 'schematics',
    packagePath: 'libs/packages/schematics',
    outputs: 'dist/libs/packages/schematics',
    peerDependencies: [],
    dependencies: ['@nrwl/devkit', '@nrwl/workspace', 'tslib'],
    devDependencies: []
  }
};

export const packageList: UiUxQueueItem<PackageUpdate | NgPackageUpdate>[] = [
  chartsPkgJson,
  chartsNgPackagr,
  fnConfig,
  schematicsConfig
];

export const publishablePackages: string[] = [
  'charts',
  'date',
  'fn',
  'nx-ng-mat-prototype',
  'schematics'
];

export const publishableNxProjects = publishablePackages.map(
  (pkg: string) => `packages-${pkg}`
);

export const modulesDir = './libs/';
