import { Tree } from '@nx/devkit';

export function fileContains(
  tree: Tree,
  appModulePath: string,
  subStr: string
) {
  const filePath = tree.read(appModulePath);

  if (filePath) {
    return filePath.toString('utf-8').indexOf(subStr) !== -1;
  }

  return false;
}
