const { createGlobPatternsForDependencies } = require('@nrwl/angular/tailwind');
const { join } = require('path');
const { merge } = require('lodash');

// Add Global Config
const sharedTailwindConfig = require('../../libs/tailwind-preset/tailwind.config');

/**
 * Merge local config on to global config.
 * The local should override global similar
 * to CSS specificity.
 *
 * @type {import('tailwindcss').Config} */
module.exports = merge(sharedTailwindConfig, {
  content: [
    // App src directory
    join(__dirname, 'src/**/!(*.stories|*.spec).{ts,html}'),
    ...createGlobPatternsForDependencies(__dirname),

    // Include libraries
    join(
      __dirname,
      '../../libs/patterns/ui-patterns/src/**/!(*.stories|*.spec).{ts,html}'
    ),
    ...createGlobPatternsForDependencies(
      join(__dirname, '../../libs/patterns/ui-patterns/')
    )
  ],
  theme: {
    extend: {}
  },
  plugins: []
});
