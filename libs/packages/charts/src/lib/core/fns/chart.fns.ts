import {
  NgPatChartConfigBase,
  NgPatChartDimensions,
  NgPatCommonChartConfig,
  NgPatElSizeConfigDimensions,
  NgPatJSONDOMRect,
  NgPatSizeConfigDimensions
} from '../chart.models';
import {OperatorFunction, pipe} from 'rxjs';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';
import {memoize} from '@ngpat/rxjs';
import {select} from 'd3-selection';
import {isEqual} from '@ngpat/fn';

export function getJSONDOMRectReadOnly(d: DOMRectReadOnly): NgPatJSONDOMRect {
  return <NgPatJSONDOMRect>d.toJSON();
}

export const processConfig = pipe(
  distinctUntilChanged(isEqual),
  debounceTime(20),
  memoize()
);

const debounceTimeValue = 100;

export const processResizeMap: OperatorFunction<
  DOMRectReadOnly,
  NgPatJSONDOMRect
> = pipe(
  map(getJSONDOMRectReadOnly),
  distinctUntilChanged(isEqual),
  debounceTime(debounceTimeValue),
  memoize<NgPatJSONDOMRect>()
);

export const processResizeConfig = (config: NgPatChartConfigBase) => {
  // if (config.heightBasedOnData !== null && config.heightBasedOnData !== undefined && config.heightBasedOnData) {
  //   /**
  //    * Only check for width changes
  //    */
  //   return pipe(map(getJSONDOMRectReadOnly), distinctUntilKeyChanged('width'), debounceTime(debounceTimeValue), memoize());
  // }

  return processResizeMap;
};

/**
 *
 * @param config: NgPatCommonChartConfig
 * @param size: NgPatJSONDOMRect
 */
export function calculateDimensions(
  config: NgPatCommonChartConfig,
  size: NgPatJSONDOMRect
): NgPatSizeConfigDimensions {
  const dimensions: NgPatChartDimensions = {
    width: null,
    height: null,
    boundedWidth: 0,
    boundedHeight: 0,
    margin: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    }
  };

  dimensions.width =
    config.width !== undefined && config.width !== null
      ? config.width
      : size.width;
  dimensions.height =
    config.height !== undefined && config.height !== null
      ? config.height
      : size.height;

  if (config.margin) {
    dimensions.margin.top = config.margin.top || 0;
    dimensions.margin.right = config.margin.right || 0;
    dimensions.margin.bottom = config.margin.bottom || 0;
    dimensions.margin.left = config.margin.left || 0;
  }

  dimensions.boundedWidth =
    dimensions.width - dimensions.margin.left - dimensions.margin.right;
  dimensions.boundedHeight =
    dimensions.height - dimensions.margin.top - dimensions.margin.bottom;

  return <NgPatSizeConfigDimensions>{
    config,
    size,
    dimensions
  };
}

/**
 *
 * @param config: NgPatCommonChartConfig
 */
export function calculateDimensionsMap(
  config: NgPatCommonChartConfig
): OperatorFunction<NgPatJSONDOMRect, NgPatSizeConfigDimensions> {
  return map((size: NgPatJSONDOMRect) => calculateDimensions(config, size));
}

/**
 * https://stackoverflow.com/a/24941988
 * @param obj
 */
export function isString(obj: any): boolean {
  return Object.prototype.toString.call(obj) === '[object String]';
}

/**
 * https://stackoverflow.com/questions/18082/validate-decimal-numbers-in-javascript-isnumeric
 * @param n
 */
export function isNumeric(n: any): boolean {
  return (
    !(Object.prototype.toString.call(n) === '[object String]') &&
    !Number.isNaN(parseFloat(n)) &&
    Number.isFinite(n)
  );
}

export function toFloatOrDefault(v: any, _default: number = 0): number {
  return isNumeric(parseFloat(v)) ? parseFloat(v) : _default;
}

export function zeroIfUndefinedOrNull(v: number | null | undefined): number {
  if (isString(v) || !isNumeric(v)) {
    return 0;
  } else {
    return <number>v;
  }
}

export type SetToRangeFn = (v: number) => number;

export function setToRange(min: number, max: number): SetToRangeFn {
  const _min = zeroIfUndefinedOrNull(min);
  const _max = zeroIfUndefinedOrNull(max);
  return (v: number): number => {
    const _v = zeroIfUndefinedOrNull(v);

    if (_v < _min) {
      return _min;
    } else if (_v > _max) {
      return _max;
    }
    return _v;
  };
}

export function resizeBaseLayout(
  el: HTMLElement,
  {size, config, dimensions}: NgPatSizeConfigDimensions
): NgPatElSizeConfigDimensions {
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

  return <NgPatElSizeConfigDimensions>{
    el,
    size,
    config,
    dimensions
  };
}
