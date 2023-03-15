import {
  Directive,
  ElementRef,
  EventEmitter,
  Injectable,
  NgZone,
  OnDestroy,
  Output
} from '@angular/core';
import {ReplaySubject, Subject, Subscription, timer} from 'rxjs';
import {debounceTime, map, takeUntil} from 'rxjs/operators';
import {NgPatResizeObserverEntry} from './chart.models';
import {WINDOW_PROVIDERS, WindowService} from '@ngpat/utils';

export class NgPatBaseResizeObserver {
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
    protected _win: WindowService
  ) {
    // ResizeObserver only supported by Chrome
    // Custom type is not working... so testing
    // if ResizeObserver is on window object
    if ((<any>this._win.nativeWindow)['ResizeObserver']) {
      // const ResizeObserver = window['ResizeObserver'];
      const ResizeObserver: any = (<any>this._win.nativeWindow)[
        'ResizeObserver'
      ];

      this.ro = new ResizeObserver((entries: NgPatResizeObserverEntry[]) => {
        this.zone.run(() => {
          this.resize$.next(entries[0].contentRect);
        });
      });

      this.ro.observe(this.el.nativeElement);
    } else {
      // Manual ResizeObserver if Native ResizeObserver is not available
      //
      this._win.onResizeEvent$
        .pipe(takeUntil(this.onDestroy$))
        .subscribe(this.onCustomResizeListener.bind(this));
      this.onCustomResizeListener.call(this);
    }
  }

  /**
   * For older browsers where window.ResizeObserver does not exist
   * @private
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
    this._win.nativeWindow.removeEventListener(
      'resize',
      this.onCustomResizeListener.bind(this)
    );
    this.customSub.unsubscribe();
  }
}

@Directive({
  standalone: true,
  selector: '[ngPatResizeObserver]',
  providers: [...WINDOW_PROVIDERS]
})
export class NgPatResizeObserverDirective
  extends NgPatBaseResizeObserver
  implements OnDestroy
{
  // eslint-disable-next-line @angular-eslint/no-output-native
  @Output() public resize = new EventEmitter<DOMRectReadOnly>();

  constructor(
    protected override el: ElementRef,
    protected override zone: NgZone,
    protected override _win: WindowService
  ) {
    super(el, zone, _win);

    this.resize$
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((domRectReadOnly: DOMRectReadOnly) => {
        this.resize.emit(domRectReadOnly);
      });
  }

  ngOnDestroy() {
    super.destroy();
  }
}

@Injectable()
export class NgPatResizeObserverService implements OnDestroy {
  /**
   *
   * @ignore
   */
  private _baseResizeObserver: NgPatBaseResizeObserver | undefined;

  /**
   * Emits size of element upon resize of browser window.
   */
  onResize$: ReplaySubject<DOMRectReadOnly> =
    new ReplaySubject<DOMRectReadOnly>(1);

  constructor(protected zone: NgZone, protected _winResize: WindowService) {}

  initialize(el: ElementRef) {
    this.ngOnDestroy();

    this._baseResizeObserver = new NgPatBaseResizeObserver(
      el,
      this.zone,
      this._winResize
    );

    this._baseResizeObserver.resize$
      .pipe(debounceTime(100), takeUntil(this._baseResizeObserver.onDestroy$))
      .subscribe((d: DOMRectReadOnly) => {
        this.onResize$.next(d);
      });
  }

  /**
   * @ignore
   */
  ngOnDestroy() {
    if (this._baseResizeObserver) {
      this._baseResizeObserver.destroy();
      this._baseResizeObserver = undefined;
    }
  }
}
