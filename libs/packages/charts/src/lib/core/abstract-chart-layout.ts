import {ReplaySubject} from 'rxjs';
import {
  ElSizeConfigDimensions,
  ElSizeConfigDimensionsData,
  SizeConfigDimensions
} from './chart.models';
import {map} from 'rxjs/operators';
import {select} from 'd3-selection';

export abstract class AbstractChartLayout<ChartConfig, ChartData, TooltipData> {
  toolTipData$: ReplaySubject<TooltipData> = new ReplaySubject<TooltipData>(1);
  showTooltipHover$: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);

  abstract appendLayout(): any;

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
  }: ElSizeConfigDimensions): any;

  abstract applyData(d: ElSizeConfigDimensionsData<ChartData>): void;

  static CreateBaseLayout() {
    return map((el: HTMLElement) => {
      const wrapper = select(el).append('svg').classed('wrapper', true);
      wrapper.append('g').classed('bounds', true);

      return el;
    });
  }

  static ResizeBaseLayout(el: HTMLElement) {
    return map(({size, config, dimensions}: SizeConfigDimensions) => {
      const root = select(el).select('.wrapper');
      root
        .attr('width', dimensions.width ? dimensions.width : 0)
        .attr('height', dimensions.height ? dimensions.height : 0);
      root
        .select('.bounds')
        .attr(
          'transform',
          `translate(${dimensions.margin.left}, ${dimensions.margin.top})`
        );

      return <ElSizeConfigDimensions>{
        el,
        size,
        config,
        dimensions
      };
    });
  }
}
