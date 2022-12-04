import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {BulletChartService} from './bullet-chart.service';
import {
  BulletChartConfig,
  BulletChartData,
  BulletChartToolTip
} from './bullet-chart.models';
import {AbstractChartComponent} from '@uiux/charts';
import {combineLatest, ReplaySubject} from 'rxjs';
import {filter, takeUntil} from 'rxjs/operators';
import {ChartDataState} from '@uiux/charts';

@Component({
  selector: 'uiux-bullet-chart',
  templateUrl: './bullet-chart.component.html',
  styleUrls: ['./bullet-chart.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [BulletChartService],
  // eslint-disable-next-line @angular-eslint/no-host-metadata-property
  host: {
    class: 't-uiux-bullet-chart uiux-bullet-chart',
    '[class.p-chart-tooltip-reversed]': 'tooltipReversed === true',
    '[class.p-chart-tooltip-hover-closed]': 'tooltipHoverClosed === true',
    '[class.tooltip-hover]': 'showTooltipOnHover === true'
  }
})
export class BulletChartComponent
  extends AbstractChartComponent<
    BulletChartConfig,
    BulletChartData,
    BulletChartToolTip
  >
  implements OnInit, AfterViewInit, OnDestroy
{
  private _tooltipReversed = false;

  min$: ReplaySubject<string>;
  max$: ReplaySubject<string>;
  tooltipStyle$: ReplaySubject<string>;
  toolTipStateClass$: ReplaySubject<ChartDataState | null>;
  showTooltipDivot$: ReplaySubject<boolean>;

  tooltipSuccess = false;
  tooltipWarn = false;
  tooltipError = false;

  @Input()
  set config(c: BulletChartConfig) {
    this._config$.next(c);
  }

  @Input()
  set data(d: BulletChartData) {
    this._data$.next([d]);
  }

  set tooltipReversed(r: boolean | undefined | null) {
    if (r !== undefined && r !== null) {
      this._tooltipReversed = r;
    }
  }
  get tooltipReversed() {
    return this._tooltipReversed;
  }

  @Output() tooltipChange: EventEmitter<BulletChartToolTip>;

  @ViewChild('chartContainer', {static: true})
  override chartContainer: ElementRef | null = null;

  constructor(
    override _cd: ChangeDetectorRef,
    override _chart: BulletChartService
  ) {
    super(_cd, _chart);

    this.tooltipChange = new EventEmitter<BulletChartToolTip>();
    this.min$ = new ReplaySubject<string>(1);
    this.max$ = new ReplaySubject<string>(1);
    this.tooltipStyle$ = new ReplaySubject<string>(1);
    this.toolTipStateClass$ = new ReplaySubject<ChartDataState | null>(1);
    this.showTooltipDivot$ = new ReplaySubject<boolean>(1);
  }

  ngOnInit() {
    combineLatest([
      this._config$.pipe(
        filter((c: BulletChartConfig) => c !== undefined && c !== null)
      ),
      this._data$
    ])
      .pipe(takeUntil(this._onDestroy$))
      .subscribe(([c, d]: [BulletChartConfig, BulletChartData[]]) => {
        this.tooltipReversed = c.tooltipReversed;

        if (d && d.length) {
          // labels
          this.min$.next(`${d[0].min} ${d[0].units}`);
          this.max$.next(`${d[0].max} ${d[0].units}`);
        }

        this._cd.detectChanges();
      });

    this.tooltipData$
      .pipe(takeUntil(this._onDestroy$))
      .subscribe((t: BulletChartToolTip) => {
        this.tooltipStyle$.next(
          `width: ${t.width}px; transform: translate(${t.x}px, 0);`
        );
        this.showTooltipDivot$.next(t.showTooltipDivot);

        this.tooltipSuccess = t.chartDataState === 'success';
        this.tooltipError = t.chartDataState === 'error';
        this.tooltipWarn = t.chartDataState === 'warn';

        this._cd.detectChanges();
        this.tooltipChange.emit(t);
      });
  }

  ngAfterViewInit(): void {
    this.init();
  }

  ngOnDestroy() {
    this._onDestroy$.next(true);
  }
}
