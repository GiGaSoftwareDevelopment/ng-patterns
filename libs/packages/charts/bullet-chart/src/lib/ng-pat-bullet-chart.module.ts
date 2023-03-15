import {NgModule} from '@angular/core';
import {NgPatResizeObserverDirective} from '@ngpat/charts';
import {NgPatBulletChartComponent} from './ng-pat-bullet-chart.component';
import {NgPatBulletChartTitleDirective} from './ng-pat-bullet-chart-title.directive';
import {NgPatBulletChartDescriptionDirective} from './ng-pat-bullet-chart-description.directive';
import {NgPatBulletChartTooltipComponent} from './ng-pat-bullet-chart-tooltip.component';

@NgModule({
  imports: [
    NgPatBulletChartComponent,
    NgPatBulletChartTitleDirective,
    NgPatBulletChartDescriptionDirective,
    NgPatBulletChartTooltipComponent,
    NgPatResizeObserverDirective
  ],
  exports: [
    NgPatBulletChartComponent,
    NgPatBulletChartTitleDirective,
    NgPatBulletChartDescriptionDirective,
    NgPatBulletChartTooltipComponent,
    NgPatResizeObserverDirective
  ]
})
export class NgPatBulletChartModule {}
