import {Directive} from '@angular/core';

@Directive({
  standalone: true,
  selector: `ng-pat-bullet-chart-title, [ng-pat-bullet-chart-title], [ng-patBulletChartTitle]`,
  host: {
    class: 'ng-pat-bullet-chart-title'
  }
})
export class NgPatBulletChartTitleDirective {}
