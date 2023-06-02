import { Component } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { NgPatSlickSlide, SlickCarouselComponent } from '@ngpat/slick-carousel';
import { NgPatSlickCarouselSettings } from '@ngpat/slick-carousel';

@Component({
  selector: 'pat-slick-examples-example',
  standalone: true,
  imports: [
    CommonModule,
    SlickCarouselComponent,
    NgPatSlickSlide,
    NgOptimizedImage
  ],
  templateUrl: './slick-example.component.html',
  styleUrls: ['./slick-example.component.scss'],
  host: {
    class: 'sample-page-layout'
  }
})
export class SlickExampleComponent {
  settings: Partial<NgPatSlickCarouselSettings> = {
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    touchThreshold: 5,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          arrows: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
}
