import {Directive} from '@angular/core';

@Directive({
  selector: `uiux-bullet-chart-description, [uiux-bullet-chart-description], [uiuxBulletChartDescription]`,
  // eslint-disable-next-line @angular-eslint/no-host-metadata-property
  host: {
    class: 'mat-caption uiux-bullet-chart-description'
  }
})
export class BulletChartDescriptionDirective {}
