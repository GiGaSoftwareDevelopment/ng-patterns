import {readFileSync, writeFileSync} from 'fs';
import {join} from 'path';
import {
  UiUxProcessQueue,
  UiUxQueueItem
} from '../../libs/packages/utils/src/lib/process-queue';
import {NgPackageUpdate, PackageUpdate, PkdDict} from './build/_build.models';
import {packageList} from './build/_build.config';

const rootDir = join(__dirname, '../..');

/**
 * go to root directors
 */
const packageJson = require(join(rootDir, 'package.json'));

let pkgDict: PkdDict = {};
function processPackages(pks: PkdDict, dict: PkdDict): PkdDict {
  if (pks) {
    return Object.keys(pks).reduce((a: PkdDict, key: string) => {
      a[key] = pks[key].includes('^') ? pks[key] : `^${pks[key]}`;
      return a;
    }, dict);
  }

  return dict;
}

pkgDict = processPackages(packageJson.devDependencies, pkgDict);
pkgDict = processPackages(packageJson.dependencies, pkgDict);
pkgDict = processPackages(packageJson.peerDependencies, pkgDict);

const p: UiUxProcessQueue<PackageUpdate | NgPackageUpdate> =
  new UiUxProcessQueue();

p.currentItem$.subscribe(
  (item: UiUxQueueItem<PackageUpdate | NgPackageUpdate>) => {
    console.log(`\nProcessing ${item.config.libName}/${item.type}`);

    const pkgPath = join(rootDir, item.config.packagePath, item.type);
    const pkg = require(pkgPath);

    if (item.type === 'package.json') {
      pkg.devDependencies = {};
      (<PackageUpdate>item.config).devDependencies.map((dep: string) => {
        pkg.devDependencies[dep] = pkgDict[dep];
      });

      pkg.dependencies = {};
      (<PackageUpdate>item.config).dependencies.map((dep: string) => {
        pkg.dependencies[dep] = pkgDict[dep];
      });

      pkg.peerDependencies = {};
      (<PackageUpdate>item.config).peerDependencies.map((dep: string) => {
        pkg.peerDependencies[dep] = pkgDict[dep];
      });
    }

    if (item.type === 'ng-package.json') {
      pkg.allowedNonPeerDependencies = [
        ...(<NgPackageUpdate>item.config).allowedNonPeerDependencies
      ];
    }

    writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));

    p.next();
  }
);

p.addItems(packageList);
