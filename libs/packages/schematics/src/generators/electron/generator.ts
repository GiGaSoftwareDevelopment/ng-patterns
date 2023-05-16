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
import * as getLatestVersion from 'get-latest-version';
import { runBashCommand } from '../utils/run-bash-command';
import { join } from 'path';
import { addLatestVersionToPackageJson } from '../utils/add-latest-version-to-package-json';

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
  electronDevtoolsInstaller: string;
  electionOsxSign: string;
  electronSettings: string;
  fsExtra: string;
  ipc: string;
  rxjs: string;
  iconutil: string;
  typeFsExtra: string;
  electron: string;
  electronInstallerDmg: string;
  electronPackager: string;
  electronStore: string;
  firebaseAdmin: string;
  ngPatFn: string;
  tsx: string;
  systeminformation: string;
}

export default async function (tree: Tree, options: ElectronGeneratorSchema) {
  // nx g @nx/node:application --name=booking-desktop --bundler=webpack --directory=apps/flights --tags=domain:flights --no-interactive

  const appName = `${options.appName}-desktop`;

  const projectName =
    options.domain && options.domain.length
      ? `${options.domain}-${appName}`
      : appName;

  const electronDevtoolsInstaller: string =
    (await getLatestVersion('electron-devtools-installer')) || '^3.2.0';
  const electionOsxSign: string =
    (await getLatestVersion('electron-osx-sign')) || '^0.6.0';
  const electronSettings: string =
    (await getLatestVersion('electron-settings')) || '^4.0.2';
  const fsExtra: string = (await getLatestVersion('fs-extra')) || '^11.1.1';
  const ipc: string = (await getLatestVersion('ipc')) || '^0.0.1';
  const rxjs: string = (await getLatestVersion('rxjs')) || '^7.8.1';
  const iconutil: string = (await getLatestVersion('iconutil')) || '^1.0.2';
  const typeFsExtra: string =
    (await getLatestVersion('@types/fs-extra')) || '^11.0.1';
  const electron: string = (await getLatestVersion('electron')) || '^24.3.0';
  const electronInstallerDmg: string =
    (await getLatestVersion('electron-installer-dmg')) || '^4.0.0';
  const electronPackager: string =
    (await getLatestVersion('electron-packager')) || '^17.1.1';
  const electronStore: string =
    (await getLatestVersion('electron-store')) || '^8.1.0';
  const firebaseAdmin: string =
    (await getLatestVersion('firebase-admin')) || '^11.8.0';
  const tsx: string = (await getLatestVersion('tsx')) || '^3.12.7';
  const ngPatFn: string = (await getLatestVersion('tsx')) || '^16.0.7';
  const systeminformation: string =
    (await getLatestVersion('tsx')) || '^5.17.12';

  const props: TemplateNames = {
    ...options,
    ...names(appName),
    template: '',
    projectName,
    electronDevtoolsInstaller,
    electionOsxSign,
    electronSettings,
    fsExtra,
    ipc,
    rxjs,
    iconutil,
    typeFsExtra,
    electron,
    electronInstallerDmg,
    electronPackager,
    electronStore,
    firebaseAdmin,
    tsx,
    ngPatFn,
    systeminformation
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
    projectConfig.targets['build']['configurations']
  ) {
    projectConfig.targets['build']['configurations'] = { ...buildConfigs };

    projectConfig.targets['build']['options'][
      'outputPath'
    ] = `${appDirectoryPath}/dist`;
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

  const eslintConfig = tree
    .read(join(appDirectoryPath, 'eslint.json'))
    ?.toString();

  if (eslintConfig) {
    const rules = JSON.parse(eslintConfig);
    if (rules && rules['overrides'] && rules['overrides'][0]) {
      rules['overrides'][0]['rules']['@nx/enforce-module-boundaries'] = 'off';

      const newText = JSON.stringify(rules, undefined, 2);
      tree.write(join(appDirectoryPath, 'eslint.json'), newText);
    }
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

  await runBashCommand('yarn install', appDirectoryPath);

  await addLatestVersionToPackageJson(tree, 'electron');

  await formatFiles(tree);
}
