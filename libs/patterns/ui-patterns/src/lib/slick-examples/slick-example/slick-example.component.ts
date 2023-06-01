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
    // dots: true,
    // infinite: true
    slidesToShow: 3,
    slidesToScroll: 3
    // rows: 2
    // slidesPerRow: 3
  };
}
