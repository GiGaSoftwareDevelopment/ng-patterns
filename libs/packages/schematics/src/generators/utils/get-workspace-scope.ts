import { Tree, readNxJson } from '@nx/devkit';

export function getWorkspaceScope(tree: Tree) {
  const wsConfig = readNxJson(tree);
  const workspaceName = `@${(<any>wsConfig)?.npmScope}`;
  return workspaceName;
}
