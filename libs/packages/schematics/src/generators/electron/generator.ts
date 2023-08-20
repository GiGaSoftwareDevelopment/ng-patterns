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
import {
  createBuildAppConfigurations,
  createBuildTarget,
  createServeTarget
} from './configs';
import { cpSync } from 'fs';
import * as getLatestVersion from 'get-latest-version';
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
  fsExtra: string;
  ipc: string;
  rxjs: string;
  iconutil: string;
  typeFsExtra: string;
  electron: string;
  electronInstallerDmg: string;
  electronPackager: string;
  electronStore: string;
  // electronNotarize: string;
  electronDevtoolsInstaller: string;
  // electionOsxSign: string;
  electronSettings: string;
  electronWixMsi: string;
  firebaseAdmin: string;
  ngPatFn: string;
  tsx: string;
  systeminformation: string;
  typesElectron: string;
  pngToIco: string;
}

export default async function (tree: Tree, options: ElectronGeneratorSchema) {
  // nx g @nx/node:application --name=booking-desktop --bundler=webpack --directory=apps/flights --tags=domain:flights --no-interactive

  const projectName =
    options.domain && options.domain.length
      ? `${options.domain}-${options.appName}`
      : options.appName;

  // Used to generate files
  const appParentDirectoryPath =
    options.domain && options.domain.length ? `apps/${options.domain}` : `apps`;

  // Used to copy templates
  const appDirectoryPath =
    options.domain && options.domain.length
      ? `apps/${options.domain}/${options.appName}`
      : `apps/${options.appName}`;

  console.log(`Creating electron app at ${appDirectoryPath}`);

  const electronDevtoolsInstaller: string =
    (await getLatestVersion('electron-devtools-installer')) || '^3.2.0';
  // const electionOsxSign: string =
  //   (await getLatestVersion('electron-osx-sign')) || '^0.6.0';
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
  // const electronNotarize: string =
  //   (await getLatestVersion('electron-notarize')) || '^1.2.2';
  const typesElectron: string =
    (await getLatestVersion('@types/electron')) || '^1.6.10';
  const electronWixMsi: string =
    (await getLatestVersion('electron-wix-msi')) || '^5.0.0';
  const pngToIco: string = (await getLatestVersion('png-to-ico')) || '^2.1.8';

  const props: TemplateNames = {
    ...options,
    ...names(options.appName),
    template: '',
    projectName,
    electronDevtoolsInstaller,
    // electionOsxSign,
    electronWixMsi,
    electronSettings,
    fsExtra,
    ipc,
    rxjs,
    iconutil,
    typeFsExtra,
    electron,
    electronInstallerDmg,
    // electronNotarize,
    electronPackager,
    electronStore,
    firebaseAdmin,
    tsx,
    ngPatFn,
    pngToIco,
    systeminformation,
    typesElectron
  };

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
    name: options.appName,
    bundler: 'webpack',
    directory: appParentDirectoryPath,
    tags: `domain:${options.domain}, type:app`,
    unitTestRunner: 'jest',
    standaloneConfig: true,
    linter: Linter.EsLint,
    e2eTestRunner: 'none'
  });

  const projectConfig = readProjectConfiguration(tree, projectName);
  const buildConfigs = createBuildAppConfigurations(appDirectoryPath);

  // Move build to build-app
  if (
    projectConfig &&
    projectConfig.targets &&
    projectConfig.targets['build']
  ) {
    projectConfig.targets['build-app'] = { ...projectConfig.targets['build'] };
    delete projectConfig.targets['build'];
    projectConfig.targets['build-app']['configurations'] = { ...buildConfigs };

    projectConfig.targets['build-app']['options'][
      'outputPath'
    ] = `${appDirectoryPath}/dist`;
  }

  // Create build
  const buildTarget = createBuildTarget(projectName, appDirectoryPath);

  if (projectConfig && projectConfig.targets) {
    projectConfig.targets['build'] = { ...buildTarget };
  }

  const serveTarget = createServeTarget(projectName, appDirectoryPath);

  if (
    projectConfig &&
    projectConfig.targets &&
    projectConfig.targets['serve'] &&
    projectConfig.targets['serve']['configurations']
  ) {
    projectConfig.targets['serve'] = {
      ...serveTarget
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

  // await runBashCommand('npm install', appDirectoryPath);

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

  await addLatestVersionToPackageJson(tree, 'electron');
  await addLatestVersionToPackageJson(tree, 'electron-devtools-installer');
  await addLatestVersionToPackageJson(tree, 'electron-settings');
}
