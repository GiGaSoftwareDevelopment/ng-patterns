import {
  readProjectConfiguration,
  Tree,
  updateProjectConfiguration
} from '@nx/devkit';

export function updateCompodocConfig(tree: Tree, projectName: string) {
  const projectConfig = readProjectConfiguration(tree, projectName);

  const projectRoot = projectConfig.sourceRoot?.replace('/src', '');

  if (
    projectConfig &&
    projectConfig.targets &&
    projectConfig.targets['build-storybook'] &&
    projectConfig.targets['build-storybook'].options
  ) {
    projectConfig.targets['build-storybook'].options = Object.assign(
      projectConfig.targets['build-storybook'].options,
      {
        compodoc: true,
        compodocArgs: ['-e', 'json', '-d', projectRoot]
      }
    );
  }

  if (
    projectConfig &&
    projectConfig.targets &&
    projectConfig.targets['storybook'] &&
    projectConfig.targets['storybook'].options
  ) {
    projectConfig.targets['storybook'].options = Object.assign(
      projectConfig.targets['storybook'].options,
      {
        compodoc: true,
        compodocArgs: ['-e', 'json', '-d', projectRoot]
      }
    );
  }

  updateProjectConfiguration(tree, projectName, projectConfig);
}
