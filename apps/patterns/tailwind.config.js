const {createGlobPatternsForDependencies} = require('@nrwl/angular/tailwind');
const {join} = require('path');
const sharedTailwindConfig = require('../../libs/tailwind-preset/tailwind.config');

/** @type {import('tailwindcss').Config} */
module.exports = {
  // presets: [sharedTailwindConfig],
  content: [
    join(__dirname, 'src/**/!(*.stories|*.spec).{ts,html}'),
    ...createGlobPatternsForDependencies(__dirname)
  ],
  ...sharedTailwindConfig
};
