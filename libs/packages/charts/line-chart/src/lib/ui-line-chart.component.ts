import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {BehaviorSubject, ReplaySubject, Subject} from 'rxjs';

import {initialLineChartConfig, LineChartConfig} from './ui-line-chart.models';
import {UiLineChartService} from './ui-line-chart.service';
import {debounceTime, mergeMap, takeUntil} from 'rxjs/operators';

@Component({
  selector: 'uiux-line-chart',
  templateUrl: './ui-line-chart.component.html',
  styleUrls: ['./ui-line-chart.component.scss'],

  // D3 handles DOM rendering. Since there is no D3 elements
  // in the DOM when angular renders the component, there
  // are no elements for angular to encapsulate, and when
  // Angular encapsulates the styles, css will not target
  // d3 elements when d3 renders.
  //
  encapsulation: ViewEncapsulation.None,

  // D3 handles change detection
  //
  changeDetection: ChangeDetectionStrategy.OnPush,

  providers: [UiLineChartService]
})
export class UiLineChartComponent implements AfterViewInit, OnDestroy {
  private _onDestroy$: Subject<boolean>;
  private _data: BehaviorSubject<any[][]>;

  public chart: UiLineChartService;
  public tooltipData$: Subject<any>;
  public showNoData: BehaviorSubject<boolean>;

  @Input()
  set data(_datasets: any[][]) {
    if (_datasets !== null && _datasets !== undefined) {
      // It's ok if _data has zero elements, this will
      // empty ( if chart previously had data ) the chart
      // and show the user there is now data in current
      // use case ( think live charts )
      //
      this._data.next(_datasets);
    }
  }

  private _config: BehaviorSubject<LineChartConfig>;

  @Input()
  set config(c: LineChartConfig) {
    if (c && Object.keys(c).length) {
      this._config.next({
        ...this._config.value,
        ...c
      });
    }
  }

  public onResize$: ReplaySubject<DOMRectReadOnly>;

  @ViewChild('chartContainer', {static: true})
  public chartContainer: ElementRef | null = null;

  constructor(private cd: ChangeDetectorRef) {
    // Detach change detection
    // D3 will handle changes in DOM
    this.cd.detach();

    this._onDestroy$ = new Subject<boolean>();
    this._data = new BehaviorSubject<any>([]);
    this._config = new BehaviorSubject<LineChartConfig>({
      ...initialLineChartConfig
    });

    this.tooltipData$ = new Subject<boolean>();
    this.chart = new UiLineChartService();
    this.showNoData = new BehaviorSubject<boolean>(false);
    this.onResize$ = new ReplaySubject<DOMRectReadOnly>(1);
  }

  ngAfterViewInit() {
    this.chart.tooltipData$
      .pipe(takeUntil(this._onDestroy$))
      .subscribe((d: any) => {
        this.tooltipData$.next(d);
        this.cd.detectChanges();
      });

    if (this.chartContainer?.nativeElement) {
      this._config
        .pipe(
          mergeMap((config: LineChartConfig) => {
            // Step 1, layout base "canvas" of chart
            //
            this.chart.createCanvasElements(
              this.chartContainer?.nativeElement,
              config
            );

            return this.onResize$.pipe(
              debounceTime(200),
              mergeMap((size: DOMRectReadOnly) => {
                // Step 2, layout base "canvas" of chart
                //
                this.chart.resize(this.chartContainer?.nativeElement, size);

                return this._data;
              }),

              takeUntil(this._onDestroy$)
            );
          })
        )
        .subscribe((datasets: any[][]) => {
          // Step 3, add data
          //
          this.chart.data(this.chartContainer?.nativeElement, datasets);
        });
    }
  }

  ngOnDestroy() {
    this._onDestroy$.next(true);
  }
}
