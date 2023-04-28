import {
  formatFiles,
  generateFiles,
  joinPathFragments,
  readProjectConfiguration,
  Tree
} from '@nx/devkit';
import { names } from '@nx/workspace';
import { normalize, sep } from 'path';
import {
  SchematicInput,
  DesignLibraryComponentGeneratorSchema
} from './schema';

/**
 *
 * @param root - ProjectConfiguration & NxJsonProjectConfiguration
 * @param options
 */
function getPath(
  root: any,
  options: DesignLibraryComponentGeneratorSchema
): string {
  let path = '';
  if (root.projectType === 'library') {
    path = `${root.sourceRoot}${sep}lib`;
  } else {
    // Is application
    path = `${root.sourceRoot}${sep}app`;
  }

  if (options.path && options.path.length > 0) {
    return normalize(`${options.path}${sep}${options.directory}`);
  } else {
    return normalize(`${path}${sep}${options.directory}`);
  }
}

export default async function (tree: Tree, schema: SchematicInput) {
  const options = {
    ...normalizeOptions(schema),
    ...names(schema.name),
    prefix: schema.prefix && schema.prefix.length ? `${schema.prefix}-` : ``,
    tmpl: ''
  };

  generateFiles(
    tree, // the virtual file system
    joinPathFragments(__dirname, './files'), // path to the file templates
    getPath(readProjectConfiguration(tree, schema.projectName), options), // destination path of the files
    options // config object to replace variable in file templates
  );
  await formatFiles(tree);
  return () => {
    console.log('done');
  };
}

/**
 * Extract the parent 'directory' for the specified
 */
function normalizeOptions(
  options: SchematicInput
): DesignLibraryComponentGeneratorSchema {
  return {
    ...options,
    // propertyName: toPropertyName(options.name),
    directory: names(options.name).fileName
  };
}
