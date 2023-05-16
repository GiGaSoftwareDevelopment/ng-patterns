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
  const domainName: string = options.domain;
  const appName: string = options.appName;

  if (domainName.length && domainName.length) {
    const appPath = `apps/${domainName}/${appName}-mobile`;

    await runBashCommand(`mkdir ${appPath}`, '');

    await runBashCommand('npm init -y', appPath);

    await runBashCommand('yarn add @capacitor/core', appPath);

    await runBashCommand('yarn add -D @capacitor/cli', appPath);

    await runBashCommand(
      `npx cap init ${appName}-mobile com.booking.www`,
      appPath
    );

    /**
     * npx npm-add-script \
     *   -k "secrets" \
     *   -v "bash scripts/secrets.sh $SECRETS_WORKSPACE" \
     *   --force
     */
    await runBashCommand(
      'npx npm-add-script -k "update-android" -v "bash androidUpdate.sh" --force',
      appPath
    );

    generateFiles(tree, joinPathFragments(__dirname, './files'), appPath, {
      appName,
      webAppUrl: options.webAppUrl,
      appId: options.appId,
      template: ''
    });

    await addLatestVersionToPackageJson(tree, '@capacitor/browser');

    await formatFiles(tree);

    await runBashCommand('yarn add @capacitor/android @capacitor/ios', appPath);

    await runBashCommand('npx cap add android', appPath);

    await runBashCommand('npx cap add ios', appPath);

    await runBashCommand('npx cap sync', appPath);
  }
}
