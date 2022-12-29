import {Directive} from '@angular/core';

@Directive({
  standalone: true,
  selector: `uiux-bullet-chart-description, [uiux-bullet-chart-description], [uiuxBulletChartDescription]`,
  host: {
    class: 'mat-caption uiux-bullet-chart-description g-chart-description'
  }
})
export class UiuxBulletChartDescriptionDirective {}
