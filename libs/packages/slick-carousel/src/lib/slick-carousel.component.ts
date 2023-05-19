import {
  ChangeDetectionStrategy,
  Component, Directive,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Directive({
             standalone: true,
             selector: `slick-slide, ng-pat-slick-slide, [ng-pat-slick-slide], [ngPatSlickSlide]`,
             host: {
               class: 'ng-pat-slick-examples-slide, slick-examples-slide',
             },
           })
export class NgPatSlickSlide {
}


@Component({
             selector: 'slider, ng-pat-slick-examples-carousel',
             standalone: true,
             imports: [CommonModule, NgPatSlickSlide],
             templateUrl: './slick-carousel.component.html',
             styleUrls: ['./slick-carousel.component.scss'],
             changeDetection: ChangeDetectionStrategy.OnPush,
             encapsulation: ViewEncapsulation.None,
             host: {
               class: 'ng-pat-slick-examples-carousel, slider, slick-examples-slider',
             },
           })
export class SlickCarouselComponent {


}
