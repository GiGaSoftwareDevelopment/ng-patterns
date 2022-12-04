import * as fs from 'fs';
import {modulesDir} from './_build.config';

export interface PackageDescription {
  name: string;
}

export interface Config {
  packages: PackageDescription[];
  scope: string;
}

export const packages: PackageDescription[] = fs
  .readdirSync(modulesDir)
  .filter(path => {
    const stat = fs.statSync(`${modulesDir}${path}`);
    const isDir = stat.isDirectory();

    if (!isDir) {
      return false;
    }

    const hasBuild = fs.existsSync(`${modulesDir}${path}/BUILD`);

    return hasBuild;
  })
  .map(pkg => ({name: pkg}));
