import {
  addProjectConfiguration,
  formatFiles,
  generateFiles,
  Tree
} from '@nx/devkit';
import * as path from 'path';
import { ElectronGeneratorSchema } from './schema';

export default async function (tree: Tree, options: ElectronGeneratorSchema) {
  // nx g @nx/node:application --name=booking-desktop --bundler=webpack --directory=apps/flights --tags=domain:flights --no-interactive

  const projectRoot = `libs/${options.name}`;
  addProjectConfiguration(tree, options.name, {
    root: projectRoot,
    projectType: 'library',
    sourceRoot: `${projectRoot}/src`,
    targets: {}
  });
  generateFiles(tree, path.join(__dirname, 'files'), projectRoot, options);
  await formatFiles(tree);
}
