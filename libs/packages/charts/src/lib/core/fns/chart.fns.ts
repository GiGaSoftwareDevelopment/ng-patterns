import * as equal from 'fast-deep-equal';
import {
  ChartConfigBase,
  ChartDimensions,
  CommonChartConfig,
  JSONDOMRect,
  SizeConfigDimensions
} from '../chart.models';
import {pipe} from 'rxjs';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';
import { memoize } from '@uiux/rxjs';

export function getJSONDOMRectReadOnly(d: DOMRectReadOnly): JSONDOMRect {
  return <JSONDOMRect>d.toJSON();
}

export const processConfig = pipe(
  distinctUntilChanged(equal),
  debounceTime(20),
  memoize()
);

const debounceTimeValue = 100;

export const processResize = pipe(
  map(getJSONDOMRectReadOnly),
  distinctUntilChanged(equal),
  debounceTime(debounceTimeValue),
  memoize()
);

export const processResizeConfig = (config: ChartConfigBase) => {
  // if (config.heightBasedOnData !== null && config.heightBasedOnData !== undefined && config.heightBasedOnData) {
  //   /**
  //    * Only check for width changes
  //    */
  //   return pipe(map(getJSONDOMRectReadOnly), distinctUntilKeyChanged('width'), debounceTime(debounceTimeValue), memoize());
  // }

  return processResize;
};

export function calculateDimensions(config: CommonChartConfig) {
  return map((size: JSONDOMRect) => {
    const dimensions: ChartDimensions = {
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

    return <SizeConfigDimensions>{
      config,
      size,
      dimensions
    };
  });
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
