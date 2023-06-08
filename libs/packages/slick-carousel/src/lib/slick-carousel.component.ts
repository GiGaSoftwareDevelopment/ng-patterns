import { CommonModule } from '@angular/common';
import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  Directive,
  ElementRef,
  Input,
  OnDestroy,
  QueryList,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {
  BehaviorSubject,
  combineLatest,
  Observable,
  ReplaySubject,
  Subject
} from 'rxjs';
import { map, takeUntil, take } from 'rxjs/operators';
import { SlickCarouselStore } from './slick-carousel-store.service';
import {
  getAllSlidesTranslateDistance,
  getDotsArray,
  getNextDraggedSlide,
  getSlickListWidth,
  getSlideWidth,
  registerBreakpoints,
  transition
} from './slick-carousel.fns';
import {
  NgPatSlickCarouselSettings,
  RegisterBreakpoints,
  TranslateTrackParams
} from './slick-carousel.model';

@Directive({
  standalone: true,
  selector: `slick-slide, ng-pat-slick-slide, [ng-pat-slick-slide], [ngPatSlickSlide]`,
  host: {
    class: 'ng-pat-slick-slide, slick-slide',
    '[attr.data-slick-index]': 'index',
    '[style.width.px]': 'width'
  }
})
export class NgPatSlickSlideDirective {
  @Input() index = 0;

  private _width = 0;
  @Input()
  set width(w: number) {
    this._width = w;
    this.cd.detectChanges();
  }

  get width() {
    return this._width;
  }

  constructor(public cd: ChangeDetectorRef) {}
}

@Component({
  selector: 'slider, ng-pat-slick-carousel',
  standalone: true,
  imports: [CommonModule, NgPatSlickSlideDirective],
  providers: [SlickCarouselStore],
  templateUrl: './slick-carousel.component.html',
  styleUrls: [
    './slick-carousel.component.scss',
    './slick-carousel.component.theme.scss'
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'ng-pat-slick-carousel, slick-slider, slider'
  }
})
export class SlickCarouselComponent implements AfterContentInit, OnDestroy {
  private _onDestroy$: Subject<boolean> = new Subject();

  @ContentChildren(NgPatSlickSlideDirective)
  $slides!: QueryList<NgPatSlickSlideDirective>;
  @ViewChild('slickList', { static: true })
  $slickList!: ElementRef<HTMLElement>;
  @ViewChild('slickTrack', { static: true })
  $slickTrack!: ElementRef<HTMLElement>;

  @Input()
  set settings(settings: Partial<NgPatSlickCarouselSettings>) {
    this.store.originalSettings = settings;
    this.store.next(settings);
  }

  private slideCount = 0;
  private _initialized = false;
  private _resizeObserver: ResizeObserver;
  private activeBreakpoint: number | null = null;
  private _triggerBreakpoint: number | null = null;
  private _dragging = false;
  private _dragStartClientX = 0;
  private _dragEndClientX = 0;
  private _dragEndClientY = 0;
  private _translateStartX = 0;

  currentSlide$: BehaviorSubject<number> = new BehaviorSubject(0);
  slideWidth$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  transition$: BehaviorSubject<string> = new BehaviorSubject<string>('');

  resize$: ReplaySubject<DOMRectReadOnly> = new ReplaySubject<DOMRectReadOnly>(
    1
  );

  slickListWidth$: Observable<number> = this.resize$.pipe(
    map(getSlickListWidth)
  );

  calculateTranslate$: Observable<number> = combineLatest([
    this.slideWidth$,
    this.currentSlide$,
    this.store.translateTrackParams$
  ]).pipe(
    map(
      ([slideWidth, currentSlide, translateParams]: [
        number,
        number,
        TranslateTrackParams
      ]) => {
        const translateWidth = translateParams.slidesToScroll * slideWidth;
        return -(translateWidth * currentSlide);
      }
    )
  );

  translateSlickTrackValue$: BehaviorSubject<number> =
    new BehaviorSubject<number>(0);

  translateSlickTrack$: Observable<string> =
    this.translateSlickTrackValue$.pipe(
      map((translateNumber: number) => {
        return `translate3d(${translateNumber}px, 0px, 0px)`;
      })
    );

  $dots: ReplaySubject<number[]> = new ReplaySubject(1);

  get prevDisabled() {
    return this.store.infinite ? false : this.currentSlide$.value <= 0;
  }

  get nextDisabled() {
    return this.store.infinite
      ? false
      : this.currentSlide$.value >= this.slideCount;
  }

  constructor(
    private el: ElementRef,
    public store: SlickCarouselStore,
    private cd: ChangeDetectorRef
  ) {
    this._resizeObserver = new ResizeObserver((entries, observer) => {
      window.requestAnimationFrame(() => {
        // if (!Array.isArray(entries) || !entries.length) {
        //   return;
        // }
        this.resize$.next(entries[0].contentRect);
      });
    });

    this._resizeObserver.observe(this.el.nativeElement);

    this.calculateTranslate$
      .pipe(takeUntil(this._onDestroy$))
      .subscribe((value: number) => {
        this.translateSlickTrackValue$.next(value);
      });
  }

  ngAfterContentInit() {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const _ = this;

    if (!this._initialized && this.$slides?.length) {
      this._initialized = true;

      combineLatest([this.resize$, this.store.state$])
        .pipe(takeUntil(this._onDestroy$))
        .subscribe(
          ([resize, state]: [DOMRectReadOnly, NgPatSlickCarouselSettings]) => {
            _.setPosition(resize, state);
            const dots = getDotsArray(this.$slides.length, state);
            this.slideCount = dots.length - 1;
            this.$dots.next(dots);
            this.transition$.next(transition(state.speed));
            this.checkResponsive(resize, state, registerBreakpoints(state));
          }
        );
    }
  }

  ngOnDestroy() {
    this._onDestroy$.next(true);
    this.store.destroy();
  }

  previousHandler() {
    if (this.currentSlide$.value > 0) {
      this.currentSlide$.next(this.currentSlide$.value - 1);
    } else if (this.store.infinite) {
      this.currentSlide$.next(this.slideCount);
    }
  }

  nextHandler() {
    if (this.currentSlide$.value < this.slideCount) {
      this.currentSlide$.next(this.currentSlide$.value + 1);
    } else if (this.store.infinite) {
      this.currentSlide$.next(0);
    }
  }

  setPosition(resize: DOMRectReadOnly, options: NgPatSlickCarouselSettings) {
    this.setDimensions(resize, options);
  }

  setDimensions(resize: DOMRectReadOnly, options: NgPatSlickCarouselSettings) {
    if (options.vertical === false) {
      if (options.centerMode === true) {
        // Add center padding to slideList element
      }
    } else {
      // Set height to slideList element
      if (options.centerMode === true) {
        // Add center padding to slideList element
      }
    }

    if (options.vertical === false && options.variableWidth === false) {
      const slideWidth = Math.ceil(resize.width / options.slidesToShow);
    } else if (options.variableWidth === true) {
      // console.log('options.variableWidth', options.variableWidth);
    } else {
      // console.log('else');
    }

    if (!options.variableWidth) {
      const slideWidth = getSlideWidth(resize, options);
      this.slideWidth$.next(slideWidth);
      this.$slides.forEach((slide: NgPatSlickSlideDirective) => {
        slide.width = slideWidth;
      });
    }
  }

  /**
   *
   * @param resize
   * @param options
   * @param r - RegisterBreakpoints
   */
  checkResponsive(
    resize: DOMRectReadOnly,
    options: NgPatSlickCarouselSettings,
    r: RegisterBreakpoints
  ) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const _ = this;
    let _options: NgPatSlickCarouselSettings = <NgPatSlickCarouselSettings>{};
    let breakpoint,
      targetBreakpoint: number | null = null,
      respondToWidth = 0,
      triggerBreakpoint: number | null = null;
    const sliderWidth = resize.width;
    const windowWidth = window.innerWidth;

    if (options.respondTo === 'window') {
      respondToWidth = windowWidth;
    } else if (options.respondTo === 'slider') {
      respondToWidth = sliderWidth;
    } else if (options.respondTo === 'min') {
      respondToWidth = Math.min(windowWidth, sliderWidth);
    }

    if (
      options.responsive &&
      options.responsive.length &&
      options.responsive !== null
    ) {
      targetBreakpoint = null;

      for (breakpoint in r.breakpoints) {
        // eslint-disable-next-line no-prototype-builtins
        if (r.breakpoints.hasOwnProperty(breakpoint)) {
          if (_.store.originalSettings.mobileFirst === false) {
            if (respondToWidth < r.breakpoints[breakpoint]) {
              targetBreakpoint = r.breakpoints[breakpoint];
            }
          } else {
            if (respondToWidth > r.breakpoints[breakpoint]) {
              targetBreakpoint = r.breakpoints[breakpoint];
            }
          }
        }
      }

      if (targetBreakpoint !== null) {
        if (_.activeBreakpoint !== null) {
          if (targetBreakpoint !== _.activeBreakpoint) {
            _.activeBreakpoint = targetBreakpoint;
            _options = {
              ..._.store.originalSettings,
              ...r.breakpointSettings[targetBreakpoint]
            };
            triggerBreakpoint = targetBreakpoint;
          }
        } else {
          _.activeBreakpoint = targetBreakpoint;
          _options = {
            ..._.store.originalSettings,
            ...r.breakpointSettings[targetBreakpoint]
          };
          this.currentSlide$.next(options.initialSlide);
          triggerBreakpoint = targetBreakpoint;
        }
      } else {
        if (_.activeBreakpoint !== null) {
          _.activeBreakpoint = null;
          _options = _.store.originalSettings;
          this.currentSlide$.next(options.initialSlide);
          triggerBreakpoint = targetBreakpoint;
          _.store.updateSettings.next({
            breakpoint: triggerBreakpoint,
            settings: _options
          });
        }
      }

      if (triggerBreakpoint) {
        _.store.updateSettings.next({
          breakpoint: triggerBreakpoint,
          settings: _options
        });
      }
    }
  }

  changeSlide(slideNumber: number) {
    this.currentSlide$.next(slideNumber);
    this.cd.detectChanges();
  }

  dragStart(event: MouseEvent) {
    if (this.store.draggable) {
      this.onDragStart(event);
    }
  }

  drag(event: MouseEvent) {
    if (this.store.draggable) {
      this.onDrag(event);
    }
  }

  dragEnd(event: MouseEvent) {
    if (!this.store.draggable) {
      return;
    }
    if (!this._dragging) {
      return;
    }
    this.onDragEnd(event);
  }

  touchStart(event: TouchEvent): void {
    const clientX = event.touches[0].clientX;
    const clientY = event.touches[0].clientY;
    this.dragStart(<MouseEvent>{ clientX, clientY });
  }

  touchMove(event: TouchEvent): void {
    const clientX = event.touches[0].clientX;
    const clientY = event.touches[0].clientY;
    this.drag(<MouseEvent>{ clientX, clientY });
  }

  touchEnd(event: TouchEvent): void {
    this.dragEnd(<MouseEvent>{
      clientX: this._dragEndClientX,
      clientY: this._dragEndClientY
    });
  }

  onDragStart(event: MouseEvent) {
    this._dragging = true;
    this._translateStartX = this.translateSlickTrackValue$.value;
    this._dragStartClientX = event.clientX;
    this.transition$.next('');
  }

  onDrag(event: MouseEvent) {
    if (this._dragging) {
      this._dragEndClientX = event.clientX;
      this._dragEndClientY = event.clientY;
      this.translateSlickTrackValue$.next(this.calculateDragXDistance(event));
    }
  }

  onDragEnd(event: MouseEvent) {
    if (!this._dragging) {
      return;
    }
    const translateEndX = this.calculateDragXDistance(event);
    this._dragging = false;
    this.transition$.next(transition(this.store.speed));

    combineLatest([
      this.slideWidth$,
      this.store.translateTrackParams$,
      this.slickListWidth$
    ])
      .pipe(take(1))
      .subscribe(
        ([slideWidth, translateParams, slickListWidth]: [
          number,
          TranslateTrackParams,
          number
        ]) => {
          const minSwipe: number =
            slickListWidth / translateParams.touchThreshold;

          if (Math.abs(event.clientX - this._dragStartClientX) >= minSwipe) {
            const tsds = getAllSlidesTranslateDistance(
              this.slideCount + 1,
              slideWidth,
              translateParams
            );

            let nextSlide = 0;
            if (this._translateStartX < translateEndX) {
              nextSlide = getNextDraggedSlide(translateEndX, tsds, 'lower');
            } else {
              nextSlide = getNextDraggedSlide(translateEndX, tsds, 'upper');
            }
            this.currentSlide$.next(nextSlide);
          } else {
            this.currentSlide$.next(this.currentSlide$.value);
          }
        }
      );
  }

  private calculateDragXDistance(event: MouseEvent) {
    return this._translateStartX + (event.clientX - this._dragStartClientX);
  }
}
