import {
  formatFiles,
  generateFiles,
  readProjectConfiguration,
  Tree,
  updateProjectConfiguration
} from '@nx/devkit';
import * as path from 'path';
import { applicationGenerator } from '@nx/node';
import { ElectronGeneratorSchema } from './schema';
import { Linter } from '@nx/linter';
import { names } from '@nx/workspace';
import { updateBuildConfigs, updateServeConfigs } from './configs';
import { cpSync } from 'fs';

interface TemplateNames {
  name: string;
  className: string;
  propertyName: string;
  constantName: string;
  fileName: string;
  appName: string;
  domain: string;
  template: string;
  webAppUrl: string;
  appId: string;
  projectName: string;
}

export default async function (tree: Tree, options: ElectronGeneratorSchema) {
  // nx g @nx/node:application --name=booking-desktop --bundler=webpack --directory=apps/flights --tags=domain:flights --no-interactive

  const appName = `${options.appName}-desktop`;

  const projectName =
    options.domain && options.domain.length
      ? `${options.domain}-${appName}`
      : appName;

  const props: TemplateNames = {
    ...options,
    ...names(appName),
    template: '',
    projectName
  };

  // Used to generate files
  const appParentDirectoryPath =
    options.domain && options.domain.length ? `apps/${options.domain}` : `apps`;

  // Used to copy templates
  const appDirectoryPath =
    options.domain && options.domain.length
      ? `apps/${options.domain}/${appName}`
      : `apps/${appName}`;

  // TODO add this to package.json of electron app
  // await addDependenciesToPackageJson(
  //   tree,
  //   {
  //     'electron': 'latest',
  //     'electron-store': 'latest'
  //   },
  //   {
  //     '@nx/node': 'latest'
  //   }
  // );

  await applicationGenerator(tree, {
    name: appName,
    bundler: 'webpack',
    directory: appParentDirectoryPath,
    tags: `domain:${options.domain}, type:app`,
    unitTestRunner: 'jest',
    standaloneConfig: true,
    linter: Linter.EsLint,
    e2eTestRunner: 'none'
  });

  const projectConfig = readProjectConfiguration(tree, projectName);
  const buildConfigs = updateBuildConfigs(appDirectoryPath);

  if (
    projectConfig &&
    projectConfig.targets &&
    projectConfig.targets['build'] &&
    projectConfig.targets['build']['configurations'] &&
    projectConfig.targets['build']['configurations']['production']
  ) {
    Object.assign(
      projectConfig.targets['build']['configurations']['production'],
      buildConfigs.production
    );
    projectConfig.targets['build']['configurations']['qa'] = buildConfigs.qa;
    projectConfig.targets['build']['configurations']['uat'] = buildConfigs.uat;

    projectConfig.targets['build']['options'][
      'outputPath'
    ] = `${appDirectoryPath}/app`;
  }

  const serveConfigs = updateServeConfigs(options.appName, options.domain);

  if (
    projectConfig &&
    projectConfig.targets &&
    projectConfig.targets['serve'] &&
    projectConfig.targets['serve']['configurations']
  ) {
    projectConfig.targets['serve'] = {
      configurations: {
        ...serveConfigs
      }
    };
  }

  updateProjectConfiguration(tree, projectName, projectConfig);

  cpSync(
    path.join(__dirname, 'assets'),
    path.join(process.cwd(), appDirectoryPath, 'src', 'assets'),
    { recursive: true }
  );

  cpSync(
    path.join(__dirname, 'design'),
    path.join(process.cwd(), appDirectoryPath, 'design'),
    { recursive: true }
  );

  generateFiles(tree, path.join(__dirname, 'files'), appDirectoryPath, props);
  await formatFiles(tree);
}
