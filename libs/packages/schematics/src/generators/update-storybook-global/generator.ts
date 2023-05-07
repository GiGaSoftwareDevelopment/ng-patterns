import {
  formatFiles,
  generateFiles,
  ProjectConfiguration,
  readProjectConfiguration,
  Tree
} from '@nx/devkit';
import { UpdateStorybookGlobalGeneratorSchema } from './schema';
import { join } from 'path';
import { updateCompodocConfig } from '@ngpat/schematics/src/generators/update-storybook-global/lib/util.fns';

export default async function (
  tree: Tree,
  options: UpdateStorybookGlobalGeneratorSchema
) {
  const projectConfig: ProjectConfiguration = readProjectConfiguration(
    tree,
    options.projectName
  );
  const sourceRoot: string | undefined = projectConfig.sourceRoot;

  if (sourceRoot) {
    generateFiles(
      tree,
      join(__dirname, 'files'),
      join(sourceRoot, '..', '.storybook'),
      {
        // replace __template__ in file names
        template: ''
      }
    );

    updateCompodocConfig(tree, options.projectName);

    await formatFiles(tree);

    /*
    const path = join(sourceRoot, '..', '.storybook', 'main.ts');
    let content: string = readFileSync(path, 'utf-8');
    content = content.replace(
      "'../src/app/!**!/!*.stories",
      "'../../../../!**!/!*.stories"
    );
    writeFileSync(path, content);
    */
  }

  return () => {
    console.log('done');
  };
}
