import {Injectable} from '@angular/core';
import {LineChartConfig} from './ui-line-chart.models';
import {select, pointer} from 'd3-selection';
import {timeParse, timeFormat} from 'd3-time-format';
import {scaleLinear, scaleTime} from 'd3-scale';
import {extent} from 'd3-array';
import {line} from 'd3-shape';
import {axisBottom, axisLeft} from 'd3-axis';
import {leastIndex} from 'd3-array';
import {format} from 'd3-format';
import {Subject} from 'rxjs';
import { ChartDimensionsCalculator } from '@uiux/charts';

/**
 * Separate file to do all thinks d3. You can put the same code
 * in the angular component directly. SOLID principle - separates
 * D3 responsibilities from Angular responsibilities
 *
 * NOTE: DO NOT PROVIDE IN ROOT
 * Needs to be instantiated for every chart instance in DOM
 */
@Injectable()
export class UiLineChartService {
  private dimensions!: ChartDimensionsCalculator;

  // TODO type should be generic
  public tooltipData$: Subject<any>;

  constructor() {
    this.tooltipData$ = new Subject();
  }

  public createCanvasElements(el: HTMLElement, config: LineChartConfig) {
    this.dimensions = new ChartDimensionsCalculator(config);

    const svg = select(el).append('svg');

    const bounds = svg
      .append('g')
      .classed('bounds', true)
      .attr(
        'transform',
        `translate(${this.dimensions.margin.left}, ${this.dimensions.margin.top})`
      );

    bounds
      .append('defs')
      .append('clipPath')
      .attr('id', 'bounds-clip-path')
      .append('rect');

    bounds
      .append('g')
      .classed('clip', true)
      .attr('clip-path', 'url(#bounds-clip-path)');

    bounds.append('rect').classed('listening-rect', true);

    bounds.append('g').classed('x-axis', true);
  }

  public resize(el: HTMLElement, size: DOMRectReadOnly) {
    this.dimensions.resize(size);

    const svg = select(el)
      .select('svg')
      .attr('width', this.dimensions.width)
      .attr('height', this.dimensions.height);

    const bounds = svg
      .select('.bounds')
      .attr('width', this.dimensions.boundedWidth)
      .attr('height', this.dimensions.boundedHeight);

    bounds
      .select('#bounds-clip-path')
      .select('rect')
      .attr('width', this.dimensions.boundedWidth)
      .attr('height', this.dimensions.boundedHeight);

    bounds
      .select('.listening-rect')
      .attr('width', this.dimensions.boundedWidth)
      .attr('height', this.dimensions.boundedHeight);
  }

  // TODO need a consistent data series interface
  public data(el: HTMLElement, datasets: any[][]) {
    const that = this;

    // Select canvas elements
    const svg = select(el).select('svg');
    const bounds = svg.select('.bounds');
    const clip = svg.select('.clip');

    // Data Accessors
    // This makes it easier to access data by
    // using re-usable functions, rather than
    // creating inline functions
    //
    const yAccessor = (d: any) => d.temperatureMax;
    const dateParser: (dateString: string) => (Date | null) = timeParse('%Y-%m-%d');
    const xAccessor = (d: any): Date | null => {
      if (d !== null && d !== undefined && d.date) {
        return dateParser(d.date)
      }

      return null;
    };

    // @ts-ignore
    datasets = datasets.map((dataset: any[]) =>
      dataset.sort((a, b) => <any>xAccessor(a) - <any>xAccessor(b)).slice(0, 100)
    );

    // Scales

    const yScale = scaleLinear()
      // @ts-ignore
      .domain(extent(datasets[0], yAccessor)) // TODO determine min/max of datasets manually
      .range([this.dimensions.boundedHeight, 0]);

    const xScale = scaleTime()
      // all data sets should have the same domain for a series
      // @ts-ignore
      .domain(extent(datasets[0], xAccessor)) // TODO determine min/max of datasets manually
      .range([0, this.dimensions.boundedWidth]);

    // Draw data

    const lineGenerator = line()
      // @ts-ignore
      .x((d: any) => xScale(xAccessor(d)))
      .y((d: any) => yScale(yAccessor(d)));

    // https://observablehq.com/@thetylerwolf/day-18-join-enter-update-exit
    const path = clip
      .selectAll('.line')
      .data(datasets)
      .join(
        enter =>
          enter
            .append('path')
            .data(datasets)
            .attr('class', 'line')

            .attr('d', lineGenerator),
        update =>
          update
            // .transition().duration(1000)
            .attr('d', lineGenerator),
        exit => exit.remove()
      );

    // Draw peripherals
    const yAxisGenerator = axisLeft(yScale).scale(yScale);

    const yAxis = bounds
      .append('g')
      .attr('class', 'y-axis')
      .call(yAxisGenerator);

    const yAxisLabel = select('.y-axis-label').node()
      ? select('.y-axis-label')
      : yAxis
          .append('text')
          .attr('class', 'y-axis-label')
          .attr('x', -this.dimensions.boundedHeight / 2)
          .attr('y', -this.dimensions.margin.left + 10)
          .html('Minimum Temperature (&deg;F)');

    const xAxisGenerator = axisBottom(xScale).scale(xScale);

    const xAxis = bounds
      .select('.x-axis')
      .style('transform', `translateY(${this.dimensions.boundedHeight}px)`)

      // @ts-ignore
      .call(xAxisGenerator);

    // Set up interactions

    const listeningRect = bounds
      .select('.listening-rect')
      .on('mousemove', onMouseMove)
      .on('mouseleave', onMouseLeave);

    // const tooltip = select('.tq-line-chart-tooltip');
    const tooltip = select('#tooltip');

    const tooltipCircle = select('.tooltip-circle').node()
      ? select('.tooltip-circle')
      : bounds
          .append('circle')
          .attr('class', 'tooltip-circle')
          .attr('r', 4)
          .attr('stroke', '#af9358')
          .attr('fill', '#af9358')
          .attr('stroke-width', 2)
          .style('opacity', 0);

    const tooltipLine = select('.tooltip-line').node()
      ? select('.tooltip-line')
      : bounds
          .append('rect')
          .attr('class', 'tooltip-line')
          .attr('width', 2)
          .attr('height', this.dimensions.boundedHeight)
          .attr('fill', '#af9358')
          .style('opacity', 0);

    function onMouseMove(event: any) {
      // TODO for a series, need to get data from all datasets
      const dataset = datasets[0];

      // TODO what to target in pointer?
      const mousePosition = pointer(event);
      const hoveredDate = xScale.invert(mousePosition[0]);
      // @ts-ignore
      const getDistanceFromHoveredDate = d =>
        Math.abs(<any>xAccessor(d) - <any>hoveredDate);

      const closestIndex = leastIndex(
        dataset,
        (a, b) => getDistanceFromHoveredDate(a) - getDistanceFromHoveredDate(b)
      );
      // @ts-ignore
      const closestDataPoint = dataset[closestIndex];

      const closestXValue = xAccessor(closestDataPoint);
      const closestYValue = yAccessor(closestDataPoint);

      const formatDate = timeFormat('%B %A %-d, %Y');

      // tooltip.select('#date')
      //
      //   .text(formatDate(closestXValue));

      const formatTemperature = (d: any) => `${format('.1f')(d)}°F`;

      // tooltip.select('#temperature')
      //   .html(formatTemperature(closestYValue));

      const tooltipPayload = {
        temperature: formatTemperature(closestYValue),
        // @ts-ignore
        date: formatDate(closestXValue)
      };

      that.tooltipData$.next(tooltipPayload);
      // @ts-ignore
      const x = xScale(closestXValue) + that.dimensions.margin.left;
      const y = yScale(closestYValue) + that.dimensions.margin.top;

      tooltip.style(
        'transform',
        `translate(` + `calc( -50% + ${x}px),` + `calc(-100% + ${y}px)` + `)`
      );

      tooltip.style('opacity', 1);
      tooltipLine.style('opacity', 1);

      tooltipCircle
        // @ts-ignore
        .attr('cx', xScale(closestXValue))
        // @ts-ignore
        .attr('cy', yScale(closestYValue))
        .style('opacity', 1);
      // @ts-ignore
      tooltipLine.style(
        'transform',
        `translate(` + `${xScale(<Date>closestXValue)}px,` + `0` + `)`
      );
    }

    function onMouseLeave() {
      tooltip.style('opacity', 0);

      tooltipCircle.style('opacity', 0);
      tooltipLine.style('opacity', 0);
    }
  }
}
