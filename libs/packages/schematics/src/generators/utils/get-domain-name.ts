import {
  ProjectConfiguration,
  readProjectConfiguration,
  Tree
} from '@nx/devkit';

export function getDomainName(tree: Tree, projectName: string): string {
  const projectConfig: ProjectConfiguration = readProjectConfiguration(
    tree,
    projectName
  );

  if (projectConfig.tags && projectConfig.tags.length) {
    return projectConfig.tags.reduce((domainName: string, tag: string) => {
      if (domainName.length === 0) {
        if (tag.includes('domain:')) {
          const domainCandidate = tag.replace('domain:', '');
          if (projectConfig.sourceRoot?.includes(domainCandidate)) {
            return domainCandidate;
          }
        }
      }

      return domainName;
    }, '');
  }

  if (projectConfig.sourceRoot) {
    const directories = projectConfig.sourceRoot.split('/');

    /**
     * Domain name will be
     * ['apps', 'domain-name', ... ]
     * or
     * ['libs', 'domain-name', ... ]
     */
    return directories[1];
  }

  return '';
}
