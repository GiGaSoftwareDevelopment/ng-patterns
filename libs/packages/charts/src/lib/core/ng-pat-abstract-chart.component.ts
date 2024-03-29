import {
  BehaviorSubject,
  combineLatest,
  Observable,
  of,
  ReplaySubject,
  Subject
} from 'rxjs';
import {ChangeDetectorRef, ElementRef} from '@angular/core';
import {
  NgPatCommonChartConfig,
  NgPatElSizeConfigDimensionsData,
  NgPatJSONDOMRect
} from './chart.models';
import {
  calculateDimensions,
  processConfig,
  processResizeMap,
  resizeBaseLayout
} from './fns/chart.fns';
import {filter, mergeMap, takeUntil} from 'rxjs/operators';
import {NgPatAbstractChartLayout} from './ng-pat-abstract-chart-layout';

export abstract class NgPatAbstractChartComponent<
  ChartConfig,
  ChartData,
  TooltipData
> {
  protected _onDestroy$: Subject<boolean> = new Subject<boolean>();
  protected _data$: ReplaySubject<ChartData[]> = new ReplaySubject<ChartData[]>(
    1
  );
  protected _config$: ReplaySubject<ChartConfig> =
    new ReplaySubject<ChartConfig>(1);
  protected onResize: ReplaySubject<DOMRectReadOnly> =
    new ReplaySubject<DOMRectReadOnly>(1);

  private _tooltipHoverClosed = false;
  get tooltipHoverClosed() {
    return this._tooltipHoverClosed;
  }

  set tooltipHoverClosed(t: boolean) {
    this._tooltipHoverClosed = t;
  }

  private _showTooltipOnHover = false;
  set showTooltipOnHover(s: boolean) {
    this._showTooltipOnHover = s;
  }

  get showTooltipOnHover() {
    return this._showTooltipOnHover;
  }

  tooltipVisible = true;
  tooltipVisible$: ReplaySubject<boolean>;

  tooltipHover$: ReplaySubject<boolean>;

  tooltipWidth = 0;
  tooltipHeight = 0;
  tooltipWidth$: ReplaySubject<number>;
  tooltipHeight$: ReplaySubject<number>;

  tooltipData$: ReplaySubject<TooltipData>;
  showTooltipOnHover$: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);

  showNoData$: BehaviorSubject<boolean>;

  onResize$: ReplaySubject<DOMRectReadOnly>;

  protected chartContainer: ElementRef | null = null;

  constructor(
    protected _cd: ChangeDetectorRef,
    protected _chart: NgPatAbstractChartLayout<
      ChartConfig,
      ChartData,
      TooltipData
    >
  ) {
    // Detach change detection
    // D3 will handle changes in DOM
    this._cd.detach();
    this._onDestroy$ = new Subject<boolean>();

    this.tooltipData$ = this._chart.toolTipData$;
    this.showNoData$ = new BehaviorSubject<boolean>(false);
    this.showTooltipOnHover$ = new ReplaySubject<boolean>(1);
    this.tooltipVisible$ = new ReplaySubject<boolean>(1);
    this.tooltipHover$ = new ReplaySubject<boolean>(1);
    this.tooltipWidth$ = new ReplaySubject<number>(1);
    this.tooltipHeight$ = new ReplaySubject<number>(1);
    this.onResize$ = new ReplaySubject<DOMRectReadOnly>(1);
  }

  protected init() {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const that = this;

    if (this.chartContainer?.nativeElement) {
      const config$: Observable<NgPatCommonChartConfig> = this._config$.pipe(
        filter((c: ChartConfig) => c !== undefined && c !== null),

        // distinctUntilChanged, debounce, memoize
        //
        processConfig
      );

      of(this.chartContainer?.nativeElement)
        .pipe(
          NgPatAbstractChartLayout.CreateBaseLayoutMap(),
          this._chart.appendLayout(),
          mergeMap((el: HTMLElement) =>
            combineLatest([
              config$,
              that.onResize$.pipe(processResizeMap)
            ]).pipe(
              mergeMap(
                ([config, size]: [
                  NgPatCommonChartConfig,
                  NgPatJSONDOMRect | unknown
                ]) => {
                  // const dim: NgPatSizeConfigDimensions = calculateDimensions(config, <NgPatJSONDOMRect>size);
                  // const scd: NgPatElSizeConfigDimensions = resizeBaseLayout(el, calculateDimensions(config, <NgPatJSONDOMRect>size));
                  return that._data$.pipe(
                    that._chart.resizeDataLayout(
                      resizeBaseLayout(
                        el,
                        calculateDimensions(config, <NgPatJSONDOMRect>size)
                      )
                    )
                  );
                }
              )
            )
          ),
          takeUntil(this._onDestroy$)
        )
        .subscribe((d: any) => {
          that._chart.applyData(<NgPatElSizeConfigDimensionsData<ChartData>>d);
        });

      config$.subscribe((c: NgPatCommonChartConfig) => {
        if (c.tooltipVisible !== null && c.tooltipVisible !== undefined) {
          this.tooltipVisible = c.tooltipVisible;
          this.tooltipVisible$.next(c.tooltipVisible);
          this._cd.markForCheck();
        }

        if (c.tooltipHover !== null && c.tooltipHover !== undefined) {
          this.tooltipHoverClosed = c.tooltipHover;
          this.tooltipHover$.next(c.tooltipHover);
          this._cd.markForCheck();
        }

        if (c.tooltipWidth !== null && c.tooltipWidth !== undefined) {
          this.tooltipWidth = c.tooltipWidth;
          this.tooltipWidth$.next(c.tooltipWidth);
          this._cd.markForCheck();
        }

        if (c.tooltipHeight !== null && c.tooltipHeight !== undefined) {
          this.tooltipHeight = c.tooltipHeight;
          this.tooltipHeight$.next(c.tooltipHeight);
          this._cd.markForCheck();
        }
      });

      this._chart.showTooltipHover$
        .pipe(takeUntil(this._onDestroy$))
        .subscribe((showTooltip: boolean) => {
          this.showTooltipOnHover = showTooltip;
          this.showTooltipOnHover$.next(showTooltip);
          // console.log(showTooltip);
          this._cd.markForCheck();
          // this._cd.detectChanges();
        });
    } else {
      console.error('Chart Native Element Not Available');
    }
  }
}
