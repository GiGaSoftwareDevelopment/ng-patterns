import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonLinkComponent } from '@ngpat/material/link';
import {
  CodeHighlightModule,
  HowToLayoutModule
} from '@ngpat/shared/ui-design-library';

@Component({
  selector: 'pat-adding-tailwindcss',
  standalone: true,
  imports: [
    CommonModule,
    ButtonLinkComponent,
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

  appStyles = `
// Custom Theming for Angular Material
// For more information: https://material.angular.io/guide/theming
@use "@angular/material" as mat;


// To keep Tailwind from overriding material styles,
// Tailwind needs to come after @use, @import, @forward, etc,
// and before material configurations and global styles.
@tailwind base;
@tailwind components;
@tailwind utilities;

// Add Tailwind global styles
@layer components {
  pre:not(.inline) code {
    @apply rounded-lg border-slate-600 border border-solid;
  }
}

// Include the common styles for Angular Material. We include this here so that you only
// have to load a single css file for Angular Material in your app.
// Be sure that you only ever include this mixin once!
@include mat.core();

// configure material...
  `;

  fixMaterial = `

/* You can add global styles to this file, and also import other style files */

.mat-mdc-form-field.mat-focused {
  .mat-mdc-text-field-wrapper.mdc-text-field--focused {
    .mdc-notched-outline .mdc-notched-outline__notch {
      border-right-width: 0;
    }
  }
}

  `;
}
