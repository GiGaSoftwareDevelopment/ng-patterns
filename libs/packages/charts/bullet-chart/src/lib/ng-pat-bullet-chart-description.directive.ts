import {Directive} from '@angular/core';

@Directive({
  standalone: true,
  selector: `ng-pat-bullet-chart-description, [ng-pat-bullet-chart-description], [ng-patBulletChartDescription]`,
  host: {
    class: 'mat-caption ng-pat-bullet-chart-description g-chart-description'
  }
})
export class NgPatBulletChartDescriptionDirective {}
