import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  QueryList,
  ViewContainerRef,
  ViewEncapsulation
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReplaySubject, Subject, takeUntil } from 'rxjs';
import { SlickCarouselStore } from './slick-carousel-store.service';
import {
  defaultSlickCarouselSettings,
  NgPatSlickCarouselSettings
} from './slick-carousel.model';

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

  @ContentChildren(NgPatSlickSlide) $slides: QueryList<NgPatSlickSlide> | null =
    null;

  private _settings: NgPatSlickCarouselSettings = {
    ...defaultSlickCarouselSettings
  };

  @Input()
  set settings(settings: Partial<NgPatSlickCarouselSettings>) {
    this._settings = {
      ...this._settings,
      ...settings
    };
  }

  get settings() {
    return this._settings;
  }

  private _initialized = false;
  resize$: ReplaySubject<DOMRectReadOnly> = new ReplaySubject<DOMRectReadOnly>(
    1
  );

  private _resizeObserver: ResizeObserver;

  constructor(private el: ElementRef, public store: SlickCarouselStore) {
    this._resizeObserver = new ResizeObserver((entries, observer) => {
      this.resize$.next(entries[0].contentRect);
    });

    this._resizeObserver.observe(this.el.nativeElement);
  }

  ngOnInit() {}

  ngAfterContentInit() {
    if (!this._initialized && this.$slides?.length) {
      this._initialized = true;

      this.resize$
        .pipe(takeUntil(this._onDestroy$))
        .subscribe((resize: DOMRectReadOnly) => {});

      console.log(this.settings);
    }
  }

  ngOnDestroy() {
    this._onDestroy$.next(true);
  }
}
