import {
  NgPatSlickCarouselSettings,
  ngPatSlickConfig
} from './slick-carousel.model';

export function getSlickListWidth(resize: DOMRectReadOnly) {
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

  if (options.infinite) {
    if (slideCount <= options.slidesToShow) {
      ++pagerQty;
    } else {
      while (breakPoint < slideCount) {
        ++pagerQty;
        breakPoint = counter + options.slidesToScroll;
        counter +=
          options.slidesToScroll <= options.slidesToShow
            ? options.slidesToScroll
            : options.slidesToShow;
      }
    }
  } else if (options.centerMode) {
    pagerQty = slideCount;
  } else if (!options.asNavFor) {
    pagerQty =
      1 +
      Math.ceil((slideCount - options.slidesToShow) / options.slidesToScroll);
  } else {
    while (breakPoint < slideCount) {
      ++pagerQty;
      breakPoint = counter + options.slidesToScroll;
      counter +=
        options.slidesToScroll <= options.slidesToShow
          ? options.slidesToScroll
          : options.slidesToShow;
    }
  }

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
