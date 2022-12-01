import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

interface PackageUpdate {
  libName: string;
  packagePath: string,

}

const packageList: PackageUpdate[] = [
  {
    libName: 'charts',
    packagePath: 'libs/charts/package.json'
  }
]


