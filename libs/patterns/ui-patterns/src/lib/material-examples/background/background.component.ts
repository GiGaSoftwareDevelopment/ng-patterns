import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonLinkComponent } from '@ngpat/material/link';
import {
  CodeHighlightModule,
  HowToLayoutModule
} from '@ngpat/shared/ui-design-library';

@Component({
  selector: 'pat-background',
  standalone: true,
  imports: [
    CommonModule,
    ButtonLinkComponent,
    HowToLayoutModule,
    CodeHighlightModule
  ],
  templateUrl: './background.component.html',
  styleUrls: ['./background.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BackgroundComponent {
  install = `
    npm install @ngpat/material

    # or

    yarn add @ngpat/material

    `;

  backgroundConfig = `
@use "@ngpat/material" as ngpat;

$theme: ngpat.override-dark-theme-background(
    $default-dark-theme,
    map-get($default-dark-theme, primary),
    -12%, // $lightness
    -20%  // $saturation
);
  `;
  params =
    'override-dark-theme-background($theme-object, $palette, $lightness, $saturation)';

  entireConfig = `
@use "@angular/material" as mat;
@use "@ngpat/material" as ngpat;

@include mat.core();

$default-primary: mat.define-palette(mat.$teal-palette);
$default-accent: mat.define-palette(mat.$yellow-palette, A200, A100, A400);
$default-warn: mat.define-palette(mat.$deep-orange-palette);
$default-typography: mat.define-typography-config();
$default-light-theme: mat.define-light-theme(
    (
      color: (
        primary: $default-primary,
        accent: $default-accent,
        warn: $default-warn
      ),
      typography: $default-typography
    )
);
$default-dark-theme: mat.define-dark-theme(
    (
      color: (
        primary: $default-primary,
        accent: $default-accent,
        warn: $default-warn
      ),
      typography: $default-typography
    )
);

$theme: ngpat.override-dark-theme-background(
    $default-dark-theme,
    map-get($default-dark-theme, primary),
    -12%, // $lightness
    -20%  // $saturation
);

@include mat.all-component-typographies($default-typography);
@include mat.all-component-themes($theme);
  `;
}
