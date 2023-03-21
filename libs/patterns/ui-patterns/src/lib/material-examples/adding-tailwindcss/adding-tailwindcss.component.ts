import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LinkComponent } from '@ngpat/material/link';
import {
  CodeHighlightModule,
  HowToLayoutModule
} from '@ngpat/shared/ui-design-library';

@Component({
  selector: 'pat-adding-tailwindcss',
  standalone: true,
  imports: [
    CommonModule,
    LinkComponent,
    HowToLayoutModule,
    CodeHighlightModule
  ],
  templateUrl: './adding-tailwindcss.component.html',
  styleUrls: ['./adding-tailwindcss.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddingTailwindcssComponent {
  install = `
    npm install tailwindcss

    # or

    yarn add tailwindcss

    `;

  globalConfig = `
const {colors} = require('../packages/material/src/lib/styles/tailwind.config');

/**
 * See https://github.com/tailwindlabs/tailwindcss/issues/1232#issuecomment-1111937404
 * to convert rem to px
 */
module.exports = {
  theme: {
    extend: {
      spacing: {
        sm: '0.5rem',
        md: '1rem',
        lg: '1.5rem',
        xl: '2rem'
      },
      colors: {
        ...colors
      }
    }
  },
  plugins: []
};
  `;

  tailwindConfigJs = `
const { createGlobPatternsForDependencies } = require('@nrwl/angular/tailwind');
const { join } = require('path');
const { merge } = require('lodash');

// Add Global Config
const sharedTailwindConfig = require('../../libs/tailwind-preset/tailwind.config');

console.log(process.cwd());

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

  `;
}
