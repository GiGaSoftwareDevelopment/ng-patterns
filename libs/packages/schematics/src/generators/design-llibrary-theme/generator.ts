import {
  addProjectConfiguration,
  formatFiles,
  generateFiles,
  getWorkspaceLayout,
  names,
  offsetFromRoot,
  readProjectConfiguration,
  Tree
} from '@nrwl/devkit';
import * as path from 'path';
import {DesignLlibraryThemeGeneratorSchema} from './schema';

export default async function (
  tree: Tree,
  options: DesignLlibraryThemeGeneratorSchema
) {
  generateFiles(
    tree,
    path.join(__dirname, 'files'),
    <string>readProjectConfiguration(tree, options.projectName).sourceRoot,
    {}
  );
  await formatFiles(tree);
}
