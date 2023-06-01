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
  combineLatest,
  Observable,
  ReplaySubject,
  Subject,
  takeUntil
} from 'rxjs';
import { map } from 'rxjs/operators';
import { SlickCarouselStore } from './slick-carousel-store.service';
import {
  getDotCount,
  getDotsArray,
  getSlickListWidth,
  getSlideWidth
} from './slick-carousel.fns';
import {
  NgPatSlickCarouselSettings,
  ngPatSlickConfig
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
export class NgPatSlickSlide {
  @Input() index = 0;
  @Input() width = 0;

  constructor(public templateRef: ViewContainerRef) {}
}

@Component({
  selector: 'slider, ng-pat-slick-carousel',
  standalone: true,
  imports: [CommonModule, NgPatSlickSlide, PushPipe],
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
export class SlickCarouselComponent
  implements AfterContentInit, OnInit, OnDestroy
{
  private _onDestroy$: Subject<boolean> = new Subject();

  @ContentChildren(NgPatSlickSlide) $slides!: QueryList<NgPatSlickSlide>;
  @ViewChild('slickList', { static: true })
  $slickList!: ElementRef<HTMLElement>;
  @ViewChild('slickTrack', { static: true })
  $slickTrack!: ElementRef<HTMLElement>;

  @Input()
  set settings(settings: Partial<NgPatSlickCarouselSettings>) {
    this.store.next(settings);
  }

  get settings() {
    return this.store.state;
  }

  private _initialized = false;
  resize$: ReplaySubject<DOMRectReadOnly> = new ReplaySubject<DOMRectReadOnly>(
    1
  );

  $slickListWidth: Observable<number> = this.resize$.pipe(
    map(getSlickListWidth)
  );

  $dots: ReplaySubject<number[]> = new ReplaySubject(1);

  private _resizeObserver: ResizeObserver;

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

  ngOnInit() {
    // noop
  }

  ngAfterContentInit() {
    const _ = this;

    if (!this._initialized && this.$slides?.length) {
      this._initialized = true;

      combineLatest([this.resize$, this.store.state$])
        .pipe(takeUntil(this._onDestroy$))
        .subscribe(
          ([resize, state]: [DOMRectReadOnly, NgPatSlickCarouselSettings]) => {
            _.setPosition(resize, state);
            console.log(getDotCount(this.$slides.length, state));
            this.$dots.next(getDotsArray(this.$slides.length, state));
          }
        );

      // console.log(this.settings);
      // console.log(this.$slickList);
      // console.log(this.$slickTrack);
    }
  }

  ngOnDestroy() {
    this._onDestroy$.next(true);
  }

  changeSlide(slideNumber: number) {
    console.log(slideNumber);
  }

  keyHandler(event: MouseEvent) {
    console.log(event);
  }

  previousHandler(event: MouseEvent) {
    console.log(event);
  }

  nextHandler(event: MouseEvent) {
    console.log(event);
  }

  setPosition(resize: DOMRectReadOnly, options: NgPatSlickCarouselSettings) {
    const _ = this;
    this.setDimensions(resize, options);
  }

  setDimensions(resize: DOMRectReadOnly, options: NgPatSlickCarouselSettings) {
    const _ = this;

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
    } else {
    }

    if (!options.variableWidth) {
      const slideWidth = getSlideWidth(resize, options);
      this.$slides.forEach((slide: NgPatSlickSlide) => {
        slide.width = slideWidth;
      });
    }
  }

  initializeEvents() {}
}
