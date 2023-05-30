import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  Directive,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
  QueryList,
  TemplateRef,
  ViewChild,
  ViewChildren,
  ViewContainerRef,
  ViewEncapsulation
} from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { defaults, NgPatSlickCarouselSettings } from './slick-carousel.models';

@Directive({
  standalone: true,
  selector: `slick-slide, ng-pat-slick-slide, [ng-pat-slick-slide], [ngPatSlickSlide]`,
  host: {
    class: 'ng-pat-slick-slide, slick-slide',
    '[attr.data-slick-index]': 'index'
  }
})
export class NgPatSlickSlide {
  @Input() index = 0;

  constructor(public templateRef: ViewContainerRef) {}
}

@Component({
  selector: 'slider, ng-pat-slick-carousel',
  standalone: true,
  imports: [CommonModule, NgPatSlickSlide],
  templateUrl: './slick-carousel.component.html',
  styleUrls: ['./slick-carousel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'ng-pat-slick-carousel, slider',
    '[class.slick-initialized]': 'initialized'
  }
})
export class SlickCarouselComponentBak implements AfterContentInit, OnInit {
  static instanceUid = 0;

  @ContentChildren(NgPatSlickSlide) $slides: QueryList<NgPatSlickSlide> | null =
    null;
  @ViewChild('prevArrow', { static: true })
  prevArrow!: ElementRef<HTMLElement>;
  @ViewChild('nextArrow', { static: true })
  nextArrow!: ElementRef<HTMLElement>;
  @ViewChild('slickTrack', { static: true })
  slickTrack!: ElementRef<HTMLElement>;

  @Input() settings: Partial<NgPatSlickCarouselSettings> = {};

  initialized = false;
  slideCount = 0;

  activeBreakpoint = null;
  animType = null;
  animProp = null;
  breakpoints: any = [];
  breakpointSettings: any[] = [];
  cssTransitions = false;
  focussed = false;
  interrupted = false;
  hidden = 'hidden';
  paused = true;
  positionProp = null;
  respondTo = null;
  rowCount = 1;
  shouldClick = true;
  $slider: HTMLElement = this.ref.nativeElement;
  $slidesCache = null;
  transformType = null;
  transitionType = null;
  visibilityChange = 'visibilitychange';
  windowWidth = 0;
  windowTimer = null;

  currentSlide: any = null;
  originalSettings: any;

  private options: any;

  // A simple way to check for HTML strings
  // Strict HTML recognition (must start with <)
  // Extracted from jQuery v1.11 source
  htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/;

  constructor(
    private ref: ElementRef<any>,
    @Inject(DOCUMENT) private doc: Document
  ) {}

  ngOnInit() {
    const _ = this;
    _.options = {
      ...defaults(),
      ...this.settings
    };

    _.currentSlide = _.options.initialSlide;
    _.originalSettings = _.options;

    // @ts-ignore
    if (typeof this.doc['mozHidden'] !== 'undefined') {
      _.hidden = 'mozHidden';
      _.visibilityChange = 'mozvisibilitychange';
      // @ts-ignore
    } else if (typeof this.doc['webkitHidden'] !== 'undefined') {
      _.hidden = 'webkitHidden';
      _.visibilityChange = 'webkitvisibilitychange';
    }

    SlickCarouselComponentBak.instanceUid =
      SlickCarouselComponentBak.instanceUid++;

    this.registerBreakpoints();
  }

  buildArrows() {
    const _ = this;

    if (_.options.arrows) {
      if (_.slideCount > _.options.slidesToShow) {
        _.prevArrow.nativeElement.classList.remove('slick-hidden');
        _.prevArrow.nativeElement.removeAttribute('aria-hidden');
        _.prevArrow.nativeElement.removeAttribute('tabindex');

        _.nextArrow.nativeElement.classList.remove('slick-hidden');
        _.nextArrow.nativeElement.removeAttribute('aria-hidden');
        _.nextArrow.nativeElement.removeAttribute('tabindex');

        if (_.options.infinite !== true) {
          _.prevArrow.nativeElement.classList.add('slick-disabled');
          _.prevArrow.nativeElement.setAttribute('aria-disabled', 'true');
        }
      } else {
        _.prevArrow.nativeElement.classList.add('slick-disabled');
        _.prevArrow.nativeElement.setAttribute('aria-disabled', 'true');
        _.prevArrow.nativeElement.setAttribute('tabindex', '-1');
      }
    }
  }

  buildOut() {
    const _ = this;
    /*
    _.$slides =
            _.$slider
                .children( _.options.slide + ':not(.slick-cloned)')
                .addClass('slick-slide');
     */
    _.slideCount = this.$slides?.length || 0;

    if (this.$slides) {
      this.$slides.forEach((slide: any, index: number) => {
        slide.index = index;
      });

      /*
      _.$slides.each(function(index, element) {
            $(element)
                .attr('data-slick-index', index)
                .data('originalStyling', $(element).attr('style') || ''); // <- TODO
        });

        _.$slider.addClass('slick-slider');

        _.$slideTrack = (_.slideCount === 0) ?
            $('<div class="slick-track"/>').appendTo(_.$slider) :
            _.$slides.wrapAll('<div class="slick-track"/>').parent();

        _.$list = _.$slideTrack.wrap(
            '<div class="slick-list"/>').parent();
       */

      this.slickTrack.nativeElement.style.opacity = '0';

      if (_.options.centerMode === true || _.options.swipeToSlide === true) {
        _.options.slidesToScroll = 1;
      }

      /* TODO implement
      $('img[data-lazy]', _.$slider).not('[src]').addClass('slick-loading');

       */
    }

    this.setupInfinite();
    this.buildArrows();
  }

  /**
   * TODO REDO
   */
  buildRows() {
    const _ = this;
    // let a, b, c, newSlides, numOfSlides, originalSlides, slidesPerSection;
    // newSlides = document.createDocumentFragment();
    // originalSlides = this.$slides || new QueryList<NgPatSlickSlide>();
    //
    // console.log('_.options.rows', _.options.rows);
    //
    if (_.options.rows > 0) {
      _.$slides?.forEach((slide: NgPatSlickSlide) => {
        console.log(slide);
        slide.templateRef.element.nativeElement.style.width = `${
          100 / _.options.slidesPerRow
        }%`;
        slide.templateRef.element.nativeElement.style.display = 'inline-block';
      });

      //   slidesPerSection = _.options.slidesPerRow * _.options.rows;
      //   numOfSlides = Math.ceil(originalSlides.length / slidesPerSection);
      // for (a = 0; a < numOfSlides; a++) {
      //   let slide = document.createElement('div');
      //   for (b = 0; b < _.options.rows; b++) {
      //     let row = document.createElement('div');
      //     for (c = 0; c < _.options.slidesPerRow; c++) {
      //       let target =
      //         a * slidesPerSection + (b * _.options.slidesPerRow + c);
      //
      //       if (originalSlides.get(target)) {
      //         /*
      //          .css({
      //               'width':(100 / _.options.slidesPerRow) + '%',
      //               'display': 'inline-block'
      //           });
      //          */
      //         const element =
      //           originalSlides.get(target)?.templateRef.element.nativeElement;
      //         element.style.width = `${100 / _.options.slidesPerRow}%`;
      //         element.style.display = 'inline-block';
      //
      //         row.appendChild(element);
      //       }
      //     }
      //     slide.appendChild(row);
      //   }
      //   newSlides.appendChild(slide);
      // }
      //
      // for (let i: number = 0; i < _.$slider.children.length; i++) {
      //   _.$slider.removeChild(_.$slider.children[i]);
      // }
      //
      // this.slickTrack.nativeElement.append(newSlides);
    }
  }

  init(creation: boolean) {
    const _ = this;
    // console.log(_.$slider);
    if (!_.initialized) {
      _.initialized = true;

      console.log('this.options', this.options);

      this.buildRows();
      this.buildOut();
    }
  }

  registerBreakpoints() {
    const _ = this;
    const responsiveSettings = _.options.responsive || null;
    let l = 0;
    let currentBreakpoint = null;

    if (Array.isArray(responsiveSettings) && responsiveSettings.length) {
      _.respondTo = _.options._respondTo || 'window';

      for (const breakpoint in responsiveSettings) {
        l = _.breakpoints.length - 1;

        if (responsiveSettings.hasOwnProperty(breakpoint)) {
          currentBreakpoint = responsiveSettings[breakpoint].breakpoint;

          // loop through the breakpoints and cut out any existing
          // ones with the same breakpoint number, we don't want dupes.
          while (l >= 0) {
            if (_.breakpoints[l] && _.breakpoints[l] === currentBreakpoint) {
              _.breakpoints.splice(l, 1);
            }
            l--;
          }

          _.breakpoints.push(currentBreakpoint);
          _.breakpointSettings[currentBreakpoint] =
            responsiveSettings[breakpoint].settings;
        }
      }

      _.breakpoints.sort(function (a: number, b: number) {
        return _.options.mobileFirst ? a - b : b - a;
      });
    }
  }

  setupInfinite() {
    const _ = this;
    // let i, slideIndex, infiniteCount;

    if (_.options.fade === true) {
      _.options.centerMode = false;
    }

    // if (_.options.infinite === true && _.options.fade === false) {
    //   slideIndex = null;
    //
    //   // if (_.slideCount > _.options.slidesToShow) {
    //   //   if (_.options.centerMode === true) {
    //   //     infiniteCount = _.options.slidesToShow + 1;
    //   //   } else {
    //   //     infiniteCount = _.options.slidesToShow;
    //   //   }
    //   //
    //   //   // for (i = _.slideCount; i > _.slideCount - infiniteCount; i -= 1) {
    //   //   //   slideIndex = i - 1;
    //   //   //   _.$slides
    //   //   //     ?.get(slideIndex)
    //   //   //     ?.templateRef.element.nativeElement.cloneNode(true)
    //   //   //     .removeAttribute('id');
    //   //   //
    //   //   //   const node = _.$slides
    //   //   //     ?.get(slideIndex)
    //   //   //     ?.templateRef.element.nativeElement.cloneNode(true)
    //   //   //
    //   //   //   node.setAttribute('data-slick-index', slideIndex - _.slideCount);
    //   //   //
    //   //   //   _.slickTrack.nativeElement.prepend(node);
    //   //   //
    //   //   //   _.$slides
    //   //   //     ?.get(slideIndex)
    //   //   //     ?.templateRef.element.nativeElement.cloneNode(true)
    //   //   //     .setAttribute('data-slick-index', slideIndex - _.slideCount);
    //   //   // }
    //   // }
    // }
  }

  ngAfterContentInit() {
    if (this.$slides) {
      this.init(true);
    }
  }
}
