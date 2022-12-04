import {UiUxQueueItem} from '../../libs/packages/utils/src/lib/process-queue';
import {PackageUpdate} from './_build.models';

export const chartsConfig: UiUxQueueItem<PackageUpdate> = {
  type: 'dep',
  config: {
    libName: 'charts',
    packagePath: 'libs/packages/charts',
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

export const fnConfig: UiUxQueueItem<PackageUpdate> = {
  type: 'dep',
  config: {
    libName: 'fn',
    packagePath: 'libs/packages/fn',
    peerDependencies: [],
    dependencies: ['lodash'],
    devDependencies: []
  }
};

export const schematicsConfig: UiUxQueueItem<PackageUpdate> = {
  type: 'dep',
  config: {
    libName: 'schematics',
    packagePath: 'libs/packages/schematics',
    peerDependencies: [],
    dependencies: ['@nrwl/devkit', '@nrwl/workspace', 'tslib'],
    devDependencies: []
  }
};

export const packageList: UiUxQueueItem<PackageUpdate>[] = [
  chartsConfig,
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

export const modulesDir = './libs/';
