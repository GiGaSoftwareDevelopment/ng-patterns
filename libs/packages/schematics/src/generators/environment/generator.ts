import {
  formatFiles,
  generateFiles,
  ProjectConfiguration,
  readProjectConfiguration,
  Tree,
  updateProjectConfiguration
} from '@nx/devkit';
import * as path from 'path';
import { EnvironmentGeneratorSchema } from './schema';
import { names } from '@nx/workspace';
import { addTsExport } from '../utils/add-ts-exports';
import { addImportToTsModule } from '../utils/addToNgModule';
import { updateBuildConfigs, updateServeConfigs } from './configs';

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

  const projectName = `${options.domain}-${options.appName}`;
  // ADD ENVIRONMENTS
  const projectConfig: ProjectConfiguration = readProjectConfiguration(
    tree,
    projectName
  );
  if (projectConfig && projectConfig.sourceRoot) {
    generateFiles(
      tree,
      path.join(__dirname, 'files'),
      projectConfig.sourceRoot,
      props
    );

    // const importFiles = `
    // import { ${APP_NAME}_ENVIRONMENT } from '@${options.appName}/${options.domain}/domain';
    // import { environment } from '../environments/environment';
    // `;

    addImportToTsModule(tree, {
      filePath: `${projectConfig.sourceRoot}/app/app.config.ts`,
      importClassName: `${APP_NAME}_ENVIRONMENT`,
      importPath: `@${options.domain}/domain`
    });

    addImportToTsModule(tree, {
      filePath: `${projectConfig.sourceRoot}/app/app.config.ts`,
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
      `${projectConfig.sourceRoot}/app/app.config.ts`,
      'utf-8'
    );
    const updated = providers?.replace(']', providersToAdd);

    if (updated) {
      tree.write(`${projectConfig.sourceRoot}/app/app.config.ts`, updated);
    }

    // Update project.json
    const buildConfigs = updateBuildConfigs(options.appName, options.domain);

    if (
      projectConfig &&
      projectConfig.targets &&
      projectConfig.targets['build'] &&
      projectConfig.targets['build']['configurations'] &&
      projectConfig.targets['build']['configurations']['production']
    ) {
      Object.assign(
        projectConfig.targets['build']['configurations']['production'],
        buildConfigs.production
      );
      projectConfig.targets['build']['configurations']['qa'] = buildConfigs.qa;
      projectConfig.targets['build']['configurations']['uat'] =
        buildConfigs.uat;
    }

    const serveConfigs = updateServeConfigs(options.appName, options.domain);

    if (
      projectConfig &&
      projectConfig.targets &&
      projectConfig.targets['serve'] &&
      projectConfig.targets['serve']['configurations']
    ) {
      Object.assign(
        projectConfig.targets['serve']['configurations'],
        serveConfigs
      );
    }

    updateProjectConfiguration(tree, projectName, projectConfig);
  }

  await formatFiles(tree);
}
