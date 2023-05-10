export function updateBuildConfigs(appDirectoryPath: string) {
  return {
    production: {
      optimization: true,
      extractLicenses: true,
      inspect: false,
      version: true,
      fileReplacements: [
        {
          replace: `${appDirectoryPath}/src/environments/environment.ts`,
          with: `${appDirectoryPath}/src/environments/environment.production.ts`
        }
      ]
    },
    uat: {
      optimization: true,
      extractLicenses: true,
      inspect: false,
      version: true,
      fileReplacements: [
        {
          replace: `${appDirectoryPath}/src/environments/environment.ts`,
          with: `${appDirectoryPath}/src/environments/environment.uat.ts`
        }
      ]
    },
    qa: {
      optimization: true,
      extractLicenses: true,
      inspect: false,
      version: true,
      fileReplacements: [
        {
          replace: `${appDirectoryPath}/src/environments/environment.ts`,
          with: `${appDirectoryPath}/src/environments/environment.qa.ts`
        }
      ]
    }
  };
}

export function updateServeConfigs(
  projectName: string,
  appDirectoryPath: string
) {
  return {
    production: {
      executor: 'nx:run-commands',
      options: {
        commands: [
          'rm -rf dist',
          `npx nx run ${projectName}:build:production`,
          `${appDirectoryPath}/src/node_modules/.bin/electron ${appDirectoryPath}/app/main.js`
        ],
        parallel: false
      }
    },
    uat: {
      executor: 'nx:run-commands',
      options: {
        commands: [
          'rm -rf dist',
          `npx nx run ${projectName}:build:uat`,
          `${appDirectoryPath}/src/node_modules/.bin/electron ${appDirectoryPath}/app/main.js`
        ],
        parallel: false
      }
    },
    qa: {
      executor: 'nx:run-commands',
      options: {
        commands: [
          'rm -rf dist',
          `npx nx run ${projectName}:build:qa`,
          `${appDirectoryPath}/src/node_modules/.bin/electron ${appDirectoryPath}/app/main.js`
        ],
        parallel: false
      }
    },
    development: {
      executor: 'nx:run-commands',
      options: {
        commands: [
          'rm -rf dist',
          `npx nx run ${projectName}:build:development`,
          `${appDirectoryPath}/src/node_modules/.bin/electron ${appDirectoryPath}/app/main.js`
        ],
        parallel: false
      }
    }
  };
}
