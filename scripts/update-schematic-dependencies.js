const { readFileSync, writeFileSync } = require('fs');
const { join } = require('path');

const schematicPkgJsonPath = 'packages/schematics/package.json';
const schematicDeps = require(join(__dirname, '..', schematicPkgJsonPath));
const packageJson = require(join(__dirname, '../package.json'));

schematicDeps.dependencies.tslib = packageJson.dependencies.tslib;
schematicDeps.dependencies['@nrwl/devkit'] = packageJson.devDependencies['@nrwl/devkit'];
schematicDeps.dependencies['@nrwl/workspace'] = packageJson.devDependencies['@nrwl/workspace'];
schematicDeps.dependencies['@angular/material'] = packageJson.dependencies['@angular/material'];
schematicDeps.dependencies['@angular-devkit/schematics'] = packageJson.dependencies['@angular-devkit/schematics'];
schematicDeps.dependencies['@angular/cdk'] = packageJson.dependencies['@angular/cdk'];
schematicDeps.dependencies['@angular/material'] = packageJson.dependencies['@angular/material'];

console.log(`Update schematic dependencies`);
console.log( JSON.stringify(schematicDeps, null, 2))

writeFileSync(
  schematicPkgJsonPath,
  JSON.stringify(schematicDeps, null, 2)
);

process.exit(0);
