import { CommonModule } from '@angular/common';
import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  Directive,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  QueryList,
  Renderer2,
  ViewChild,
  ViewContainerRef,
  ViewEncapsulation
} from '@angular/core';
import { PushPipe } from '@ngrx/component';
import {
  BehaviorSubject,
  combineLatest,
  Observable,
  ReplaySubject,
  Subject
} from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { SlickCarouselStore } from './slick-carousel-store.service';
import {
  getDotsArray,
  getSlickListWidth,
  getSlideWidth,
  registerBreakpoints
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
  @Input() width = 0;

  constructor(public templateRef: ViewContainerRef) {}
}

@Component({
  selector: 'slider, ng-pat-slick-carousel',
  standalone: true,
  imports: [CommonModule, NgPatSlickSlideDirective, PushPipe],
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

  currentSlide$: BehaviorSubject<number> = new BehaviorSubject(0);
  slideWidth$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  resize$: ReplaySubject<DOMRectReadOnly> = new ReplaySubject<DOMRectReadOnly>(
    1
  );

  slickListWidth$: Observable<number> = this.resize$.pipe(
    map(getSlickListWidth)
  );

  transition$: Observable<string> = this.store.speed$.pipe(
    map((speed: number) => {
      return `transform ${speed}ms cubic-bezier(0.25, 0.8, 0.25, 1)`;
    })
  );

  translateSlickTrack$: Observable<string> = combineLatest([
    this.slickListWidth$,
    this.slideWidth$,
    this.currentSlide$,
    this.store.translateTrackParams$
  ]).pipe(
    map(
      ([slickListWidth, slideWidth, currentSlide, translateParams]: [
        number,
        number,
        number,
        TranslateTrackParams
      ]) => {
        const translateWidth = translateParams.slidesToScroll * slideWidth;
        return `translate3d(${-(translateWidth * currentSlide)}px, 0px, 0px)`;
      }
    )
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
    private renderer: Renderer2
  ) {
    this._resizeObserver = new ResizeObserver((entries, observer) => {
      this.resize$.next(entries[0].contentRect);
    });

    this._resizeObserver.observe(this.el.nativeElement);
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
            this.checkResponsive(resize, state, registerBreakpoints(state));
          }
        );

      // console.log(this.settings);
      // console.log(this.$slickList);
      // console.log(this.$slickTrack);
    }
  }

  ngOnDestroy() {
    this._onDestroy$.next(true);
    this.store.destroy();
  }

  changeSlide(slideNumber: number) {
    this.currentSlide$.next(slideNumber);
  }

  keyHandler(event: MouseEvent) {
    console.log(event);
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
      console.log('options.variableWidth', options.variableWidth);
    } else {
      console.log('else');
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
          console.log('reset', triggerBreakpoint);
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
}
