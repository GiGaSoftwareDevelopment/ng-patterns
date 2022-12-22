import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UiLineChartComponent} from './ui-line-chart.component';
import { UiResizeObserverModule } from '@uiux/charts';

@NgModule({
  declarations: [UiLineChartComponent],
  exports: [UiLineChartComponent],
  imports: [CommonModule, UiResizeObserverModule]
})
export class UiLineChartModule {}
