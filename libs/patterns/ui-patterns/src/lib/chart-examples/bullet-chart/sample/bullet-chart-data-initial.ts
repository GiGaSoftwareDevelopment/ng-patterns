import {
  NgPatBulletChartConfig,
  NgPatBulletChartData
} from '@ngpat/charts/bullet-chart';

export const bulletChartDataInitial: NgPatBulletChartData = {
  max: 2,
  min: 0,
  progress: 1,
  units: 'GB',
  chartDataState: null
};

export const bulletChartConfigInitial: NgPatBulletChartConfig = {
  title: 'Storage Used',
  maxTooltipWidth: 70,
  description:
    'Based on files in the projects you own. Projects assigned you as a collaborator are not counted.',
  tooltipReversed: false
};
