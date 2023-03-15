import {
  NgPatChartDataState,
  NgPatCommonChartConfig,
  NgPatCommonTooltip
} from '@ngpat/charts';

export interface NgPatBulletChartConfig extends NgPatCommonChartConfig {
  title: string;
  description: string;
}

export interface NgPatBulletChartData {
  max: number;
  progress: number;
  min: number;
  /* units suffix such as Kb, Db, MHz */
  units: string;
  chartDataState: NgPatChartDataState | null;
}

export interface NgPatBulletChartToolTip
  extends NgPatCommonTooltip<NgPatBulletChartData> {
  showTooltipDivot: boolean;
  chartDataState: NgPatChartDataState | null;
}
