import {Directive} from '@angular/core';

@Directive({
  standalone: true,
  selector: `ng-pat-bullet-chart-description, [ng-pat-bullet-chart-description], [ngPatBulletChartDescription]`,
  host: {
    class:
      'mat-caption ng-pat-bullet-chart-description g-ng-pat-chart-description'
  }
})
export class NgPatBulletChartDescriptionDirective {}
