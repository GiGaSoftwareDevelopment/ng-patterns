import {Directive} from '@angular/core';

@Directive({
  standalone: true,
  selector: `uiux-bullet-chart-title, [uiux-bullet-chart-title], [uiuxBulletChartTitle]`,
  host: {
    class: 'uiux-bullet-chart-title'
  }
})
export class UiuxBulletChartTitleDirective {}
