import {OperatorFunction, ReplaySubject} from 'rxjs';
import {
  NgPatElSizeConfigDimensions,
  NgPatElSizeConfigDimensionsData,
  NgPatSizeConfigDimensions
} from './chart.models';
import {map} from 'rxjs/operators';
import {select} from 'd3-selection';
import {resizeBaseLayout} from './fns/chart.fns';

export abstract class AbstractChartLayout<ChartConfig, ChartData, TooltipData> {
  toolTipData$: ReplaySubject<TooltipData> = new ReplaySubject<TooltipData>(1);
  showTooltipHover$: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);

  abstract appendLayout(): OperatorFunction<HTMLElement, HTMLElement>;

  /**
   * Resize layout based on data, if needed.
   *
   * @param el
   * @param config
   * @param size
   * @param dimensions
   */
  abstract resizeDataLayout({
    el,
    config,
    size,
    dimensions
  }: NgPatElSizeConfigDimensions): any;

  abstract applyData(d: NgPatElSizeConfigDimensionsData<ChartData>): void;

  static CreateBaseLayoutMap() {
    return map((el: HTMLElement) => {
      const wrapper = select(el).append('svg').classed('wrapper', true);
      wrapper.append('g').classed('bounds', true);

      return el;
    });
  }

  static ResizeBaseLayoutMap(el: HTMLElement) {
    return map((config: NgPatSizeConfigDimensions) =>
      resizeBaseLayout(el, config)
    );
  }
}
