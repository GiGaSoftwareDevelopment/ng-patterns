import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BulletChartComponent } from './bullet-chart.component';
import { UiResizeObserverModule } from '@uiux/charts';
import { LetModule, PushModule } from '@ngrx/component';
import { BulletChartTitleDirective } from './bullet-chart-title.directive';
import { BulletChartDescriptionDirective } from './bullet-chart-description.directive';
import { BulletChartTooltipComponent } from './bullet-chart-tooltip.component';

@NgModule({
  declarations: [
    BulletChartComponent,
    BulletChartTitleDirective,
    BulletChartDescriptionDirective,
    BulletChartTooltipComponent
  ],
  imports: [CommonModule, UiResizeObserverModule, LetModule, PushModule],
  exports: [
    BulletChartComponent,
    BulletChartTitleDirective,
    BulletChartDescriptionDirective,
    BulletChartTooltipComponent
  ]
})
export class UiBulletChartModule {}
