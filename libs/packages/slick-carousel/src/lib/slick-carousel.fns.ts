import {
  NgPatSlickCarouselSettings,
  ngPatSlickConfig,
  RegisterBreakpoints,
  TranslateBound,
  TranslateSlideDistribution,
  TranslateTrackParams
} from './slick-carousel.model';

export function getSlickListWidth(resize: DOMRectReadOnly): number {
  return resize.width - ngPatSlickConfig.prevNextWidth * 2;
}

export function getSlideWidth(
  resize: DOMRectReadOnly,
  options: NgPatSlickCarouselSettings
) {
  return Math.ceil(getSlickListWidth(resize) / options.slidesToShow);
}

/**
 *
 * @param slideCount - number of slides in content
 * @param options - NgPatSlickCarouselSettings
 */
export function getDotCount(
  slideCount: number,
  options: NgPatSlickCarouselSettings
) {
  let breakPoint = 0;
  let counter = 0;
  let pagerQty = 0;

  // if (options.infinite) {
  //   console.log('getDotCount => options.infinite');
  //   if (slideCount <= options.slidesToShow) {
  //     ++pagerQty;
  //   } else {
  //     while (breakPoint < slideCount) {
  //       ++pagerQty;
  //       breakPoint = counter + options.slidesToScroll;
  //       counter +=
  //         options.slidesToScroll <= options.slidesToShow
  //           ? options.slidesToScroll
  //           : options.slidesToShow;
  //     }
  //   }
  // } else
  if (options.centerMode) {
    // console.log('getDotCount => options.centerMode');
    pagerQty = slideCount;
  } else if (!options.asNavFor) {
    // console.log('getDotCount => !options.asNavFor');
    pagerQty =
      1 +
      Math.ceil((slideCount - options.slidesToShow) / options.slidesToScroll);
  } else {
    // console.log('getDotCount => else');
    while (breakPoint < slideCount) {
      ++pagerQty;
      breakPoint = counter + options.slidesToScroll;
      counter +=
        options.slidesToScroll <= options.slidesToShow
          ? options.slidesToScroll
          : options.slidesToShow;
    }
  }

  // console.log('getDotCount => pagerQty', pagerQty);
  return pagerQty;
}

export function getDotsArray(
  slideCount: number,
  options: NgPatSlickCarouselSettings
): number[] {
  const total = getDotCount(slideCount, options);
  const dots: number[] = [];
  for (let i = 0; i < total; i++) {
    dots.push(i);
  }

  return dots;
}

export function registerBreakpoints(
  options: NgPatSlickCarouselSettings
): RegisterBreakpoints {
  let breakpoint, currentBreakpoint, l;
  const responsiveSettings = options.responsive || null;

  const registerBreakpoints: RegisterBreakpoints = {
    respondTo: options.respondTo || 'window',
    breakpoints: [],
    breakpointSettings: []
  };

  if (Array.isArray(responsiveSettings) && responsiveSettings.length) {
    for (breakpoint in responsiveSettings) {
      l = registerBreakpoints.breakpoints.length - 1;

      if (
        responsiveSettings &&
        // eslint-disable-next-line no-prototype-builtins
        responsiveSettings?.hasOwnProperty(breakpoint)
      ) {
        currentBreakpoint = responsiveSettings[breakpoint].breakpoint;

        // loop through the breakpoints and cut out any existing
        // ones with the same breakpoint number, we don't want dupes.
        while (l >= 0) {
          if (
            registerBreakpoints.breakpoints[l] &&
            registerBreakpoints.breakpoints[l] === currentBreakpoint
          ) {
            registerBreakpoints.breakpoints.splice(l, 1);
          }
          l--;
        }

        registerBreakpoints.breakpoints.push(currentBreakpoint);
        registerBreakpoints.breakpointSettings[currentBreakpoint] =
          responsiveSettings[breakpoint].settings;
      }
    }
  }

  return registerBreakpoints;
}

/**
 *
 * @param speed
 */
export function transition(speed: number): string {
  return `transform ${speed}ms cubic-bezier(0.25, 0.8, 0.25, 1)`;
}

/**
 *
 * @param slideCount
 * @param slideWidth
 * @param params
 */
export function getAllSlidesTranslateDistance(
  slideCount: number,
  slideWidth: number,
  params: TranslateTrackParams
): TranslateSlideDistribution[] {
  const translateSlidesX: TranslateSlideDistribution[] = [];

  for (let i = 0; i < slideCount; i++) {
    const translateDistance = -(i * params.slidesToScroll * slideWidth);
    translateSlidesX.push({
      slideNumber: i,
      translateDistance
    });
  }

  return translateSlidesX;
}

/**
 *
 * @param translateEnd
 * @param tsds
 * @param bound
 */
export function getNextDraggedSlide(
  translateEnd: number,
  tsds: TranslateSlideDistribution[],
  bound: TranslateBound
): number {
  // Find dragged translation value in between slide translations.
  let lowerBound: TranslateSlideDistribution | null = null;
  let upperbound: TranslateSlideDistribution | null = null;
  for (let i = 0; i < tsds.length; i++) {
    if (translateEnd < tsds[i].translateDistance) {
      lowerBound = tsds[i];
    }

    if (translateEnd > tsds[tsds.length - 1 - i].translateDistance) {
      upperbound = tsds[tsds.length - 1 - i];
    }
  }

  if (bound === 'upper') {
    return upperbound?.slideNumber || tsds.pop()?.slideNumber || 0;
  } else {
    return lowerBound?.slideNumber || tsds.shift()?.slideNumber || 0;
  }
}
