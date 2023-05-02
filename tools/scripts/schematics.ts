import { join } from 'path';
import { writeFileSync } from 'fs';

const rootDir = join(__dirname, '../..');

interface Generators {
  generators: {
    [key: string]: {
      factory: string;
      schema: string;
      description: string;
    };
  };
}

/**
 * go to root directors
 */
const generators = require(join(
  rootDir,
  'libs/packages/schematics/generators.json'
));
// const executors = require(join(rootDir, 'libs/packages/schematics/executors.json'));

// console.log(generatorsJSON);

// const generators: Generators = JSON.parse(generatorsJSON);

const schematics = {
  schematics: {
    ...generators.generators
  }
};

writeFileSync(
  'libs/packages/schematics/schematics.json',
  JSON.stringify(schematics, null, 2)
);
