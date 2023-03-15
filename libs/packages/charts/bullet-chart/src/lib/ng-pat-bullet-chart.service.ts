import {Injectable} from '@angular/core';
import {
  NgPatBulletChartConfig,
  NgPatBulletChartData,
  NgPatBulletChartToolTip
} from './bullet-chart.models';
import {map} from 'rxjs/operators';
import {select, Selection} from 'd3-selection';
import {scaleLinear} from 'd3-scale';
import {
  BaseType,
  EnterElement,
  interpolate,
  interpolateNumber,
  transition
} from 'd3';

// https://github.com/d3/d3-selection/issues/185#issuecomment-418118992
import 'd3-transition';
import {
  AbstractChartLayout,
  NgPatElSizeConfigDimensions,
  NgPatElSizeConfigDimensionsData,
  setToRange,
  SetToRangeFn,
  zeroIfUndefinedOrNull
} from '@ngpat/charts';

@Injectable()
export class NgPatBulletChartService extends AbstractChartLayout<
  NgPatBulletChartConfig,
  NgPatBulletChartData,
  NgPatBulletChartToolTip
> {
  barHeight = 10;
  progressIndicatorHeight = 30;
  progressIndicatorWidth = 5;
  limitIndicatorWidth = 2;
  limitInidicatorHeight = this.progressIndicatorHeight;
  barY = (this.progressIndicatorHeight - this.barHeight) / 2;
  defaultTooltipWidth = 200;

  lastProgress = 0;

  appendLayout() {
    return map((el: HTMLElement) => {
      /**
       * Add more elements to the layout if needed.
       *
       * The base layout structure is:
       *  <svg class="wrapper">
       *     <g class="bounds"></g>
       *  </svg>
       *
       */

      return el;
    });
  }

  resizeDataLayout({
    el,
    config,
    size,
    dimensions
  }: NgPatElSizeConfigDimensions) {
    return map((data: NgPatBulletChartData[]) => {
      /**
       * resize the layout based on data
       */

      return <NgPatElSizeConfigDimensionsData<NgPatBulletChartData>>{
        el,
        size,
        config,
        dimensions,
        data
      };
    });
  }

  applyData({
    el,
    config,
    size,
    dimensions,
    data
  }: NgPatElSizeConfigDimensionsData<NgPatBulletChartData>): void {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const that = this;
    /*
    There is only one datum per bullet chart.
     */

    const min = zeroIfUndefinedOrNull(data[0].min);
    const max = zeroIfUndefinedOrNull(data[0].max);
    const units = (data && data[0] && data[0].units) || 'N/A';

    const withinMinMax: SetToRangeFn = setToRange(min, max);

    const progress = withinMinMax(data[0].progress);
    const chartDataState = data[0].chartDataState;

    const datum: NgPatBulletChartData = {
      min,
      max,
      progress,
      units,
      chartDataState
    };

    const xScale = scaleLinear()
      .domain([min, max])
      .range([0, dimensions.boundedWidth]);

    const root = select(el).selectChild('.wrapper');
    const bounds = root.selectChild('.bounds');

    function interpolateProgress(
      lastProgress: number,
      currentProgress: number,
      t: number
    ) {
      // https://github.com/d3/d3-interpolate#interpolateNumber
      const i = interpolateNumber(lastProgress, currentProgress);

      return parseFloat(i(t).toFixed(2));
    }

    function calculateTooltip(progress: number) {
      // Tooltip Width
      const width = config.maxTooltipWidth
        ? config.maxTooltipWidth
        : that.defaultTooltipWidth;
      const x = xScale(progress) - that.progressIndicatorWidth / 2;

      let translateX = x - width / 2;
      /* Minimum x position tooltip can be to the left */
      const translateXLowerLimit = 0;
      /* Maximum x position tooltip can be to the left */
      const translateXUpperLimit = xScale(max) - width - 12;
      let showTooltipDivot = true;

      if (translateX < translateXLowerLimit) {
        translateX = translateXLowerLimit;
        showTooltipDivot = false;
      } else if (translateX > translateXUpperLimit) {
        translateX = translateXUpperLimit - 12;
        showTooltipDivot = false;
      } else {
        translateX = translateX - 8;
      }

      that.toolTipData$.next(<NgPatBulletChartToolTip>{
        data: {...datum, progress},
        width,
        x: translateX,
        y: 0,
        showTooltipDivot,
        minX: xScale(min),
        maxX: xScale(max),
        chartDataState: chartDataState
      });
    }

    function enterFn(
      enter: Selection<EnterElement, NgPatBulletChartData, BaseType, unknown>
    ) {
      enter
        .append('g')
        .classed('bullet-container', true)
        .attr('transform', (d: NgPatBulletChartData, index: number) => {
          return `translate(0,${index * 100})`;
        })
        .call((g: any) =>
          /**
           * Background Bar
           */
          g
            .append('rect')
            .classed('t-bullet-background-bar', true)
            .attr('width', dimensions.boundedWidth)
            .attr('height', that.barHeight)
            .attr('y', that.barY)
        )
        .call((g: any) =>
          g
            /**
             * Progress Bar
             */
            .append('rect')
            .attr('class', (d: NgPatBulletChartData) => {
              if (d.chartDataState === 'success') {
                return 'p-ng-pat-chart-data-success-background bullet-progress-bar';
              } else if (d.chartDataState === 'error') {
                return 'p-ng-pat-chart-data-error-background bullet-progress-bar';
              } else if (d.chartDataState === 'warn') {
                return 'p-ng-pat-chart-data-warn-background bullet-progress-bar';
              } else {
                return 't-bullet-progress-bar-primary bullet-progress-bar';
              }
            })
            .attr('height', that.barHeight)
            .attr('y', that.barY)
            .transition()
            .attr('width', (d: NgPatBulletChartData) => xScale(d.progress))
        )
        .call((g: any) =>
          g
            /**
             * Left Indicator
             */
            .append('rect')
            .classed('t-bullet-chart-limit--left', true)
            .attr('width', that.limitIndicatorWidth)
            .attr('height', that.limitInidicatorHeight)
            .attr('x', 0)
        )
        .call((g: any) =>
          g
            /**
             * Right Indicator
             */
            .append('rect')
            .classed('t-bullet-chart-limit--right', true)
            .attr('width', that.limitIndicatorWidth)
            .attr('height', that.limitInidicatorHeight)
            .attr(
              'x',
              (d: NgPatBulletChartData) =>
                xScale(d.max) - that.limitIndicatorWidth
            )
        )
        .call((g: any) =>
          g
            /**
             * Progress Indicator
             */
            .append('rect')
            // .classed('t-bullet-progress-indicator', true)
            .attr('class', (d: NgPatBulletChartData) => {
              if (d.chartDataState === 'success') {
                return 'p-ng-pat-chart-data-success-background bullet-progress-indicator';
              } else if (d.chartDataState === 'error') {
                return 'p-ng-pat-chart-data-error-background bullet-progress-indicator';
              } else if (d.chartDataState === 'warn') {
                return 'p-ng-pat-chart-data-warn-background bullet-progress-indicator';
              } else {
                return 't-bullet-progress-indicator-primary bullet-progress-indicator';
              }
            })
            .attr('width', that.progressIndicatorWidth)
            .attr('height', that.progressIndicatorHeight)
            .transition()
            .attr(
              'x',
              (d: NgPatBulletChartData) =>
                xScale(d.progress) - that.progressIndicatorWidth / 2
            )
            .tween('tooltip', (d: NgPatBulletChartData) => (t: number) => {
              calculateTooltip(
                interpolateProgress(that.lastProgress, d.progress, t)
              );

              if (t === 1) {
                that.lastProgress = d.progress;
              }
            })
        );

      return enter;
    }

    function updateFn(
      update: Selection<BaseType, NgPatBulletChartData, BaseType, unknown>
    ) {
      update.attr('transform', (d: NgPatBulletChartData, index: number) => {
        return `translate(0,${index * 100})`;
      });

      update
        .select('.t-bullet-background-bar')
        .attr('width', dimensions.boundedWidth);

      update
        .select('.bullet-progress-bar')
        .transition()
        .attr('width', (d: NgPatBulletChartData) => xScale(d.progress));

      update
        .select('.bullet-progress-indicator')
        .transition()
        .attr(
          'x',
          (d: NgPatBulletChartData) =>
            xScale(d.progress) - that.progressIndicatorWidth / 2
        )
        .tween('tooltip', (d: NgPatBulletChartData) => (t: number) => {
          calculateTooltip(
            interpolateProgress(that.lastProgress, d.progress, t)
          );

          if (t === 1) {
            that.lastProgress = d.progress;
          }
        });

      update
        .select('.t-bullet-chart-limit--right')
        .attr(
          'x',
          (d: NgPatBulletChartData) => xScale(d.max) - that.limitIndicatorWidth
        );

      return update;
    }

    function exitFn(exit: Selection<BaseType, any, BaseType, unknown>) {
      transition();
      exit.transition().remove();
    }

    bounds
      .selectAll('.bullet-container')
      .data([datum])
      .join(
        (
          enter: Selection<
            EnterElement,
            NgPatBulletChartData,
            BaseType,
            unknown
          >
        ) => enterFn(enter),
        (
          update: Selection<BaseType, NgPatBulletChartData, BaseType, unknown>
        ) => updateFn(update),
        (exit: Selection<BaseType, any, BaseType, unknown>) => exitFn(exit)
      );

    if (config.tooltipHover) {
      bounds
        // .select('.t-bullet-progress-indicator')
        .on('mouseover', (e, i) => {
          this.showTooltipHover$.next(true);
        })
        .on('mouseout', (e, i) => {
          this.showTooltipHover$.next(false);
        });
    }
  }
}
