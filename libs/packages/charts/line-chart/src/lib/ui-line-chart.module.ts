import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UiLineChartComponent} from './ui-line-chart.component';
import {NgPatResizeObserverDirective} from '@ngpat/charts';

@NgModule({
  declarations: [UiLineChartComponent],
  exports: [UiLineChartComponent],
  imports: [CommonModule, NgPatResizeObserverDirective]
})
export class UiLineChartModule {}
