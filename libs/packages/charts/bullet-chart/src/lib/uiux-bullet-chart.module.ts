import { NgModule } from '@angular/core';
import { UiuxResizeObserverDirective } from '@uiux/charts';
import { UiuxBulletChartComponent } from './uiux-bullet-chart.component';
import { UiuxBulletChartTitleDirective } from './uiux-bullet-chart-title.directive';
import { UiuxBulletChartDescriptionDirective } from './uiux-bullet-chart-description.directive';
import { UiuxBulletChartTooltipComponent } from './uiux-bullet-chart-tooltip.component';


@NgModule({
  imports: [
    UiuxBulletChartComponent,
    UiuxBulletChartTitleDirective,
    UiuxBulletChartDescriptionDirective,
    UiuxBulletChartTooltipComponent,
    UiuxResizeObserverDirective,
  ],
  exports: [
    UiuxBulletChartComponent,
    UiuxBulletChartTitleDirective,
    UiuxBulletChartDescriptionDirective,
    UiuxBulletChartTooltipComponent,
    UiuxResizeObserverDirective,
  ],

})
export class UiuxBulletChartModule { }
