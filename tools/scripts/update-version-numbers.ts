import { readFileSync, writeFileSync } from 'fs';
import { EOL } from 'os';
import * as readline from 'readline';
import * as glob from 'glob';
import { createBuilder } from './util';
import { packages } from './publish/config';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

// get the version from the command
// e.g. ts-node ./build/update-version-numbers.ts 10.0.0
// const [ newVersion ] = process.argv.slice(2);
const argv: any = yargs(hideBin(process.argv)).argv;

async function getVersion(_version: string | undefined): Promise<string> {
  return new Promise((resolve, reject) => {
    if (!_version) {
      // if no version is provided, ask for it
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
      });

      rl.question(`What is the new version? provide [x.x.x] `, _newVersion => {
        rl.close();

        resolve(_newVersion);
      });
    } else {
      resolve(_version);
    }
  });
}

async function getUpdatePackageVersion(
  _updatePackageJsonVersion: undefined | boolean
): Promise<boolean> {
  return new Promise((resolve, reject) => {
    if (_updatePackageJsonVersion === undefined) {
      // if no version is provided, ask for it
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
      });

      rl.question(
        `Do you want to update versions of packages? y|n `,
        (_updatePackageVersion: string) => {
          rl.close();
          resolve(
            !(
              _updatePackageVersion === 'n' ||
              _updatePackageVersion === 'N' ||
              _updatePackageVersion === 'no'
            )
          );
        }
      );
    } else {
      resolve(_updatePackageJsonVersion);
    }
  });
}

async function getUpdatePeerDependencies(
  _updatePeerDependencies: undefined | boolean
): Promise<boolean> {
  return new Promise((resolve, reject) => {
    if (_updatePeerDependencies === undefined) {
      // if no version is provided, ask for it
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
      });

      rl.question(
        `Do you want to update version in peer dependencies? y|n `,
        (_updatePackageVersion: string) => {
          rl.close();
          resolve(
            !(
              _updatePackageVersion === 'n' ||
              _updatePackageVersion === 'N' ||
              _updatePackageVersion === 'no'
            )
          );
        }
      );
    } else {
      resolve(_updatePeerDependencies);
    }
  });
}

async function start() {
  const version = await getVersion(argv?.newVersion);
  const updatePackageVersion = await getUpdatePackageVersion(
    argv?.updatePackageVersion
  );
  const updatePeerDependencies = await getUpdatePeerDependencies(
    argv?.updatePeerDependencies
  );
  updateVersions(version, updatePackageVersion, updatePeerDependencies);
}

function updateVersions(
  version: string,
  updatePackageVersion: boolean,
  updatePeerDependencies: boolean
) {
  const publishNext = createBuilder([
    [
      'Update package.json',
      createPackageJsonBuilder(
        version,
        updatePackageVersion,
        updatePeerDependencies
      )
    ]
    // ['Update ng-add schematic', createUpdateAddSchematicBuilder(version)],
    // ['Update docs version picker', createArchivePreviousDocsBuilder(version)],
    // ['Create migration docs', createMigrationDocs(version)],
    // ['Update GitHub MIGRATION.MD', createMigrationMD(version)],
  ]);

  publishNext({
    scope: '@ngpat',
    packages
  }).catch(err => {
    console.error(err);
    process.exit(1);
  });
}

function addAtLeastMinorVersion(version: string): string {
  return `^${version}`;
}

/**
 * Updates package versions in package.json files
 * Updates peerDependencies versions of NgRx packages in package.json files
 */
function createPackageJsonBuilder(
  version: string,
  updatePackageVersion: boolean,
  updatePeerDependencies: boolean
) {
  const [major] = version.split('.');
  return async () => {
    glob
      .sync('**/package.json', { ignore: '**/node_modules/**' })
      .map((file: string) => {
        const content = readFileSync(file, 'utf-8');
        const pkg = JSON.parse(content);
        let saveFile = false;



        if (
          (updatePackageVersion &&
            pkg?.version &&
            pkg?.name?.startsWith('@ngpat')) ||
          pkg?.name?.startsWith('nx-ng-mat-prototype')
        ) {
          pkg.version = version;
          saveFile = true;
        }

        if (updatePeerDependencies && pkg?.peerDependencies) {
          Object.keys(pkg.peerDependencies).forEach(key => {
            if (
              key.startsWith('@ngpat') ||
              pkg?.name?.startsWith('nx-ng-mat-prototype')
            ) {
              pkg.peerDependencies[key] = addAtLeastMinorVersion(version);
              saveFile = true;
              console.log(key, pkg.peerDependencies[key]);
            } else if (key.startsWith('@angular')) {
              // because the NgRx version is in sync with the Angular version
              // we can also update the Angular dependencies
              pkg.peerDependencies[key] = `^${major}.0.0`;
              saveFile = true;
              console.log(key, pkg.peerDependencies[key]);
            }
          });
        }

        if (saveFile) {
          console.log('\n\n');
          console.log(pkg?.name);

          writeAsJson(file, pkg);
        }
      });
  };
}

/**
 * Updates the platform version for our schematics
 */
function createUpdateAddSchematicBuilder(version: string) {
  return async () => {
    glob
      .sync('**/libs-version.ts', { ignore: '**/node_modules/**' })
      .map((file: string) => {
        writeFileSync(
          file,
          `export const platformVersion = '^${version}';${EOL}`
        );
      });
  };
}

function writeAsJson(path: string, json: object) {
  const content = JSON.stringify(json, null, 2);
  writeFileSync(path, `${content}${EOL}`);
}

start();
