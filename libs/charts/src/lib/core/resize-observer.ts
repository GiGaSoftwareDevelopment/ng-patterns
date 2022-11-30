import {
  Directive,
  ElementRef,
  EventEmitter,
  Inject,
  Injectable,
  NgZone,
  OnDestroy,
  Output
} from '@angular/core';
import {ReplaySubject, Subject, Subscription, timer} from 'rxjs';
import {debounceTime, map, takeUntil} from 'rxjs/operators';
import {ResizeObserverEntry} from './chart.models';
import {WINDOW} from './window.factory';
import { WindowService } from './window.service';

export class BaseResizeObserver {
  onDestroy$: Subject<boolean> = new Subject();

  resize$: ReplaySubject<DOMRectReadOnly> = new ReplaySubject<DOMRectReadOnly>(
    1
  );

  // Browser Implementation
  private ro: any;

  // Custom Implementation
  private customSub: Subscription = Subscription.EMPTY;
  private cancel: Subject<boolean> = new Subject<boolean>();

  constructor(
    protected el: ElementRef,
    protected zone: NgZone,
    protected _winResize: WindowService,
    protected _win: Window
  ) {
    // ResizeObserver only supported by Chrome
    // Custom type is not working... so testing
    // if ResizeObserver is on window object
    if ((<any>this._win)['ResizeObserver']) {
      // const ResizeObserver = window['ResizeObserver'];
      const ResizeObserver: any = (<any>this._win)['ResizeObserver'];

      this.ro = new ResizeObserver((entries: ResizeObserverEntry[]) => {
        this.zone.run(() => {
          this.resize$.next(entries[0].contentRect);
        });
      });

      this.ro.observe(this.el.nativeElement);
    } else {
      // Manual ResizeObserver if Native ResizeObserver is not available
      //
      this._winResize.onResizeEvent$
        .pipe(takeUntil(this.onDestroy$))
        .subscribe(this.onCustomResizeListener.bind(this));
      this.onCustomResizeListener.call(this);
    }
  }

  /**
   * For older browsers where window.ResizeObserver does not exist
   */
  private onCustomResizeListener() {
    let previous = 0;
    let count = 0;

    if (!this.customSub.closed) {
      this.customSub.unsubscribe();
    }

    this.customSub = timer(0, 20)
      .pipe(
        map(() => this.el.nativeElement.getBoundingClientRect()),
        takeUntil(this.cancel)
      )
      .subscribe((r: DOMRect) => {
        if (r.width === previous) {
          if (count === 8) {
            this.cancel.next(true);
          }
          count++;
        } else {
          previous = r.width;
          this.zone.run(() => {
            this.resize$.next(r);
          });
        }
      });
  }

  destroy() {
    if (this.ro) {
      this.ro.unobserve(this.el.nativeElement);
      this.ro.disconnect();
    }
    window.removeEventListener(
      'resize',
      this.onCustomResizeListener.bind(this)
    );
    this.customSub.unsubscribe();
  }
}

@Directive({selector: '[uiuxResizeObserver]'})
export class UiResizeObserverDirective
  extends BaseResizeObserver
  implements OnDestroy
{
  @Output() public resizeEvent = new EventEmitter<DOMRectReadOnly>();

  constructor(
    protected override el: ElementRef,
    protected override zone: NgZone,
    protected override _winResize: WindowService,
    @Inject(WINDOW) protected override _win: Window
  ) {
    super(el, zone, _winResize, _win);

    this.resize$
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((domRectReadOnly: DOMRectReadOnly) => {
        this.resizeEvent.emit(domRectReadOnly);
      });
  }

  ngOnDestroy() {
    super.destroy();
  }
}

@Injectable()
export class UiResizeObserverService implements OnDestroy {
  private _baseResizeObserver: BaseResizeObserver | undefined;

  onResize$: ReplaySubject<DOMRectReadOnly> =
    new ReplaySubject<DOMRectReadOnly>(1);

  constructor(
    protected zone: NgZone,
    protected _winResize: WindowService,
    @Inject(WINDOW) protected _win: Window
  ) {}

  initialize(el: ElementRef) {
    this.ngOnDestroy();

    this._baseResizeObserver = new BaseResizeObserver(
      el,
      this.zone,
      this._winResize,
      this._win
    );

    this._baseResizeObserver.resize$
      .pipe(debounceTime(100), takeUntil(this._baseResizeObserver.onDestroy$))
      .subscribe((d: DOMRectReadOnly) => {
        this.onResize$.next(d);
      });
  }

  /**
   * Implement in composite class
   */
  ngOnDestroy() {
    if (this._baseResizeObserver) {
      this._baseResizeObserver.destroy();
      this._baseResizeObserver = undefined;
    }
  }
}
