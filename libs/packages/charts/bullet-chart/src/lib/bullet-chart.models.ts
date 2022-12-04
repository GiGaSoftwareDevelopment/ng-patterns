import {ChartDataState, CommonChartConfig, CommonTooltip} from '@uiux/charts';

export type BulletChartConfig = CommonChartConfig;

export interface BulletChartData {
  max: number;
  progress: number;
  min: number;
  /* units suffix such as Kb, Db, MHz */
  units: string;
  chartDataState: ChartDataState | null;
}

export interface BulletChartToolTip extends CommonTooltip<BulletChartData> {
  showTooltipDivot: boolean;
  chartDataState: ChartDataState | null;
}
