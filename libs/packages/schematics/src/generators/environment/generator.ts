import {
  formatFiles,
  generateFiles,
  ProjectConfiguration,
  readProjectConfiguration,
  Tree
} from '@nx/devkit';
import * as path from 'path';
import { EnvironmentGeneratorSchema } from './schema';
import { names } from '@nx/workspace';
import { addTsExport } from '../utils/add-ts-exports';
import { addImportToTsModule } from '@ngpat/schematics/src/generators/utils/addToNgModule';

interface TemplateNames {
  name: string;
  className: string;
  propertyName: string;
  constantName: string;
  fileName: string;
  APP_NAME: string;
  appName: string;
  domain: string;
  template: string;
}

export default async function (
  tree: Tree,
  options: EnvironmentGeneratorSchema
) {
  const APP_NAME = options.appName.toUpperCase().replace('-', '_');

  // ADD TO DOMAIN
  // ADD TO DOMAIN
  const entitiesRoot = `libs/${options.domain}/domain/src/lib/entities`;

  const props: TemplateNames = {
    ...names(options.appName),
    APP_NAME,
    appName: options.appName,
    domain: options.domain,
    template: ''
  };

  generateFiles(tree, path.join(__dirname, 'entities'), entitiesRoot, props);

  addTsExport(tree, `libs/${options.domain}/domain/src/index.ts`, [
    `./lib/entities/${props.fileName}.environment.model`
  ]);

  // ADD ENVIRONMENTS
  const appConfig: ProjectConfiguration = readProjectConfiguration(
    tree,
    `${options.domain}-${options.appName}`
  );
  if (appConfig && appConfig.sourceRoot) {
    generateFiles(
      tree,
      path.join(__dirname, 'files'),
      appConfig.sourceRoot,
      props
    );

    // const importFiles = `
    // import { ${APP_NAME}_ENVIRONMENT } from '@${options.appName}/${options.domain}/domain';
    // import { environment } from '../environments/environment';
    // `;

    addImportToTsModule(tree, {
      filePath: `${appConfig.sourceRoot}/app/app.config.ts`,
      importClassName: `${APP_NAME}_ENVIRONMENT`,
      importPath: `@${options.domain}/domain`
    });

    addImportToTsModule(tree, {
      filePath: `${appConfig.sourceRoot}/app/app.config.ts`,
      importClassName: `environment`,
      importPath: `../environments/environment`
    });

    const providersToAdd = `
    ,{
      provide: ${APP_NAME}_ENVIRONMENT,
      useValue: environment
    }]
    `;
    // const appConfigFile = `${appConfig.sourceRoot}/app/app.config.ts`;

    const providers = tree.read(
      `${appConfig.sourceRoot}/app/app.config.ts`,
      'utf-8'
    );
    const updated = providers?.replace(']', providersToAdd);

    if (updated) {
      tree.write(`${appConfig.sourceRoot}/app/app.config.ts`, updated);
    }
  }

  await formatFiles(tree);
}
