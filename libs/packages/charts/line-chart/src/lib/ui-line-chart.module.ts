import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UiLineChartComponent} from './ui-line-chart.component';
import { UiuxResizeObserverDirective } from '@ngpat/charts';

@NgModule({
  declarations: [UiLineChartComponent],
  exports: [UiLineChartComponent],
  imports: [CommonModule, UiuxResizeObserverDirective]
})
export class UiLineChartModule {}
