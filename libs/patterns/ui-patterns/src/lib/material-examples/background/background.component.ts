import {ChangeDetectionStrategy, Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import { LinkComponent } from '@ngpat/material/link';
import { HighlightModule } from 'ngx-highlightjs';

@Component({
  selector: 'pat-background',
  standalone: true,
  imports: [ CommonModule, LinkComponent, HighlightModule ],
  templateUrl: './background.component.html',
  styleUrls: ['./background.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'sample-page-layout'
  }
})
export class BackgroundComponent {

  install =
    `
    npm install @giga/material

    # or

    yarn add @giga/material

    `

  backgroundConfig = `
@use "@giga/material" as giga;

$theme: giga.override-dark-theme-background(
    $default-dark-theme,
    map-get($default-dark-theme, primary),
    -12%, // $lightness
    -20%  // $saturation
);
  `
params = `override-dark-theme-background($theme-object, $palette, $lightness, $saturation)`

  entireConfig = `
@use "@angular/material" as mat;
@use "@giga/material" as giga;

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

$theme: giga.override-dark-theme-background(
    $default-dark-theme,
    map-get($default-dark-theme, primary),
    -12%, // $lightness
    -20%  // $saturation
);

@include mat.all-component-typographies($default-typography);
@include mat.all-component-themes($theme);
  `

}
