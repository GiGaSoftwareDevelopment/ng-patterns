const {createGlobPatternsForDependencies} = require('@nrwl/angular/tailwind');
const {join} = require('path');
const {merge} = require('lodash');
const sharedTailwindConfig = require('../../libs/tailwind-preset/tailwind.config');

/** @type {import('tailwindcss').Config} */
module.exports = merge(sharedTailwindConfig, {
  content: [
    join(__dirname, 'src/**/!(*.stories|*.spec).{ts,html}'),
    ...createGlobPatternsForDependencies(__dirname)
  ],
  theme: {
    extend: {}
  },
  plugins: []
});
