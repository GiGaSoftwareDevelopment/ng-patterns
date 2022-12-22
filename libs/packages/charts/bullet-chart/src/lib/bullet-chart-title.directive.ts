import {Directive} from '@angular/core';

@Directive({
  selector: `uiux-bullet-chart-title, [uiux-bullet-chart-title], [uiuxBulletChartTitle]`,
  host: {
    class: 'uiux-bullet-chart-title mat-h3'
  }
})
export class BulletChartTitleDirective {}
