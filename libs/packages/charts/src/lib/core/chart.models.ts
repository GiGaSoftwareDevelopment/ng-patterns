export interface NgPatD3CanvasMargins {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

export interface NgPatD3CanvasDimension {
  width: number;
  height: number;
  margin: NgPatD3CanvasMargins;
}

// https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserverEntry
//
export interface ResizeObserverEntry {
  contentRect: DOMRectReadOnly;
}

export interface NgPatChartConfigBase {
  /**
   * Height is calculated based data
   */
  // heightBasedOnData?: boolean;
  width?: number;
  height?: number;
  margin?: {
    top?: number;
    right?: number;
    bottom?: number;
    left?: number;
  };

  tooltipWidth?: number;
  tooltipHeight?: number;
}

export interface NgPatCommonChartConfig extends NgPatChartConfigBase {
  tooltipVisible?: boolean;
  tooltipHover?: boolean;
  tooltipReversed?: boolean;
  maxTooltipWidth?: number;
  showXAxis?: boolean;
  showYAxis?: boolean;
}

export interface NgPatJSONDOMRect {
  bottom: number;
  height: number;
  left: number;
  right: number;
  top: number;
  width: number;
  x: number;
  y: number;
}

export interface NgPatChartDimensions {
  // CSS width is 100% unless overridden by config
  width: number | null;
  height: number | null;
  boundedWidth: number;
  boundedHeight: number;
  margin: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
}

/**
 * Functions to aggregate chart config and dimensions
 */

export interface NgPatSizeConfig {
  config: NgPatCommonChartConfig;
  size: NgPatJSONDOMRect;
}

export interface NgPatSizeConfigDimensions {
  config: NgPatCommonChartConfig;
  size: NgPatJSONDOMRect;
  dimensions: NgPatChartDimensions;
}

export interface NgPatElSizeConfigDimensions {
  el: HTMLElement;
  config: NgPatCommonChartConfig;
  size: NgPatJSONDOMRect;
  dimensions: NgPatChartDimensions;
}

export interface NgPatElSizeConfigDimensionsData<Data> {
  el: HTMLElement;
  config: NgPatCommonChartConfig;
  size: NgPatJSONDOMRect;
  dimensions: NgPatChartDimensions;
  data: Data[];
}

export interface NgPatCommonTooltip<ChartData> {
  width: number;
  data: ChartData;
  x: number;
  y: number;

  /* provided by d3-scale invert function to
  give x pixel values of min and max */
  minX: number;
  maxX: number;
}

/**
 * Show state of data
 */
export declare type NgPatChartDataState = 'error' | 'warn' | 'success';
