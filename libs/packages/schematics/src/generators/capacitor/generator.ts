import {
  formatFiles,
  generateFiles,
  joinPathFragments,
  ProjectConfiguration,
  readProjectConfiguration,
  Tree
} from '@nx/devkit';
import { AddCapacitorAppGeneratorSchema } from './schema';
import { getDomainName } from '../utils/get-domain-name';
import { runBashCommand } from '../utils/run-bash-command';
import * as getLatestVersion from 'get-latest-version';
import { names } from '@nx/workspace';

export default async function (
  tree: Tree,
  options: AddCapacitorAppGeneratorSchema
) {
  const projectConfig: ProjectConfiguration = readProjectConfiguration(
    tree,
    options.projectName
  );

  const domainName: string = getDomainName(tree, options.projectName);

  if (projectConfig.name && domainName.length) {
    const appName: string = projectConfig.name.replace(`${domainName}-`, '');

    const appPath = `apps/${domainName}/${appName}-mobile`;

    await runBashCommand(`mkdir ${appPath}`, '');

    await runBashCommand('npm init -y', appPath);

    await runBashCommand('npm i @capacitor/core', appPath);

    await runBashCommand('npm i -D @capacitor/cli', appPath);

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

    await formatFiles(tree);

    await runBashCommand('npm i @capacitor/android @capacitor/ios', appPath);

    await runBashCommand('npx cap add android', appPath);

    await runBashCommand('npx cap add ios', appPath);

    await runBashCommand('npx cap sync', appPath);
  }
}
