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
  customPaging: (slicer: any, i: number) => string;
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

export function defaults(): NgPatSlickCarouselSettings {
  return {
    accessibility: true,
    adaptiveHeight: false,
    arrows: true,
    asNavFor: null,
    // prevArrow: '<button class="slick-examples-prev" aria-label="Previous" type="button">Previous</button>',
    // nextArrow: '<button class="slick-examples-next" aria-label="Next" type="button">Next</button>',
    autoplay: false,
    autoplaySpeed: 3000,
    centerMode: false,
    centerPadding: '50px',
    cssEase: 'ease',
    customPaging: function (slider: any, i: number) {
      // return $('<button type="button" />').text(i + 1);
      return '';
    },
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
}

const initials = {
  animating: false,
  dragging: false,
  autoPlayTimer: null,
  currentDirection: 0,
  currentLeft: null,
  currentSlide: 0,
  direction: 1,
  $dots: null,
  listWidth: null,
  listHeight: null,
  loadIndex: 0,
  $nextArrow: null,
  $prevArrow: null,
  scrolling: false,
  slideCount: null,
  slideWidth: null,
  $slideTrack: null,
  $slides: null,
  sliding: false,
  slideOffset: 0,
  swipeLeft: null,
  swiping: false,
  $list: null,
  touchObject: {},
  transformsEnabled: false,
  unslicked: false
};
