import { D3CanvasDimension } from '@uiux/charts';

/**
 * For smaller version of the chart such as a dashboard widget
 * or inside a table row, hide axis' and axis title elements.
 */
export interface LineChartConfig extends D3CanvasDimension {
  showXAxis: boolean;
  showYAxis: boolean;
}

export const initialLineChartConfig: LineChartConfig = {
  showXAxis: true,
  showYAxis: true,

  // will be overridden by resizer
  width: 600,
  height: 400,

  margin: {
    top: 15,
    right: 15,
    bottom: 40,
    left: 60
  }
};
