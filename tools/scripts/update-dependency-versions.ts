import {writeFileSync} from 'fs';
import {join} from 'path';
import {
  NgPatProcessQueue,
  NgPatQueueItem
} from '../../libs/packages/utils/src/lib/process-queue';
import {PackageJsonConfig, PkdDict} from './build/_build.models';
import {dependencyVersionPackageList} from './build/_build.config';

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

pkgDict['tslib'] = `^2.0.0`;
pkgDict['rxjs'] = `^7.5.6`;

const p: NgPatProcessQueue<NgPatQueueItem<PackageJsonConfig>> =
  new NgPatProcessQueue();

p.currentItem$.subscribe((item: NgPatQueueItem<PackageJsonConfig>) => {
  console.log(`\nProcessing ${item.config.libName}/${item.type}`);

  const pkgPath = join(rootDir, item.config.packagePath, item.type);
  const pkg = require(pkgPath);

  if (pkg.devDependencies) {
    Object.keys(pkg.devDependencies).map((dep: string) => {
      if (pkgDict[dep]) {
        pkg.devDependencies[dep] = pkgDict[dep];
      }
    });
  }

  if (pkg.dependencies) {
    Object.keys(pkg.dependencies).map((dep: string) => {
      if (pkgDict[dep]) {
        pkg.dependencies[dep] = pkgDict[dep];
      }
    });
  }

  if (pkg.peerDependencies) {
    Object.keys(pkg.peerDependencies).map((dep: string) => {
      if (pkgDict[dep]) {
        pkg.peerDependencies[dep] = pkgDict[dep];
      }
    });
  }

  writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));

  p.next();
});

p.addItems(dependencyVersionPackageList);
