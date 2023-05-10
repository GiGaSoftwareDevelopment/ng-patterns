import { addDependenciesToPackageJson, Tree } from '@nx/devkit';
import * as getLatestVersion from 'get-latest-version';

export async function addLatestVersionToPackageJson(
  tree: Tree,
  framework: string,
  isDev = true
) {
  const latestVersion: string | undefined = await getLatestVersion('@nx/node');

  if (latestVersion) {
    if (isDev) {
      await addDependenciesToPackageJson(
        tree,
        {},
        {
          [framework]: latestVersion
        }
      );
    } else {
      await addDependenciesToPackageJson(
        tree,
        {
          [framework]: latestVersion
        },
        {}
      );
    }
  }

  return Promise.resolve();
}
