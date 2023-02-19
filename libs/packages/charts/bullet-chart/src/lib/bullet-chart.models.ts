import { ChartDataState, CommonChartConfig, CommonTooltip } from '@ngpat/charts';


export interface BulletChartConfig extends CommonChartConfig {
   title: string;
   description: string;
}



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
