import {
  formatFiles,
  generateFiles,
  joinPathFragments,
  Tree
} from '@nx/devkit';
import { AddCapacitorAppGeneratorSchema } from './schema';
import { runBashCommand } from '../utils/run-bash-command';
import { addLatestVersionToPackageJson } from '../utils/add-latest-version-to-package-json';

export default async function (
  tree: Tree,
  options: AddCapacitorAppGeneratorSchema
) {
  // const domainName: string = options.domain;
  const appName = `${options.appName}-mobile`;

  // Used to generate files
  // const appParentDirectoryPath =
  //   options.domain && options.domain.length ? `apps/${options.domain}` : `apps`;

  // Used to copy templates
  const appDirectoryPath =
    options.domain && options.domain.length
      ? `apps/${options.domain}/${appName}`
      : `apps/${appName}`;

  await runBashCommand(`mkdir ${appDirectoryPath}`, '');

  await runBashCommand('npm init -y', appDirectoryPath);

  await runBashCommand('yarn add @capacitor/core', appDirectoryPath);

  await runBashCommand('yarn add -D @capacitor/cli', appDirectoryPath);

  await runBashCommand(
    `npx cap init ${appName} com.booking.www`,
    appDirectoryPath
  );

  /**
   * npx npm-add-script \
   *   -k "secrets" \
   *   -v "bash scripts/secrets.sh $SECRETS_WORKSPACE" \
   *   --force
   */
  await runBashCommand(
    'npx npm-add-script -k "update-android" -v "bash androidUpdate.sh" --force',
    appDirectoryPath
  );

  generateFiles(
    tree,
    joinPathFragments(__dirname, './files'),
    appDirectoryPath,
    {
      appName,
      webAppUrl: options.webAppUrl,
      appId: options.appId,
      template: ''
    }
  );

  await addLatestVersionToPackageJson(tree, '@capacitor/browser');

  await formatFiles(tree);

  await runBashCommand(
    'yarn add @capacitor/android @capacitor/ios',
    appDirectoryPath
  );

  await runBashCommand('npx cap add android', appDirectoryPath);

  await runBashCommand('npx cap add ios', appDirectoryPath);

  await runBashCommand('npx cap sync', appDirectoryPath);
}
