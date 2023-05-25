export function createBuildAppConfigurations(appDirectoryPath: string) {
  return {
    development: {
      optimization: false,
      extractLicenses: false,
      inspect: false,
      version: false
    },
    'production-pc': {
      fileReplacements: [
        {
          replace: `${appDirectoryPath}/src/environments/environment.ts`,
          with: `${appDirectoryPath}/src/environments/environment.production.ts`
        },
        {
          replace: `${appDirectoryPath}/src/environments/platform.ts`,
          with: `${appDirectoryPath}/src/environments/platform.pc.ts`
        }
      ]
    },
    'production-mac-m1': {
      fileReplacements: [
        {
          replace: `${appDirectoryPath}/src/environments/environment.ts`,
          with: `${appDirectoryPath}/src/environments/environment.production.ts`
        },
        {
          replace: `${appDirectoryPath}/src/environments/platform.ts`,
          with: `${appDirectoryPath}/src/environments/platform.mac.m1.ts`
        }
      ]
    },
    'production-mac-intel': {
      fileReplacements: [
        {
          replace: `${appDirectoryPath}/src/environments/environment.ts`,
          with: `${appDirectoryPath}/src/environments/environment.production.ts`
        },
        {
          replace: `${appDirectoryPath}/src/environments/platform.ts`,
          with: `${appDirectoryPath}/src/environments/platform.mac.intel.ts`
        }
      ]
    },
    'production-linux': {
      fileReplacements: [
        {
          replace: `${appDirectoryPath}/src/environments/environment.ts`,
          with: `${appDirectoryPath}/src/environments/environment.production.ts`
        },
        {
          replace: `${appDirectoryPath}/src/environments/platform.ts`,
          with: `${appDirectoryPath}/src/environments/platform.linux.ts`
        }
      ]
    },
    'uat-pc': {
      fileReplacements: [
        {
          replace: `${appDirectoryPath}/src/environments/environment.ts`,
          with: `${appDirectoryPath}/src/environments/environment.uat.ts`
        },
        {
          replace: `${appDirectoryPath}/src/environments/platform.ts`,
          with: `${appDirectoryPath}/src/environments/platform.pc.ts`
        }
      ]
    },
    'uat-mac-m1': {
      fileReplacements: [
        {
          replace: `${appDirectoryPath}/src/environments/environment.ts`,
          with: `${appDirectoryPath}/src/environments/environment.uat.ts`
        },
        {
          replace: `${appDirectoryPath}/src/environments/platform.ts`,
          with: `${appDirectoryPath}/src/environments/platform.mac.m1.ts`
        }
      ]
    },
    'uat-mac-intel': {
      fileReplacements: [
        {
          replace: `${appDirectoryPath}/src/environments/environment.ts`,
          with: `${appDirectoryPath}/src/environments/environment.uat.ts`
        },
        {
          replace: `${appDirectoryPath}/src/environments/platform.ts`,
          with: `${appDirectoryPath}/src/environments/platform.mac.intel.ts`
        }
      ]
    },
    'uat-linux': {
      fileReplacements: [
        {
          replace: `${appDirectoryPath}/src/environments/environment.ts`,
          with: `${appDirectoryPath}/src/environments/environment.uat.ts`
        },
        {
          replace: `${appDirectoryPath}/src/environments/platform.ts`,
          with: `${appDirectoryPath}/src/environments/platform.linux.ts`
        }
      ]
    },
    'qa-pc': {
      fileReplacements: [
        {
          replace: `${appDirectoryPath}/src/environments/environment.ts`,
          with: `${appDirectoryPath}/src/environments/environment.qa.ts`
        },
        {
          replace: `${appDirectoryPath}/src/environments/platform.ts`,
          with: `${appDirectoryPath}/src/environments/platform.pc.ts`
        }
      ]
    },
    'qa-mac-m1': {
      fileReplacements: [
        {
          replace: `${appDirectoryPath}/src/environments/environment.ts`,
          with: `${appDirectoryPath}/src/environments/environment.qa.ts`
        },
        {
          replace: `${appDirectoryPath}/src/environments/platform.ts`,
          with: `${appDirectoryPath}/src/environments/platform.mac.m1.ts`
        }
      ]
    },
    'qa-mac-intel': {
      fileReplacements: [
        {
          replace: `${appDirectoryPath}/src/environments/environment.ts`,
          with: `${appDirectoryPath}/src/environments/environment.qa.ts`
        },
        {
          replace: `${appDirectoryPath}/src/environments/platform.ts`,
          with: `${appDirectoryPath}/src/environments/platform.mac.intel.ts`
        }
      ]
    },
    'qa-linux': {
      fileReplacements: [
        {
          replace: `${appDirectoryPath}/src/environments/environment.ts`,
          with: `${appDirectoryPath}/src/environments/environment.qa.ts`
        },
        {
          replace: `${appDirectoryPath}/src/environments/platform.ts`,
          with: `${appDirectoryPath}/src/environments/platform.linux.ts`
        }
      ]
    },
    'dev-pc': {
      fileReplacements: [
        {
          replace: `${appDirectoryPath}/src/environments/platform.ts`,
          with: `${appDirectoryPath}/src/environments/platform.pc.ts`
        }
      ]
    },
    'dev-mac-m1': {
      fileReplacements: [
        {
          replace: `${appDirectoryPath}/src/environments/platform.ts`,
          with: `${appDirectoryPath}/src/environments/platform.mac.m1.ts`
        }
      ]
    },
    'dev-mac-intel': {
      fileReplacements: [
        {
          replace: `${appDirectoryPath}/src/environments/platform.ts`,
          with: `${appDirectoryPath}/src/environments/platform.mac.intel.ts`
        }
      ]
    },
    'dev-linux': {
      fileReplacements: [
        {
          replace: `${appDirectoryPath}/src/environments/platform.ts`,
          with: `${appDirectoryPath}/src/environments/platform.linux.ts`
        }
      ]
    },
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
    }
  };
}

export function createBuildTarget(
  projectName: string,
  appDirectoryPath: string
) {
  return {
    executor: 'nx:run-commands',
    configurations: {
      development: {
        commands: [
          `npx nx run ${projectName}build-app:development`,
          `cp ${appDirectoryPath}/src/preload.js ${appDirectoryPath}/dist/preload.js`
        ],
        parallel: false
      },
      'production-pc': {
        executor: `nx:run-commands`,
        options: {
          commands: [
            `npx nx run ${projectName}build-app:production-pc`,
            `cp ${appDirectoryPath}/src/preload.js ${appDirectoryPath}/dist/preload.js`
          ],
          parallel: false
        }
      },
      'production-mac-intel': {
        commands: [
          `npx nx run ${projectName}build-app:production-mac-intel`,
          `cp ${appDirectoryPath}/src/preload.js ${appDirectoryPath}/dist/preload.js`
        ],
        parallel: false
      },
      'production-linux': {
        commands: [
          `npx nx run ${projectName}build-app:production-linux`,
          `cp ${appDirectoryPath}/src/preload.js ${appDirectoryPath}/dist/preload.js`
        ],
        parallel: false
      },
      'uat-pc': {
        commands: [
          `npx nx run ${projectName}build-app:uat-pc`,
          `cp ${appDirectoryPath}/src/preload.js ${appDirectoryPath}/dist/preload.js`
        ],
        parallel: false
      },
      'uat-mac-m1': {
        commands: [
          `npx nx run ${projectName}build-app:uat-mac-m1`,
          `cp ${appDirectoryPath}/src/preload.js ${appDirectoryPath}/dist/preload.js`
        ],
        parallel: false
      },
      'uat-mac-intel': {
        commands: [
          `npx nx run ${projectName}build-app:uat-mac-intel`,
          `cp ${appDirectoryPath}/src/preload.js ${appDirectoryPath}/dist/preload.js`
        ],
        parallel: false
      },
      'uat-linux': {
        commands: [
          `npx nx run ${projectName}build-app:uat-linux`,
          `cp ${appDirectoryPath}/src/preload.js ${appDirectoryPath}/dist/preload.js`
        ],
        parallel: false
      },
      'qa-pc': {
        commands: [
          `npx nx run ${projectName}build-app:qa-pc`,
          `cp ${appDirectoryPath}/src/preload.js ${appDirectoryPath}/dist/preload.js`
        ],
        parallel: false
      },
      'qa-mac-m1': {
        commands: [
          `npx nx run ${projectName}build-app:qa-mac-m1`,
          `cp ${appDirectoryPath}/src/preload.js ${appDirectoryPath}/dist/preload.js`
        ],
        parallel: false
      },
      'qa-mac-intel': {
        commands: [
          `npx nx run ${projectName}build-app:qa-mac-intel`,
          `cp ${appDirectoryPath}/src/preload.js ${appDirectoryPath}/dist/preload.js`
        ],
        parallel: false
      },
      'qa-linux': {
        commands: [
          `npx nx run ${projectName}build-app:qa-linux`,
          `cp ${appDirectoryPath}/src/preload.js ${appDirectoryPath}/dist/preload.js`
        ],
        parallel: false
      },
      'dev-pc': {
        commands: [
          `npx nx run ${projectName}build-app:dev-pc`,
          `cp ${appDirectoryPath}/src/preload.js ${appDirectoryPath}/dist/preload.js`
        ],
        parallel: false
      },
      'dev-mac-m1': {
        commands: [
          `npx nx run ${projectName}build-app:dev-mac-m1`,
          `cp ${appDirectoryPath}/src/preload.js ${appDirectoryPath}/dist/preload.js`
        ],
        parallel: false
      },
      'dev-mac-intel': {
        commands: [
          `npx nx run ${projectName}build-app:dev-mac-intel`,
          `cp ${appDirectoryPath}/src/preload.js ${appDirectoryPath}/dist/preload.js`
        ],
        parallel: false
      },
      'dev-linux': {
        commands: [
          `npx nx run ${projectName}build-app:dev-linux`,
          `cp ${appDirectoryPath}/src/preload.js ${appDirectoryPath}/dist/preload.js`
        ],
        parallel: false
      }
    }
  };
}

export function createServeTarget(
  projectName: string,
  appDirectoryPath: string
) {
  return {
    executor: 'nx:run-commands',
    configurations: {
      development: {
        commands: [
          `npx nx run ${projectName}:build:development`,
          `cd ${appDirectoryPath} && electron dist/main.js`
        ],
        parallel: false
      },
      'production-pc': {
        executor: `nx:run-commands`,
        options: {
          commands: [
            `npx nx run ${projectName}:build:production-pc`,
            `cd ${appDirectoryPath} && electron dist/main.js`
          ],
          parallel: false
        }
      },
      'production-mac-intel': {
        commands: [
          `npx nx run ${projectName}:build:production-mac-intel`,
          `cd ${appDirectoryPath} && electron dist/main.js`
        ],
        parallel: false
      },
      'production-linux': {
        commands: [
          `npx nx run ${projectName}:build:production-linux`,
          `cd ${appDirectoryPath} && electron dist/main.js`
        ],
        parallel: false
      },
      'uat-pc': {
        commands: [
          `npx nx run ${projectName}:build:uat-pc`,
          `cd ${appDirectoryPath} && electron dist/main.js`
        ],
        parallel: false
      },
      'uat-mac-m1': {
        commands: [
          `npx nx run ${projectName}:build:uat-mac-m1`,
          `cd ${appDirectoryPath} && electron dist/main.js`
        ],
        parallel: false
      },
      'uat-mac-intel': {
        commands: [
          `npx nx run ${projectName}:build:uat-mac-intel`,
          `cd ${appDirectoryPath} && electron dist/main.js`
        ],
        parallel: false
      },
      'uat-linux': {
        commands: [
          `npx nx run ${projectName}:build:uat-linux`,
          `cd ${appDirectoryPath} && electron dist/main.js`
        ],
        parallel: false
      },
      'qa-pc': {
        commands: [
          `npx nx run ${projectName}:build:qa-pc`,
          `cd ${appDirectoryPath} && electron dist/main.js`
        ],
        parallel: false
      },
      'qa-mac-m1': {
        commands: [
          `npx nx run ${projectName}:build:qa-mac-m1`,
          `cd ${appDirectoryPath} && electron dist/main.js`
        ],
        parallel: false
      },
      'qa-mac-intel': {
        commands: [
          `npx nx run ${projectName}:build:qa-mac-intel`,
          `cd ${appDirectoryPath} && electron dist/main.js`
        ],
        parallel: false
      },
      'qa-linux': {
        commands: [
          `npx nx run ${projectName}:build:qa-linux`,
          `cd ${appDirectoryPath} && electron dist/main.js`
        ],
        parallel: false
      },
      'dev-pc': {
        commands: [
          `npx nx run ${projectName}:build:dev-pc`,
          `cd ${appDirectoryPath} && electron dist/main.js`
        ],
        parallel: false
      },
      'dev-mac-m1': {
        commands: [
          `npx nx run ${projectName}:build:dev-mac-m1`,
          `cd ${appDirectoryPath} && electron dist/main.js`
        ],
        parallel: false
      },
      'dev-mac-intel': {
        commands: [
          `npx nx run ${projectName}:build:dev-mac-intel`,
          `cd ${appDirectoryPath} && electron dist/main.js`
        ],
        parallel: false
      },
      'dev-linux': {
        commands: [
          `npx nx run ${projectName}:build:dev-linux`,
          `cd ${appDirectoryPath} && electron dist/main.js`
        ],
        parallel: false
      }
    }
  };
}
