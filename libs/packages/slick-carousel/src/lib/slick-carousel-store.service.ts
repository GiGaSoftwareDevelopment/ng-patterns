import { Injectable } from '@angular/core';
import {
  defaultSlickCarouselSettings,
  NgPatSlickCarouselSettings
} from '@ngpat/slick-carousel';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class SlickCarouselStore {
  state$: BehaviorSubject<NgPatSlickCarouselSettings> =
    new BehaviorSubject<NgPatSlickCarouselSettings>({
      ...defaultSlickCarouselSettings
    });

  speed$: Observable<number> = this.state$.pipe(
    map((state: NgPatSlickCarouselSettings) => state.speed)
  );

  arrows$: Observable<boolean> = this.state$.pipe(
    map((state: NgPatSlickCarouselSettings) => state.arrows)
  );

  dots$: Observable<boolean> = this.state$.pipe(
    map((state: NgPatSlickCarouselSettings) => state.dots)
  );

  next(state: Partial<NgPatSlickCarouselSettings>): void {
    this.state$.next({
      ...this.state$.value,
      ...state
    });
  }
}
