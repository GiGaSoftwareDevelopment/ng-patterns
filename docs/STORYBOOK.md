# Storybook setup

- [@ng/storybook](https://nx.dev/packages/storybook#nxstorybook)
- [Nx Set up Storybook for Angular Projects](https://nx.dev/packages/storybook/documents/overview-angular)

To set up storybook for the entire repository, seeing all apps and libraries, run:

```bash
npx nx g @nx/storybook:configuration storybook-storybook --tsConfiguration=true --configureCypress=false --storybook7UiFramework=@storybook/angular
```

Edit `apps/storybook/storybook/.storybook/main.ts`

Change this:
```typescript
import type { StorybookConfig } from '@storybook/angular';

const config: StorybookConfig = {
  stories: ['../src/app/**/*.stories.@(js|jsx|ts|tsx|mdx)'],
  addons: ['@storybook/addon-essentials'],
  framework: {
    name: '@storybook/angular',
    options: {},
  },
};

export default config;

// To customize your webpack configuration you can use the webpackFinal field.
// Check https://storybook.js.org/docs/react/builders/webpack#extending-storybooks-webpack-config
// and https://nx.dev/packages/storybook/documents/custom-builder-configs


```
To:
```typescript

import type { StorybookConfig } from '@storybook/angular';

const config: StorybookConfig = {
  stories: [
    '../../../../apps/**/*.stories.@(js|jsx|ts|tsx|mdx)',
    '../../../../libs/**/*.stories.@(js|jsx|ts|tsx|mdx)',
  ],
  addons: ['@storybook/addon-essentials'],
  framework: {
    name: '@storybook/angular',
    options: {},
  },
};

export default config;

// To customize your webpack configuration you can use the webpackFinal field.
// Check https://storybook.js.org/docs/react/builders/webpack#extending-storybooks-webpack-config
// and https://nx.dev/packages/storybook/documents/custom-builder-configs



```


Edit `apps/storybook/storybook/.storybook/tsconfig.json`

Change
```json
{
  "extends": "../tsconfig.json",
  "compilerOptions": {
  "emitDecoratorMetadata": true
},

  "exclude": [
      "../**/*.spec.ts"
],
  "include": [
      "../src/**/*.stories.ts",
      "../src/**/*.stories.js",
      "../src/**/*.stories.jsx",
      "../src/**/*.stories.tsx",
      "../src/**/*.stories.mdx",
      "*.ts",
      "*.js"
  ] 
}
```

to

```json
{
  "extends": "../tsconfig.json",
  "compilerOptions": {
    "emitDecoratorMetadata": true
  },

  "exclude": [
    "../../../../apps/**/*.spec.ts",
    "../../../../apps/**/*.test.ts",
    "../../../../apps/**/jest.config.ts",
    "../../../../apps/**/tools/**/*",
    "../../../../apps/**/*.mock.ts",
    "../../../../libs/**/*.spec.ts",
    "../../../../libs/**/*.test.ts",
    "../../../../libs/**/jest.config.ts",
    "../../../../libs/**/tools/**/*",
    "../../../../libs/**/*.mock.ts"
  ],
  "include": [
    "../../../../apps/**/*.stories.ts",
    "../../../../apps/**/*.stories.js",
    "../../../../apps/**/*.stories.jsx",
    "../../../../apps/**/*.stories.tsx",
    "../../../../apps/**/*.stories.mdx",
    "../../../../libs/**/*.stories.ts",
    "../../../../libs/**/*.stories.js",
    "../../../../libs/**/*.stories.jsx",
    "../../../../libs/**/*.stories.tsx",
    "../../../../libs/**/*.stories.mdx",
    "*.ts",
    "*.js"
  ]
}

```

The above edits are automated in the `@ngpat/schematic:update-storybook-global`:
```angular2html
npx nx generate @ngpat/schematics:update-storybook-global --projectName=storybook-storybook
```
