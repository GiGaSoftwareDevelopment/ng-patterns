import { UiUxQueueItem } from '../../../libs/packages/utils/src/lib/process-queue';
import { PackageJsonConfig } from './_build.models';



const publishablePackagesDict: { [key: string]: boolean } = {
  'charts': true,
  'data': true,
  'date': true,
  'feature-flag': true,
  'firebase': true,
  'material': true,
  'nx-ng-mat-prototype': true,
  'schematics': true,
  'store': true,

  'ngrx-dexie': false,

}

const publishablePackageDependenciesDict: { [key: string]: boolean } = {
  'rxjs': true,
  'utils': true,
}

const baseDependendantPackagesDict: { [key: string]: boolean } = {
  'fn': true,
}


function createUiUxQueueItemConfig(key: string): UiUxQueueItem<PackageJsonConfig> {
  return <UiUxQueueItem<PackageJsonConfig>>{
    type: 'package.json',
    config: <PackageJsonConfig>{
      libName: key,
      packagePath: `libs/packages/${key}`,
      outputs: `dist/libs/packages/${key}`,
    }
  }
}

/**
 * List of package names that can publish
 * @param dictionaryObject
 */
function filterPublishablePackages(dictionaryObject: { [key: string]: boolean }): string[] {
  return Object.entries(dictionaryObject)
    .filter(([packageName, canPublish]) => canPublish)
    .map(([packageName, canPublish]) => packageName);
}

function createPackageName(key: string): string {
  return `packages-${key}`;
}


export const publishablePackageList: string[] = [
  ...filterPublishablePackages(publishablePackagesDict),
  ...filterPublishablePackages(publishablePackageDependenciesDict),
  ...filterPublishablePackages(baseDependendantPackagesDict),
]


export const chartsPkgJson: UiUxQueueItem<PackageJsonConfig> = createUiUxQueueItemConfig('charts');

export const materialConfig: UiUxQueueItem<PackageJsonConfig> = createUiUxQueueItemConfig('material');

export const dependencyVersionPackageList: UiUxQueueItem<PackageJsonConfig>[] = publishablePackageList.map(createUiUxQueueItemConfig);

export const publishablePackages: string[] = filterPublishablePackages(publishablePackagesDict).map(createPackageName);
export const publishablePackageDependencies: string[] = filterPublishablePackages(publishablePackageDependenciesDict).map(createPackageName);
export const baseDependendantPackages: string[] = filterPublishablePackages(baseDependendantPackagesDict).map(createPackageName);


export const modulesDir = './libs/';
