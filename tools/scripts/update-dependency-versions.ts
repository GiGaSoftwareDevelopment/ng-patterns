import {readFileSync, writeFileSync} from 'fs';
import {join} from 'path';
import {
  UiUxProcessQueue,
  UiUxQueueItem
} from '../../libs/packages/utils/src/lib/process-queue';
import {PackageUpdate, PkdDict} from './_build.models';
import {packageList} from './_build.config';

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

const p: UiUxProcessQueue<PackageUpdate> = new UiUxProcessQueue();

p.currentItem$.subscribe((item: UiUxQueueItem<PackageUpdate>) => {
  console.log(`\nProcessing ${item.config.libName}`);

  const pkgPath = join(rootDir, item.config.packagePath, 'package.json');
  const pkg = require(pkgPath);

  pkg.devDependencies = {};
  item.config.devDependencies.map((dep: string) => {
    pkg.devDependencies[dep] = pkgDict[dep];
  });

  pkg.dependencies = {};
  item.config.dependencies.map((dep: string) => {
    pkg.dependencies[dep] = pkgDict[dep];
  });

  pkg.peerDependencies = {};
  item.config.peerDependencies.map((dep: string) => {
    pkg.peerDependencies[dep] = pkgDict[dep];
  });

  console.log(pkg);

  console.log(JSON.stringify(pkg, null, 2));

  writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));

  p.next();
});

p.addItems(packageList);
