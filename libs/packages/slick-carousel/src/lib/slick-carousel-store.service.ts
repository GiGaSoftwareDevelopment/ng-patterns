import { Injectable } from '@angular/core';
import {
  defaultSlickCarouselSettings,
  NgPatSlickCarouselSettings
} from '@ngpat/slick-carousel';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class SlickCarouselStore {
  state$: BehaviorSubject<NgPatSlickCarouselSettings> =
    new BehaviorSubject<NgPatSlickCarouselSettings>({
      ...defaultSlickCarouselSettings
    });

  get state() {
    return this.state$.value;
  }

  next(state: Partial<NgPatSlickCarouselSettings>): void {
    this.state$.next({
      ...this.state,
      ...state
    });
  }
}
