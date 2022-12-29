import { NgModule } from '@angular/core';
import {
  UiuxBulletChartComponent,
  UiuxBulletChartDescriptionDirective,
  UiuxBulletChartTitleDirective,
  UiuxBulletChartTooltipComponent
} from '@uiux/charts/bullet-chart';
import { UiuxResizeObserverDirective } from '@uiux/charts';


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
