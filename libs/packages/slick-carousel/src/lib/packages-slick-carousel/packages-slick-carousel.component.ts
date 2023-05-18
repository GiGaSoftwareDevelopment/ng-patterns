import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ng-patterns-packages-slick-carousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './packages-slick-carousel.component.html',
  styleUrls: ['./packages-slick-carousel.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PackagesSlickCarouselComponent {}
