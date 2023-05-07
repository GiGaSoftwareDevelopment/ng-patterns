import { Tree, readNxJson } from '@nx/devkit';

export function getWorkspaceScope(tree: Tree) {
  const wsConfig = readNxJson(tree);
  const workspaceName = `@${wsConfig?.npmScope}`;
  return workspaceName;
}
