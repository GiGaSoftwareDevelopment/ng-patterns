import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BulletChartComponent } from './bullet-chart.component';
import { PushModule } from '@ngrx/component';
import { BulletChartTitleDirective } from './bullet-chart-title.directive';
import { BulletChartDescriptionDirective } from './bullet-chart-description.directive';
import { BulletChartTooltipComponent } from './bullet-chart-tooltip.component';
import { UiResizeObserverModule } from '@uiux/charts';

@NgModule({
  declarations: [
    BulletChartComponent,
    BulletChartTitleDirective,
    BulletChartDescriptionDirective,
    BulletChartTooltipComponent
  ],
  imports: [ CommonModule, UiResizeObserverModule, PushModule, UiResizeObserverModule ],
  exports: [
    BulletChartComponent,
    BulletChartTitleDirective,
    BulletChartDescriptionDirective,
    BulletChartTooltipComponent
  ]
})
export class UiBulletChartModule {}
