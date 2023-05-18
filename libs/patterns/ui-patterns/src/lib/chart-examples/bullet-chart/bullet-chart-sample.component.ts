import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  NgPatBulletChartConfig,
  NgPatBulletChartData,
  NgPatBulletChartToolTip,
  NgPatBulletChartModule
} from '@ngpat/charts/bullet-chart';
import {MatTooltipModule} from '@angular/material/tooltip';
import {Observable, ReplaySubject} from 'rxjs';
import {map} from 'rxjs/operators';
import {PushPipe} from '@ngrx/component';
import {SampleBulletChartConfigComponent} from './sample/bullet-chart-config/sample-bullet-chart-config.component';
import {
  bulletChartConfigInitial,
  bulletChartDataInitial
} from './sample/bullet-chart-data-initial';
import {SampleBulletChartDataComponent} from './sample/bullet-chart-data/sample-bullet-chart-data.component';

@Component({
  selector: 'pat-bullet-chart',
  standalone: true,
  imports: [
    CommonModule,
    NgPatBulletChartModule,
    MatTooltipModule,
    PushPipe,
    SampleBulletChartConfigComponent,
    SampleBulletChartDataComponent
  ],
  templateUrl: './bullet-chart-sample.component.html',
  styleUrls: ['./bullet-chart-sample.component.scss'],
  host: {
    class: 'sample-page-layout'
  }
})
export class BulletChartSampleComponent implements OnInit {
  private _config: Partial<NgPatBulletChartConfig> = {
    // heightBasedOnData: true,
    maxTooltipWidth: 50
  };

  reversed = false;

  config$: ReplaySubject<NgPatBulletChartConfig>;
  data$: ReplaySubject<NgPatBulletChartData>;
  tooltip$: ReplaySubject<NgPatBulletChartToolTip>;
  units$: ReplaySubject<string>;

  title$: Observable<string>;
  description$: Observable<string>;

  constructor() {
    this.data$ = new ReplaySubject<NgPatBulletChartData>(1);
    this.tooltip$ = new ReplaySubject<NgPatBulletChartToolTip>(1);
    this.config$ = new ReplaySubject<NgPatBulletChartConfig>(1);
    this.units$ = new ReplaySubject<string>(1);

    this.title$ = this.config$.pipe(
      map((config: NgPatBulletChartConfig) => config.title)
    );
    this.description$ = this.config$.pipe(
      map((config: NgPatBulletChartConfig) => config.description)
    );
  }

  ngOnInit(): void {
    this.data$.next(bulletChartDataInitial);
    this.config$.next(bulletChartConfigInitial);
  }

  onConfigChange(c: NgPatBulletChartConfig) {
    this.config$.next(<NgPatBulletChartConfig>{
      ...this._config,
      ...c
    });
  }

  onDataChange(c: NgPatBulletChartData) {
    this.units$.next(c && c.units !== undefined ? c.units : '');
    this.data$.next({
      ...c
    });
  }
}
