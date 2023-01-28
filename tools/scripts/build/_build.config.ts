import { UiUxQueueItem } from '../../../libs/packages/utils/src/lib/process-queue';
import { BuildLibLevel, PackageJsonConfig } from './_build.models';

/**
 * https://lucid.app/lucidchart/d51cbba8-13aa-4447-b8df-4465f8a618d3/edit?invitationId=inv_105bee5c-c78c-48ae-9f49-f2b3143d0388&page=0_0#
 */



const publishableLevel_0_Dict: { [key: string]: boolean } = {
  'feature-flag': true,
  'nx-ng-mat-prototype': true,
  'schematics': true,
  'ngrx-dexie': false,
  'material': true,
}


const publishableLevel_1_Dict: { [key: string]: boolean } = {
  'charts': true,
  'store': true,
}

const publishableLevel_2_Dict: { [key: string]: boolean } = {
  'utils': true,
  'calculations': true,
}


const publishableLevel_3_Dict: { [key: string]: boolean } = {
  'data': true,
  'firebase': true,
  'rxjs': true,
}


const publishableLevel_4_Dict: { [key: string]: boolean } = {
  'date': true,
}

const publishableLevel_5_Dict: { [key: string]: boolean } = {
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
  ...filterPublishablePackages(publishableLevel_5_Dict),
  ...filterPublishablePackages(publishableLevel_4_Dict),
  ...filterPublishablePackages(publishableLevel_3_Dict),
  ...filterPublishablePackages(publishableLevel_2_Dict),
  ...filterPublishablePackages(publishableLevel_1_Dict),
  ...filterPublishablePackages(publishableLevel_0_Dict),
]


export const chartsPkgJson: UiUxQueueItem<PackageJsonConfig> = createUiUxQueueItemConfig('charts');

export const materialConfig: UiUxQueueItem<PackageJsonConfig> = createUiUxQueueItemConfig('material');

export const dependencyVersionPackageList: UiUxQueueItem<PackageJsonConfig>[] = publishablePackageList.map(createUiUxQueueItemConfig);

export const publishableLevel_5: string[] = filterPublishablePackages(publishableLevel_5_Dict).map(createPackageName);
export const publishableLevel_4: string[] = filterPublishablePackages(publishableLevel_5_Dict).map(createPackageName);
export const publishableLevel_3: string[] = filterPublishablePackages(publishableLevel_3_Dict).map(createPackageName);
export const publishableLevel_2: string[] = filterPublishablePackages(publishableLevel_2_Dict).map(createPackageName);
export const publishableLevel_1: string[] = filterPublishablePackages(publishableLevel_1_Dict).map(createPackageName);
export const publishableLevel_0: string[] = filterPublishablePackages(publishableLevel_0_Dict).map(createPackageName);



export const modulesDir = './libs/';
