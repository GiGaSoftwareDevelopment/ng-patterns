export function updateBuildConfigs(appName: string, domain: string) {
  return {
    production: {
      fileReplacements: [
        {
          replace: `apps/${domain}/${appName}/src/environments/environment.ts`,
          with: `apps/${domain}/${appName}/src/environments/environment.production.ts`
        }
      ]
    },
    uat: {
      budgets: [
        {
          type: 'initial',
          maximumWarning: '5mb',
          maximumError: '8mb'
        },
        {
          type: 'anyComponentStyle',
          maximumWarning: '1mb',
          maximumError: '2mb'
        }
      ],
      fileReplacements: [
        {
          replace: `apps/${domain}/${appName}/src/environments/environment.ts`,
          with: `apps/${domain}/${appName}/src/environments/environment.uat.ts`
        }
      ],
      outputHashing: 'all'
    },
    qa: {
      budgets: [
        {
          type: 'initial',
          maximumWarning: '5mb',
          maximumError: '8mb'
        },
        {
          type: 'anyComponentStyle',
          maximumWarning: '1mb',
          maximumError: '2mb'
        }
      ],
      fileReplacements: [
        {
          replace: `apps/${domain}/${appName}/src/environments/environment.ts`,
          with: `apps/${domain}/${appName}/src/environments/environment.qa.ts`
        }
      ],
      outputHashing: 'all'
    }
  };
}

export function updateServeConfigs(appName: string, domain: string) {
  return {
    uat: {
      browserTarget: `${domain}-${appName}:build:uat`
    },
    qa: {
      browserTarget: `${domain}-${appName}:build:qa`
    }
  };
}
