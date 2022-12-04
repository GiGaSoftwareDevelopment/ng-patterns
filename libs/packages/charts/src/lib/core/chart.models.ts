export interface D3CanvasMargins {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

export interface D3CanvasDimension {
  width: number;
  height: number;
  margin: D3CanvasMargins;
}

// https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserverEntry
//
export interface ResizeObserverEntry {
  contentRect: DOMRectReadOnly;
}

export interface ChartConfigBase {
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

export interface CommonChartConfig extends ChartConfigBase {
  tooltipVisible?: boolean;
  tooltipHover?: boolean;
  tooltipReversed?: boolean;
  maxTooltipWidth?: number;
  showXAxis?: boolean;
  showYAxis?: boolean;
}

export interface JSONDOMRect {
  bottom: number;
  height: number;
  left: number;
  right: number;
  top: number;
  width: number;
  x: number;
  y: number;
}

export interface ChartDimensions {
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

export interface SizeConfig {
  config: CommonChartConfig;
  size: JSONDOMRect;
}

export interface SizeConfigDimensions {
  config: CommonChartConfig;
  size: JSONDOMRect;
  dimensions: ChartDimensions;
}

export interface ElSizeConfigDimensions {
  el: HTMLElement;
  config: CommonChartConfig;
  size: JSONDOMRect;
  dimensions: ChartDimensions;
}

export interface ElSizeConfigDimensionsData<Data> {
  el: HTMLElement;
  config: CommonChartConfig;
  size: JSONDOMRect;
  dimensions: ChartDimensions;
  data: Data[];
}

export interface CommonTooltip<ChartData> {
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
export declare type ChartDataState = 'error' | 'warn' | 'success';
