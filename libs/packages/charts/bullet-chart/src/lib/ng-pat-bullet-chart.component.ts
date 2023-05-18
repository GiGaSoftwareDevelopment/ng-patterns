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
import {NgPatBulletChartService} from './ng-pat-bullet-chart.service';
import {
  NgPatBulletChartConfig,
  NgPatBulletChartData,
  NgPatBulletChartToolTip
} from './bullet-chart.models';
import {combineLatest, ReplaySubject} from 'rxjs';
import {filter, takeUntil} from 'rxjs/operators';
import {
  NgPatAbstractChartComponent,
  NgPatChartDataState,
  NgPatResizeObserverDirective
} from '@ngpat/charts';
import {CommonModule} from '@angular/common';
import {PushPipe} from '@ngrx/component';
import {NgPatBulletChartTitleDirective} from './ng-pat-bullet-chart-title.directive';
import {NgPatBulletChartDescriptionDirective} from './ng-pat-bullet-chart-description.directive';
import {NgPatBulletChartTooltipComponent} from './ng-pat-bullet-chart-tooltip.component';

@Component({
  standalone: true,
  selector: 'ng-pat-bullet-chart',
  templateUrl: './ng-pat-bullet-chart.component.html',
  styleUrls: ['./ng-pat-bullet-chart.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [NgPatBulletChartService],
  // eslint-disable-next-line @angular-eslint/no-host-metadata-property
  host: {
    class: 't-ng-pat-bullet-chart ng-pat-bullet-chart',
    '[class.g-ng-pat-chart-tooltip-reversed]': 'tooltipReversed === true',
    '[class.g-ng-pat-chart-tooltip-hover-closed]':
      'tooltipHoverClosed === true',
    '[class.tooltip-hover]': 'showTooltipOnHover === true'
  },
  imports: [
    CommonModule,
    PushPipe,
    NgPatBulletChartComponent,
    NgPatBulletChartTitleDirective,
    NgPatBulletChartDescriptionDirective,
    NgPatBulletChartTooltipComponent,
    NgPatResizeObserverDirective
  ]
})
export class NgPatBulletChartComponent
  extends NgPatAbstractChartComponent<
    NgPatBulletChartConfig,
    NgPatBulletChartData,
    NgPatBulletChartToolTip
  >
  implements OnInit, AfterViewInit, OnDestroy
{
  private _tooltipReversed = false;

  min$: ReplaySubject<string>;
  max$: ReplaySubject<string>;
  tooltipStyle$: ReplaySubject<string>;
  toolTipStateClass$: ReplaySubject<NgPatChartDataState | null>;
  showTooltipDivot$: ReplaySubject<boolean>;

  tooltipSuccess = false;
  tooltipWarn = false;
  tooltipError = false;

  @Input()
  set config(c: NgPatBulletChartConfig | undefined) {
    if (c !== null && c !== undefined) {
      this._config$.next(c);
    }
  }

  @Input()
  set data(d: NgPatBulletChartData | undefined) {
    if (d !== null && d !== undefined) {
      this._data$.next([d]);
    }
  }

  set tooltipReversed(r: boolean | undefined | null) {
    if (r !== undefined && r !== null) {
      this._tooltipReversed = r;
    }
  }
  get tooltipReversed() {
    return this._tooltipReversed;
  }

  @Output() tooltipChange: EventEmitter<NgPatBulletChartToolTip>;

  @ViewChild('chartContainer', {static: true})
  override chartContainer: ElementRef | null = null;

  constructor(
    override _cd: ChangeDetectorRef,
    override _chart: NgPatBulletChartService
  ) {
    super(_cd, _chart);

    this.tooltipChange = new EventEmitter<NgPatBulletChartToolTip>();
    this.min$ = new ReplaySubject<string>(1);
    this.max$ = new ReplaySubject<string>(1);
    this.tooltipStyle$ = new ReplaySubject<string>(1);
    this.toolTipStateClass$ = new ReplaySubject<NgPatChartDataState | null>(1);
    this.showTooltipDivot$ = new ReplaySubject<boolean>(1);
  }

  ngOnInit() {
    combineLatest([
      this._config$.pipe(
        filter((c: NgPatBulletChartConfig) => c !== undefined && c !== null)
      ),
      this._data$
    ])
      .pipe(takeUntil(this._onDestroy$))
      .subscribe(([c, d]: [NgPatBulletChartConfig, NgPatBulletChartData[]]) => {
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
      .subscribe((t: NgPatBulletChartToolTip) => {
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
