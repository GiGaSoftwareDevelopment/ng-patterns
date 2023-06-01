export interface NgPatSlickCarouselSettings {
  accessibility: boolean;
  adaptiveHeight: boolean;
  // appendArrows: HTMLElement;
  // appendDots: HTMLElement;
  arrows: boolean;
  asNavFor: any;
  // prevArrow: string;
  // nextArrow: string;
  autoplay: boolean;
  autoplaySpeed: number;
  centerMode: boolean;
  centerPadding: string;
  cssEase: string;
  dots: boolean;
  dotsClass: string;
  draggable: boolean;
  easing: string;
  edgeFriction: number;
  fade: boolean;
  focusOnSelect: boolean;
  focusOnChange: boolean;
  infinite: boolean;
  initialSlide: number;
  lazyLoad: string;
  mobileFirst: boolean;
  pauseOnHover: boolean;
  pauseOnFocus: boolean;
  pauseOnDotsHover: boolean;
  respondTo: string;
  responsive: any;
  rows: number;
  rtl: boolean;
  slide: string;
  slidesPerRow: number;
  slidesToShow: number;
  slidesToScroll: number;
  speed: number;
  swipe: boolean;
  swipeToSlide: boolean;
  touchMove: boolean;
  touchThreshold: number;
  useCSS: boolean;
  useTransform: boolean;
  variableWidth: boolean;
  vertical: boolean;
  verticalSwiping: boolean;
  waitForAnimate: boolean;
  zIndex: number;
}

export const defaultSlickCarouselSettings: NgPatSlickCarouselSettings = {
  accessibility: true,
  adaptiveHeight: false,
  arrows: true,
  asNavFor: null,
  autoplay: false,
  autoplaySpeed: 3000,
  centerMode: false,
  centerPadding: '50px',
  cssEase: 'ease',
  dots: false,
  dotsClass: 'slick-examples-dots',
  draggable: true,
  easing: 'linear',
  edgeFriction: 0.35,
  fade: false,
  focusOnSelect: false,
  focusOnChange: false,
  infinite: true,
  initialSlide: 0,
  lazyLoad: 'ondemand',
  mobileFirst: false,
  pauseOnHover: true,
  pauseOnFocus: true,
  pauseOnDotsHover: false,
  respondTo: 'window',
  responsive: null,
  rows: 1,
  rtl: false,
  slide: '',
  slidesPerRow: 1,
  slidesToShow: 1,
  slidesToScroll: 1,
  speed: 500,
  swipe: true,
  swipeToSlide: false,
  touchMove: true,
  touchThreshold: 5,
  useCSS: true,
  useTransform: true,
  variableWidth: false,
  vertical: false,
  verticalSwiping: false,
  waitForAnimate: true,
  zIndex: 1000
};

/**
 * These settings are not configurable.
 * They are hard coded values in css or
 * other settings.
 */
export interface NgPatSlickConfig {
  /**
   * Previous and Next button panel container
   * width.
   */
  prevNextWidth: number;
}

export const ngPatSlickConfig: NgPatSlickConfig = {
  prevNextWidth: 30
};
