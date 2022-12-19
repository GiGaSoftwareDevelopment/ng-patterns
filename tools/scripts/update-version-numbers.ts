import {readFileSync, writeFileSync} from 'fs';
import {EOL} from 'os';
import * as readline from 'readline';
import * as glob from 'glob';
import {createBuilder} from './util';
import {packages} from './publish/config';

// get the version from the command
// e.g. ts-node ./build/update-version-numbers.ts 10.0.0
const [newVersion] = process.argv.slice(2);

if (newVersion) {
  updateVersions(newVersion);
} else {
  // if no version is provided, ask for it
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.question(`What's the new version? `, version => {
    rl.close();
    updateVersions(version);
  });
}

function updateVersions(version: string) {
  const publishNext = createBuilder([
    ['Update package.json', createPackageJsonBuilder(version)]
    // ['Update ng-add schematic', createUpdateAddSchematicBuilder(version)],
    // ['Update docs version picker', createArchivePreviousDocsBuilder(version)],
    // ['Create migration docs', createMigrationDocs(version)],
    // ['Update GitHub MIGRATION.MD', createMigrationMD(version)],
  ]);

  publishNext({
    scope: '@uiux',
    packages
  }).catch(err => {
    console.error(err);
    process.exit(1);
  });
}

/**
 * Updates package versions in package.json files
 * Updates peerDependencies versions of NgRx packages in package.json files
 */
function createPackageJsonBuilder(version: string) {
  const [major] = version.split('.');
  return async () => {
    glob
      .sync('**/package.json', {ignore: '**/node_modules/**'})
      .map((file: string) => {
        const content = readFileSync(file, 'utf-8');
        const pkg = JSON.parse(content);
        let saveFile = false;

        if (
          (pkg?.version && pkg?.name?.startsWith('@uiux')) ||
          pkg?.name?.startsWith('nx-ng-mat-prototype')
        ) {
          pkg.version = version;
          saveFile = true;
        }

        if (pkg?.peerDependencies) {
          Object.keys(pkg.peerDependencies).forEach(key => {
            if (
              key.startsWith('@uiux') ||
              pkg?.name?.startsWith('nx-ng-mat-prototype')
            ) {
              pkg.peerDependencies[key] = version;
              saveFile = true;
            } else if (key.startsWith('@angular')) {
              // because the NgRx version is in sync with the Angular version
              // we can also update the Angular dependencies
              pkg.peerDependencies[key] = `^${major}.0.0`;
              saveFile = true;
            }
          });
        }

        if (saveFile) {
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
      .sync('**/libs-version.ts', {ignore: '**/node_modules/**'})
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
