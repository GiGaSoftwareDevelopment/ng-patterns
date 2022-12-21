import { BulletChartConfig, BulletChartData } from '@uiux/charts/bullet-chart';

export const bulletChartInitial: BulletChartData = {
  max: 2,
  min: 0,
  progress: 1.96,
  units: 'GB',
  chartDataState: null
}

export const bulletChartConfigInitial: BulletChartConfig = {
  title: 'Storage Used',
  maxTooltipWidth: 50,
  description: 'Based on files in the projects you own. Projects assigned you as a collaborator are not counted.'

}
