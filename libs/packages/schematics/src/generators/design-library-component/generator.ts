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
import { addTsExport } from '@ngpat/schematics/src/generators/utils/add-ts-exports';

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
  const projectConfig = readProjectConfiguration(tree, schema.projectName);

  const options = {
    ...normalizeOptions(schema),
    ...names(schema.name),
    prefix: schema.prefix && schema.prefix.length ? `${schema.prefix}` : ``,
    tmpl: ''
  };

  generateFiles(
    tree, // the virtual file system
    joinPathFragments(__dirname, './files'), // path to the file templates
    getPath(projectConfig, options), // destination path of the files
    options // config object to replace variable in file templates
  );

  if (projectConfig && projectConfig.sourceRoot) {
    const relativeLibPath = schema.path.replace(
      `${projectConfig.sourceRoot}/`,
      ''
    );
    addTsExport(tree, `${projectConfig.sourceRoot}/index.ts`, [
      `./${relativeLibPath}/${options.fileName}/${options.fileName}.component`
    ]);
  }

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
